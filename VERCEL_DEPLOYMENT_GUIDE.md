# Vercel 自动部署排查指南

当 push 代码到 GitHub 的 `main` 分支后，Vercel 没有自动构建部署，请按以下步骤排查：

## 📋 排查清单

### 第 1 步：验证 Vercel 项目配置

#### 1.1 检查 GitHub 连接

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入你的 `hexo-blog` 项目
3. 点击 **Settings** → **Git**
4. 检查以下内容：
   - ✅ **Connected Repository** 是否显示 `你的用户名/hexo-blog`
   - ✅ **Deploying Branches** 中是否包含 `main` 分支
   - ✅ **Ignore Build Step** 是否为空（不要勾选）

#### 1.2 重新连接 GitHub（如果连接异常）

```bash
1. 在 Vercel Dashboard 中：
   - 进入 Settings → Git
   - 点击"Disconnect GitHub"
   - 重新点击"Connect GitHub"
   - 授权并选择 hexo-blog 仓库
```

### 第 2 步：验证构建配置

#### 2.1 检查项目设置

1. 进入项目 → **Settings** → **Build & Development Settings**
2. 确认以下配置：
   - **Build Command**: `npm run build`
   - **Output Directory**: `public`
   - **Install Command**: `npm install && npm --prefix themes/hexo-theme-stellar-1.33.1 install`

#### 2.2 如果上面的命令出错，改为下面的方式：

```bash
# Build Command
npm run build

# Install Command
npm install

# 注意：需要在 Vercel Dashboard 里手动在 Build Command 之前增加一个步骤
# 或者在项目根目录创建 build.sh 脚本
```

### 第 3 步：检查 vercel.json 配置

项目根目录的 `vercel.json` 应该配置正确（已为你创建）。

### 第 4 步：测试部署触发

#### 方法 A：在 Vercel Dashboard 手动触发构建

1. 进入 **Deployments** 标签
2. 点击 **Create Deployment**
3. 在下拉菜单选择 **main** 分支
4. 点击 **Deploy** 进行测试构建
5. 如果构建成功 → GitHub 连接正常
6. 如果构建失败 → 查看构建日志找出问题

#### 方法 B：推送到 main 分支

```bash
# 做一个小改动，比如修改 README
echo "# Test deployment" >> README-test.md

# 推送到 main
git add README-test.md
git commit -m "测试自动部署"
git push origin main

# 查看 Vercel Dashboard 的 Deployments 标签
# 应该看到新的部署记录
```

---

## 🛠️ 常见问题及解决方案

### 问题 1：部署失败，显示"Build failed"

**排查步骤：**

1. 点击失败的部署记录
2. 查看 **Build Logs** 标签中的完整错误信息
3. 常见错误及解决方案：

```bash
# 错误：Cannot find module 'probe-image-size'
# 解决：已在 vercel.json 中配置了主题依赖安装

# 错误：npm ERR! code EACCES
# 解决：某些文件权限问题，通常在重新按流程部署会解决

# 错误：hexo: command not found
# 解决：确保 npm install 已完成，检查 node_modules 目录
```

### 问题 2：没有任何部署记录出现

**原因分析：**

1. **GitHub 未连接** → 重新按"第 1 步"连接
2. **分支不匹配** → 确保推送到了 `main` 分支（不是 master）
3. **Ignore Build Step 被勾选** → 需要取消勾选
4. **GitHub Webhook 失效** → 需要在 Vercel 中重新授权

**解决步骤：**

```bash
# 1. 确认推送到了正确的分支
git branch -a
git push origin main

# 2. 在 Vercel Dashboard 中：
#    - Settings → Git → Disconnect GitHub
#    - 清除所有权限，重新授权
#    - 重新连接 GitHub
```

### 问题 3：部署成功但网站没有更新

**原因分析：**

1. CDN 缓存未清除
2. 浏览器缓存
3. 域名 DNS 配置指向了旧地址

**解决步骤：**

```bash
# 1. 在 Vercel Dashboard 中:
#    - 进入项目 Settings
#    - 向下滚动找到 "Deployment Retention"
#    - 选择 "Clear All Production Deployments" 清除缓存

# 2. 清除浏览器缓存
#    - 按 Cmd+Shift+Delete (macOS) 或 Ctrl+Shift+Delete (Windows)
#    - 清除所有缓存数据

# 3. 重新访问网站
```

---

## ✅ 完整验证流程（一步步来）

### 步骤 1：本地测试构建

```bash
# 确保本地能正常构建
npm run build

# 检查是否生成了 public 目录
ls -la public/
```

### 步骤 2：检查 GitHub 推送

```bash
# 确保代码已推送到 GitHub main 分支
git log --oneline -5
git remote -v
git branch -v
```

### 步骤 3：Vercel Dashboard 验证

打开浏览器访问 [Vercel Dashboard](https://vercel.com/dashboard)：

1. ✅ 确认项目已导入并显示
2. ✅ 确认 GitHub 仓库连接状态为 ✅ Connected
3. ✅ 在 Settings → Git 中确认 `main` 分支在部署列表中
4. ✅ 在 Settings → Build & Development 中确认构建命令正确

### 步骤 4：手动触发部署测试

1. 点击 **Deployments** 标签
2. 点击右上角 **Create Deployment**
3. 选择 `main` 分支
4. 点击 **Deploy** 进行测试
5. 等待构建完成，观察日志

### 步骤 5：自动部署测试

```bash
# 做一个简单改动
echo "Last updated: $(date)" >> DEPLOY-TEST.txt

# 提交并推送
git add DEPLOY-TEST.txt
git commit -m "Test auto deployment"
git push origin main

# 等待 30 秒，然后查看 Vercel Dashboard
# 应该看到新的部署记录自动出现
```

---

## 🔧 更新 vercel.json 配置（优化版本）

如果上面的配置有问题，可以改用以下配置：

```json
{
  "buildCommand": "npm install && npm --prefix themes/hexo-theme-stellar-1.33.1 install && npm run build",
  "outputDirectory": "public",
  "nodeVersion": "18.x"
}
```

或者使用 `vercelignore` 忽略不必要的文件：

```
node_modules/
.git/
.DS_Store
db.json
*.log
.hexo_static/
themes/*/node_modules/
```

---

## 📞 если以上步骤都不能解决

1. **查看 Vercel 官方文档**: [Vercel Hexo 部署指南](https://vercel.com/guides/hexo)
2. **创建 GitHub Issue**: 在 Vercel 社区寻求帮助
3. **检查 GitHub Actions**: 确保 GitHub 没有阻止 Webhook

---

## 💡 快速修复（核心要点）

以下是最常见的 3 个问题和快速修复：

| 问题         | 原因            | 解决方案                              |
| ------------ | --------------- | ------------------------------------- |
| 没有部署记录 | GitHub 连接失效 | 重新授权 Vercel 访问 GitHub           |
| 部署失败     | 构建命令错误    | 检查 `npm run build` 本地是否能运行   |
| 网站未更新   | CDN 缓存/DNS    | Vercel Dashboard 清除缓存或等待冷启动 |
