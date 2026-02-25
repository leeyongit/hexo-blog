# Hexo 博客项目

这是一个基于 Hexo 和 Stellar 主题的个人博客项目。

## 🚀 快速开始

### 项目结构

```
hexo-blog/
├── _config.yml              # Hexo 主配置文件
├── _config.landscape.yml    # Landscape 主题配置（备用）
├── package.json             # 项目依赖
├── source/                  # 博客源文件
│   └── _posts/             # 博客文章
├── themes/                  # 主题目录
│   └── hexo-theme-stellar-1.33.1/  # Stellar 主题
├── scaffolds/              # 文章模板
├── vercel.json             # Vercel 部署配置
└── public/                 # 生成的静态文件（构建后）
```

### 本地开发

#### 1. 安装依赖

```bash
# 安装主项目依赖
npm install

# 安装主题依赖
cd themes/hexo-theme-stellar-1.33.1
npm install
cd ../../
```

#### 2. 启动开发服务器

```bash
hexo server
# 或简写为
hexo s
```

默认访问地址：`http://localhost:4000`

#### 3. 常用命令

```bash
# 创建新文章
hexo new "文章标题"

# 清理缓存和生成的文件
hexo clean

# 生成静态文件
hexo generate
# 或简写为
hexo g

# 部署（需提前配置）
hexo deploy
```

---

## 📦 部署到 Vercel

### 前置要求

- [ ] GitHub 账号
- [ ] Vercel 账号
- [ ] 本地已安装 Git

### 部署步骤

#### **第 1 步：初始化 Git 仓库**

```bash
git init
git add .
git commit -m "Initial commit"
```

#### **第 2 步：创建 GitHub 仓库并推送**

