const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const config = require("./config");

(async function main() {
    try {
        await launchCustomChrome();
    } catch (error) {
        console.error('Error in main:', error);
    }
})()

async function launchCustomChrome() {
    let ipCheckHasPassed = false;
    const userDataDir = path.join(__dirname, 'custom-chrome-data');
    if (!fs.existsSync(userDataDir)) {
        fs.mkdirSync(userDataDir);
    }

    // Modify Chrome's preferences
    const preferencesPath = path.join(userDataDir, 'Default', 'Preferences');
    if (fs.existsSync(preferencesPath)) {
        const preferences = JSON.parse(fs.readFileSync(preferencesPath, 'utf8'));
        preferences.profile = preferences.profile || {};
        preferences.profile.exit_type = "Normal";
        preferences.profile.exited_cleanly = true;
        preferences.session = preferences.session || {};
        preferences.session.restore_on_startup = 4; // 4 means "Open the New Tab page"
        preferences.profile.content_settings = preferences.profile.content_settings || {};
        preferences.profile.content_settings.exceptions = preferences.profile.content_settings.exceptions || {};
        fs.writeFileSync(preferencesPath, JSON.stringify(preferences));
    }

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--disable-plugins',
            `--user-data-dir=${userDataDir}`,
            '--force-dark-mode',
            `--proxy-server=${config.proxyConfig.server}`
        ],
        ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
    });

    const [page] = await browser.pages();
    await setupPage(page);

    browser.on('targetcreated', async (target) => {
        if (target.type() === 'page') {
            const pages = await browser.pages();
            if (!ipCheckHasPassed) {
                if (pages.length > 1) {
                    await (await target.page()).close();
                }
            }
            await setupPage(await target.page());
        }
    });

    browser.on('targetdestroyed', () => closeIfNoPages(browser));

    browser.on('disconnected', () => {
        console.log('Browser has been closed');
        process.exit(0);
    });

    try {
        await page.setRequestInterception(true);
        const interceptHandler = (request) => {
            if (request.isNavigationRequest() && request.url() !== 'about:blank') {
                request.abort();
            } else {
                request.continue();
            }
        };
        page.on('request', interceptHandler);

        await page.goto('about:blank');

        // Show initial alert
        await page.evaluate(() => {
            const alertDiv = document.createElement('div');
            alertDiv.id = 'ip-check-alert';
            alertDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: red;
            color: yellow;
            font-weight: bold;
            border: 2px solid yellow;
            padding: 20px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 18px;
            text-align: center;
            z-index: 9999;
        `;
            alertDiv.textContent = "Checking IP, do not do anything yet.";
            document.body.appendChild(alertDiv);
        });

        try {
            // Perform IP check
            const ipInfo = await page.evaluate((config) => {
                return fetch(config.ipCheckerUrl).then(res => res.json());
            }, config);

            if (ipInfo.data.ip !== config.proxyConfig.ip) {
                throw new Error(`IP invalid, expected ${config.proxyConfig.ip} but got ${ipInfo.data.ip}`);
            }

            // Update alert with success message
            await page.evaluate((ip) => {
                const alertDiv = document.getElementById('ip-check-alert');
                if (alertDiv) {
                    alertDiv.textContent = `IP check passed, your IP is ${ip}. You are good to go!`;
                    alertDiv.style.backgroundColor = '#d4edda';
                    alertDiv.style.borderColor = '#c3e6cb';
                    alertDiv.style.color = '#155724';
                }
            }, ipInfo.data.ip);

            page.off('request', interceptHandler);
            await page.setRequestInterception(false);
            ipCheckHasPassed = true;

        } catch (error) {
            console.error('IP check failed:', error.message);
            throw error;
        }

        console.log('IP check passed. Browser is ready for use.');
    } catch (error) {
        console.error('Error during IP check:', error);
        await browser.close();
    }
}

async function setupPage(page) {
    await page.setViewport();

    if (config.proxyConfig.username) {
        await page.authenticate({
            username: config.proxyConfig.username,
            password: config.proxyConfig.password
        });
    }
}


async function closeIfNoPages(browser) {
    const pages = await browser.pages();
    if (pages.length === 0) {
        await browser.close();
    }
}
