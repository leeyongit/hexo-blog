# Vercel 404 错误排查指南

## 问题症状

在 Vercel 上访问站点或子页面时显示"很抱歉，您访问的页面不存在"（404 错误）。

---

## 🔧 已为你修复的配置

### 1. vercel.json - 添加路由重写规则

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "public",
  "installCommand": "npm install && cd themes/hexo-theme-stellar-1.33.1 && npm install && cd ../..",
  "rewrites": [
    {
      "source": "/:path((?!.*\\.).*)",
      "destination": "/$1/index.html"
    }
  ]
}
```

**作用**：将所有目录请求（如 `/about`, `/archives` 等）重写到对应的 `index.html` 文件。

### 2. _config.yml - 修正 URL 配置

```yaml
# 修改前
url: http://codetrue.net

# 修改后
url: https://codetrue.net
root: /
```

**作用**：
- 使用 HTTPS（Vercel 和现代浏览器推荐）
- 明确配置 `root` 为 `/`（自定义域名通常使用根路径）

---

## 🚀 立即修复步骤

### 第 1 步：推送最新配置

```bash
git add _config.yml vercel.json
git commit -m "Fix Vercel 404 errors - add rewrites and update URL config"
git push origin main
```

### 第 2 步：在 Vercel Dashboard 中验证

1. 打开 [Vercel Dashboard](https://vercel.com/dashboard)
2. 进入 **hexo-blog** 项目
3. 查看 **Deployments** 标签，等待新部署完成
4. 观看 **Build Logs** 检查是否有错误

### 第 3 步：验证自定义域名配置

1. 进入项目 **Settings** → **Domains**
2. 检查 **codetrue.net** 是否正确配置
3. 如果还未添加，按以下步骤添加：
   - 点击 **Add Domain**
   - 输入 `codetrue.net`
   - 按提示配置 DNS CNAME 记录

### 第 4 步：测试访问

等待 DNS 生效（通常 30 分钟内），然后测试：

```
访问首页：     https://codetrue.net/
访问 About：   https://codetrue.net/about/
访问分类：     https://codetrue.net/categories/
访问标签：     https://codetrue.net/tags/
访问某篇文章：https://codetrue.net/2024/10/10/article-title/
```

---

## ❓ 如果还是显示 404

### 排查步骤 1：检查部署日志

1. 在 Vercel Dashboard 点击最新的部署
2. 查看 **Runtime Logs** 或 **Deployment** 标签
3. 查看是否有构建或部署错误信息

### 排查步骤 2：本地验证构建

```bash
# 清空旧的构建产物
npm run clean

# 重新构建
npm run build

# 检查 public 目录
ls -la public/

# 应该看到：
# - index.html
# - about/index.html
# - archives/index.html
# - categories/index.html
# - tags/index.html
```

### 排查步骤 3：验证 _config.yml 配置

检查 `_config.yml` 中是否有以下配置：

```yaml
url: https://codetrue.net  # 必须是 HTTPS，确保域名正确
root: /                     # 根路径
```

### 排查步骤 4：Vercel 缓存问题

这是最常见的原因。尝试清除 Vercel 缓存：

1. 进入项目 **Settings**
2. 向下滚动找到 **Deployment Retention**
3. 点击 **Clear all production deployments**
4. 返回 **Deployments** 标签，点击 **Create Deployment**
5. 选择 `main` 分支，点击 **Deploy**

### 排查步骤 5：重新连接 GitHub

如果还是不行，尝试重新连接 GitHub：

1. 进入 **Settings** → **Git**
2. 点击 **Disconnect Repository**
3. 重新点击 **Connect Repository**，按流程重新授权

---

## 🎯 常见原因对照表

| 症状 | 原因 | 解决方案 |
|------|------|--------|
| 所有页面都是 404 | vercel.json 重写规则缺失或错误 | 检查 vercel.json 是否包含 `rewrites` |
| 首页正常，子页面 404 | URL 配置不正确 | 检查 _config.yml 中的 `root` 和 `url` |
| 频繁出现 404 再恢复 | Vercel 缓存问题 | 清除缓存或等待 DNS 缓存过期 |
| 域名配置后还是显示 404 | 自定义域名未在 Vercel 中正确配置 | 重新添加域名，按提示配置 DNS |

---

## 📋 配置检查清单

部署前，请逐一检查：

- [ ] `vercel.json` 中包含 `rewrites` 规则
- [ ] `_config.yml` 中 `url` 使用 HTTPS
- [ ] `_config.yml` 中明确配置了 `root: /`
- [ ] 本地运行 `npm run build` 能正常生成 `public` 目录
- [ ] `public/index.html` 文件存在
- [ ] `public` 中包含 `about/`、`archives/` 等目录
- [ ] 在 Vercel Dashboard 中正确配置了 `codetrue.net` 域名

---

## 🔗 相关资源

- [Vercel Rewrites 文档](https://vercel.com/docs/edge-functions/redirect-to-destinations#rewrites)
- [Hexo 官方配置文档](https://hexo.io/docs/configuration)
- [Stellar 主题部署指南](https://xaoxuu.com/wiki/stellar/)

