# Creating an Isolated Browser Environment with All Traffic Routed Through a Proxy Server

Usage Instructions:

1. Install NodeJS; clone the git repo; run 'npm i' to install dependencies (Detailed beginner-friendly installation guides: [Windows](detailed-tutorial-Windows.md) | [MacOS](detailed-tutorial-MacOS.md))
2. Modify config.js, filling in the proxy server's IP, URL, username, and password as prompted
3. Use 'node main.js' to launch the isolated browser
4. Wait for the message "IP check passed, your IP is xxx. You are good to go!"
5. Visit the websites you want to access. You can remember passwords and maintain login states. The next time you run 'node main.js', your login status and browsing history will still be there

Recommendations:
* Don't install any plugins, don't log into Google accounts, and don't enable any Sync services. Keep this browser as a very clean, dedicated browser
* Log out of the websites you plan to visit with this browser from your main browser, and delete the passwords. Change to a complex password that you can't remember yourself, only enter and save it in this browser (and in another secure location). This prevents you from accidentally entering the password and logging into the website outside of this browser

---


# 创建所有流量经过某代理服务器的隔离的浏览器环境

使用方法

1. 安装NodeJS; clone git repo; npm i 安装依赖库 (详细新手友好安装教程: [Windows](%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8BWindows.md) | [MacOS](%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8BMacOS.md))
2. 修改config.js，根据提示填写代理服务器的IP、URL、用户名、密码
3. 用node main.js来启动隔离的浏览器
4. 等待显示 IP check passed, your IP is xxx. You are good to go!
5. 访问你想要访问的网站，可以记住密码、保留登入状态，下次运行node main.js时，登入态和浏览历史记录都还在的

建议：
* 不要安装任何插件、不要登入Google账号、不要启用任何Sync服务。把这个浏览器作为非常干净的专用浏览器
* 从主要浏览器中把你计划用此浏览器访问的网站登出，密码删除。换一个复杂的你自己记不住的密码，仅输入并保存在此浏览器里（和另一个某个安全的地方）。避免自己不小心输入密码，在此浏览器之外的地方登入网站


