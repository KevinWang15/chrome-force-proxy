1. 安装必要的工具:

   首先,你需要安装 Xcode 命令行工具、Homebrew、Git 和 Node.js。打开终端(Terminal)应用程序,然后依次运行以下命令:

   ```
   xcode-select --install
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   brew install git
   brew install node
   ```

   每条命令执行完毕后,等待安装完成再进行下一步。

2. 克隆 GitHub 仓库:

   在终端中,导航到你想保存项目的目录,然后运行:

   ```
   git clone https://github.com/KevinWang15/chrome-force-proxy
   ```

3. 进入项目目录:

   ```
   cd chrome-force-proxy
   ```

4. 安装依赖:

   由于你在中国,网络可能会有限制,所以使用 npmmirror 镜像来安装依赖:

   ```
   npm install --registry=https://registry.npmmirror.com
   ```

5. 修改 config.js:
   - 在项目文件夹中找到 config.js 文件
   - 用记事本或其他文本编辑器打开它
   - 根据你的需求修改配置

6. 运行程序:

   ```
   node main.js
   ```

7. 回到上一页继续看使用方法和注意事项
