# 使用 Vercel 默认域名访问（推荐先这样测试）

## 🎯 快速步骤

### 第 1 步：推送配置到 GitHub

```bash
git add _config.yml vercel.json
git commit -m "Use Vercel default domain for testing"
git push origin main
```

### 第 2 步：等待 Vercel 部署完成

1. 打开 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入你的 **hexo-blog** 项目
3. 查看 **Deployments** 标签
4. 等待部署状态变为 ✅ **Ready**（大约 2-3 分钟）

### 第 3 步：获取默认域名

部署完成后，在项目概览页面（首页）能看到：

```
🌐 Production
https://hexo-blog-xxx.vercel.app
```

或在 **Settings** → **Domains** 中查看。

### 第 4 步：访问测试

复制那个 `.vercel.app` 的链接，测试访问：

```
首页：      https://hexo-blog-xxx.vercel.app/
About：     https://hexo-blog-xxx.vercel.app/about/
分类：      https://hexo-blog-xxx.vercel.app/categories/
标签：      https://hexo-blog-xxx.vercel.app/tags/
```

---

## ✅ 如果一切正常

访问上面的 URL，应该能看到：
- ✅ 首页正常显示
- ✅ 所有链接可以访问
- ✅ 没有 404 错误
- ✅ 主题正确渲染

---

## 🔄 后续操作

### 如果页面还是显示 404

1. **清除 Vercel 缓存**：
   - 进入项目 **Settings**
   - 找到 **Deployment Retention**
   - 点击 **Clear all production deployments**
   - 重新部署

2. **检查构建日志**：
   - 进入最新的 Deployment
   - 查看 **Build Logs** 是否有错误

3. **本地测试**：
   ```bash
   npm run build
   ls public/  # 检查是否有 index.html 和目录
   ```

### 确认工作后更新为自定义域名

一旦确认 Vercel 默认域名能正常访问，就可以按照以下步骤配置自定义域名：

1. **在 Vercel 中添加自定义域名**
   - Settings → **Domains**
   - 点击 **Add Domain**
   - 输入 `codetrue.net`
   - 按提示配置 DNS CNAME 记录

2. **更新 _config.yml**
   ```yaml
   url: https://codetrue.net
   root: /
   ```

3. **推送更新**
   ```bash
   git add _config.yml
   git commit -m "Update to custom domain: codetrue.net"
   git push
   ```

---

## 📋 当前配置状态

| 项目 | 配置 | 准备状态 |
|------|------|--------|
| vercel.json | 添加了 rewrites 规则 | ✅ 已配置 |
| _config.yml root | 设为 `/` | ✅ 已配置 |
| URL 配置 | 暂时使用本地地址（会自适应） | ⏳ 等待认证 |
| 构建命令 | npm run build | ✅ 已验证 |

---

## 💡 为什么先用默认域名测试？

1. **无需 DNS 配置** - 立即生效
2. **排除 DNS 问题** - 确保网站本身没问题
3. **快速验证** - 确认构建和部署都正常
4. **再配置自定义域名** - 有备无患

---

## 🆘 仍有问题？

参考 [VERCEL_404_FIX.md](VERCEL_404_FIX.md) 或 [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) 中的详细排查步骤。