1. 访问 [GitHub](https://github.com/new) 创建新仓库，命名为 `hexo-blog`
2. 关联和推送代码：

```bash
git branch -M main
git remote add origin https://github.com/你的用户名/hexo-blog.git
git push -u origin main
```

#### **第 3 步：部署到 Vercel**

**方式 A：使用 Vercel CLI（推荐）**

```bash
# 1. 全局安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel（会打开浏览器登录）
vercel login

# 3. 部署项目
vercel --prod
```

**方式 B：使用 Vercel Web 界面**

1. 登录 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 **"Add New..."** → **"Project"**
3. 选择 **"Import Git Repository"**
4. 连接 GitHub 账号并选择 `hexo-blog` 仓库
5. 在构建设置中配置：
   - **Build Command**: `npm run build`
   - **Output Directory**: `public`
   - **Install Command**: `npm install && npm --prefix themes/hexo-theme-stellar-1.33.1 install`
6. 点击 **"Deploy"** 开始部署

#### **第 4 步：获取部署结果**

部署完成后，Vercel 会为你分配一个免费的 `.vercel.app` 域名。部署过程中会显示以下内容：

```
✅ Production: https://hexo-blog-abc123.vercel.app
```

---

## 🛠️ 后期管理

### 自动部署配置

部署完成后，**每当你将代码推送到 GitHub 的 `main` 分支时**，Vercel 会自动重新构建和部署。

#### 工作流程

```
本地编辑 → git push → GitHub 更新 → Vercel 自动构建 → 站点更新
```

#### ⚠️ 如果没有自动部署，请按以下快速修复步骤：

**问题排查（按顺序尝试）：**

1. **重新连接 GitHub**
   - 登录 [Vercel Dashboard](https://vercel.com/dashboard)
   - 进入项目 → Settings → Git → Disconnect GitHub
   - 重新点击 Connect GitHub 重新授权

2. **验证分支配置**
   - Settings → Git → Deploying Branches
   - 确保 `main` 分支在列表中

3. **手动触发部署测试**
   - 点击 **Deployments** 标签
   - 点击 **Create Deployment**
   - 选择 `main` 分支，点击 Deploy 进行测试

4. **查看构建日志**
   - 如果测试部署失败，点击失败的部署
   - 查看 **Build Logs** 找出错误信息

**完整排查指南**: 详见 [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md)

#### 本地测试构建

确保本地能正常构建，再进行 Vercel 部署：

```bash
npm run build
ls -la public/  # 检查是否生成了静态文件
```

### 常见管理任务

#### 1. 发布新文章

```bash
# 创建新文章模板
hexo new "文章标题"

# 编辑文章内容（在 source/_posts/ 下）
vim source/_posts/202X-XX-XX-文章标题.md

# 本地测试预览
hexo server

# 确认无误后推送
git add .
git commit -m "发布新文章：文章标题"
git push
```

#### 2. 修改主题配置

主题配置文件位于：`themes/hexo-theme-stellar-1.33.1/_config.yml`

修改后推送即可自动部署。

#### 3. 修改站点配置

主站点配置文件位于：`_config.yml`

常用配置项：

```yaml
# 站点信息
title: 你的博客标题
subtitle: 副标题
description: 站点描述
author: 你的名字
language: zh-CN

# URL 配置
url: https://你的域名.com
root: /
```

#### 4. 配置自定义域名

1. 在 Vercel 项目的 **Settings** → **Domains** 中添加你的自定义域名
2. 按 Vercel 的提示配置 DNS 记录（通常选择 CNAME）
3. 更新 `_config.yml` 中的 `url`：

```yaml
url: https://你的自定义域名.com
```

4. 推送变更：

```bash
git add _config.yml
git commit -m "更新站点域名"
git push
```

#### 5. 查看部署日志

在 Vercel Dashboard 中查看：

1. 打开项目
2. 点击 **"Deployments"** 标签
3. 点击具体的部署记录查看构建日志和错误信息

#### 6. 回滚到上一个版本

如果新部署出现问题，可以在 Vercel Dashboard 中：

1. 进入 **"Deployments"** 标签
2. 找到上一个成功的部署
3. 点击 **"Redeploy"** 恢复到该版本

### 文章命名规范

为避免 Hexo 构建错误，文件名应遵循以下规则：

- ✅ 推荐：`2024-10-10-article-title.md`、`2024-10-10-文章标题.md`
- ❌ 避免：包含 `%`、`#`、`?` 等特殊字符

### 常见问题

#### Q: 部署失败，如何调试？

A: 查看 Vercel Dashboard 中的构建日志，或本地运行：

```bash
npm run build
```

检查是否有错误信息。

#### Q: 文章发布后仍未显示？

A: 尝试手动清理缓存并重新生成：

```bash
hexo clean
hexo generate
git push
```

#### Q: 如何临时禁用自动部署？

A: 在 Vercel Dashboard 的项目 **Settings** → **Git** 中可以暂停自动部署功能。

---

## 📝 编写文章注意事项

### Front Matter 模板

新文章默认包含以下 Front Matter（位于 `scaffolds/post.md`）：

```yaml
---
title: 文章标题
date: 2024-10-10 12:34:56
tags:
- 标签1
- 标签2
categories:
- 分类1
- 分类2
---
```

### 文章配置选项

| 参数 | 说明 | 默认值 |
|------|------|--------|
| title | 文章标题 | 必需 |
| date | 发布日期 | 自动生成 |
| tags | 标签 | 可选 |
| categories | 分类 | 可选 |
| permalink | 自定义链接 | 可选 |
| excerpt | 摘要 | 可选 |

---

## 🔧 环境要求

- **Node.js**: 14.0 或以上
- **npm**: 6.0 或以上

检查版本：

```bash
node --version
npm --version
```

---

## 📚 相关资源

- [Hexo 官方文档](https://hexo.io/)
- [Stellar 主题文档](https://xaoxuu.com/wiki/stellar/)
- [Vercel 官方文档](https://vercel.com/docs)
- [GitHub Pages 部署指南](https://hexo.io/zh-cn/docs/github-pages)

---

## 📄 许可证

MIT

---

## 🤝 贡献

欢迎通过 PR 提交改进建议！

