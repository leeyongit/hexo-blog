const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'source/_posts');

// 文件名到信息的映射
const fileInfoMap = {
  '2015-10-16-MYSQL性能优化.md': {
    title: 'MySQL性能优化',
    date: '2015-10-16 09:30:00',
    tags: ['MySQL'],
    categories: ['数据库', 'MySQL'],
    permalink: 'mysql-performance-optimization'
  },
  '2015-11-01-大话PHP设计模式笔记.md': {
    title: '大话PHP设计模式笔记',
    date: '2015-11-01 09:30:00',
    tags: ['PHP', '设计模式'],
    categories: ['技术', '设计模式'],
    permalink: 'php-design-patterns-notes'
  },
  '2016-01-26-什么是 RESTful.md': {
    title: '什么是 RESTful',
    date: '2016-01-26 09:30:00',
    tags: ['RESTful'],
    categories: ['技术', 'HTTP'],
    permalink: 'what-is-restful'
  },
  '2017-02-06-linux ps 命令的结果中VSZ，RSS，STAT的含义和大小.md': {
    title: 'Linux ps 命令的结果中VSZ，RSS，STAT的含义和大小',
    date: '2017-02-06 09:30:00',
    tags: ['Linux'],
    categories: ['技术', 'Linux'],
    permalink: 'linux-ps-command-vsza-rss-stat'
  },
  '2017-02-06-Linux下查看Nginx等的并发连接数和连接状态.md': {
    title: 'Linux下查看Nginx等的并发连接数和连接状态',
    date: '2017-02-06 09:30:00',
    tags: ['Linux', 'Nginx'],
    categories: ['技术', 'Linux'],
    permalink: 'linux-view-nginx-connections'
  },
  '2017-02-16-正向代理与反向代理.md': {
    title: '正向代理与反向代理',
    date: '2017-02-16 09:30:00',
    tags: ['反向代理', 'Nginx'],
    categories: ['技术', 'Nginx'],
    permalink: 'forward-reverse-proxy'
  },
  '2017-09-30-Shell脚本编程30分钟入门.md': {
    title: 'Shell脚本编程30分钟入门',
    date: '2017-09-30 09:30:00',
    tags: ['Shell'],
    categories: ['技术', 'Shell'],
    permalink: 'shell-scripting-quick-start'
  },
  '2017-10-20-通过shell脚本获取主机信息.md': {
    title: '通过shell脚本获取主机信息',
    date: '2017-10-20 09:30:00',
    tags: ['Shell'],
    categories: ['技术', 'Shell'],
    permalink: 'get-host-info-with-shell'
  },
  '2018-03-09-一般缓存更新策略.md': {
    title: '一般缓存更新策略',
    date: '2018-03-09 09:30:00',
    tags: ['缓存'],
    categories: ['技术', '缓存'],
    permalink: 'cache-update-strategies'
  },
  '2018-09-19-Nginx限制IP并发连接数及每秒处理请求数.md': {
    title: 'Nginx限制IP并发连接数及每秒处理请求数',
    date: '2018-09-19 09:30:00',
    tags: ['Nginx'],
    categories: ['技术', 'Nginx'],
    permalink: 'nginx-limit-connections'
  },
  '2018-09-26-MacOS下自己创建根证书和域SSL证书实现https调试.md': {
    title: 'MacOS下自己创建根证书和域SSL证书实现https调试',
    date: '2018-09-26 09:30:00',
    tags: ['https', 'ssl', 'openssl'],
    categories: ['技术', 'HTTP'],
    permalink: 'macos-create-ssl-certificates'
  },
  '2018-11-13-关于limit_req和limit_conn的区别.md': {
    title: '关于limit_req和limit_conn的区别',
    date: '2018-11-13 09:30:00',
    tags: ['限流', 'Nginx'],
    categories: ['技术', 'Nginx'],
    permalink: 'limit-req-conn-difference'
  },
  '2018-11-13-linux压缩命令常用：tar，tgz，gzip，zip.md': {
    title: 'Linux压缩命令常用：tar，tgz，gzip，zip',
    date: '2018-11-13 09:30:00',
    tags: ['Linux', '压缩'],
    categories: ['技术', 'Linux'],
    permalink: 'linux-compression-commands'
  },
  '2018-12-18-laravel的模型和数据库基础操作.md': {
    title: 'Laravel的模型和数据库基础操作',
    date: '2018-12-18 09:30:00',
    tags: ['Laravel'],
    categories: ['技术', 'PHP'],
    permalink: 'laravel-model-and-database'
  },
  '2018-12-22-使用supervisord管理进程.md': {
    title: '使用supervisord管理进程',
    date: '2018-12-22 09:30:00',
    tags: ['supervisord', 'CentOS'],
    categories: ['技术', '运维'],
    permalink: 'use-supervisord-manage-processes'
  },
  '2019-01-28-10 分钟快速入门 Python3.md': {
    title: '10分钟快速入门Python3',
    date: '2019-01-28 09:30:00',
    tags: ['Python3'],
    categories: ['后端', 'Python'],
    permalink: 'python3-quick-start'
  },
  '2019-01-31-ReactJS 组件.md': {
    title: 'ReactJS组件',
    date: '2019-01-31 09:30:00',
    tags: ['ReactJS'],
    categories: ['前端', 'React'],
    permalink: 'reactjs-components'
  },
  '2019-02-14-PHP-FPM进程管理.md': {
    title: 'PHP-FPM进程管理',
    date: '2019-02-14 09:30:00',
    tags: ['PHP', 'PHP-FPM'],
    categories: ['后端', 'PHP'],
    permalink: 'php-fpm-process-manager'
  },
  '2019-02-14-PHP实现并发请求.md': {
    title: 'PHP实现并发请求',
    date: '2019-02-14 09:30:00',
    tags: ['PHP'],
    categories: ['后端', 'PHP'],
    permalink: 'php-concurrent-requests'
  },
  '2019-02-15-go语言并发与并行——goroutine和channel的详细理解.md': {
    title: 'Go语言并发与并行——goroutine和channel的详细理解',
    date: '2019-02-15 09:30:00',
    tags: ['Golang', 'goroutine', 'channel'],
    categories: ['后端', 'Golang'],
    permalink: 'go-concurrency-goroutine-channel'
  },
  '2021-01-28-go语言坑之并发访问map.md': {
    title: 'Go语言坑之并发访问map',
    date: '2021-01-28 09:30:00',
    tags: ['Golang', 'map'],
    categories: ['后端', 'Golang'],
    permalink: 'go-concurrent-map-access'
  },
  '2021-02-02-队列：Beanstalkd介绍.md': {
    title: '队列：Beanstalkd介绍',
    date: '2021-02-02 09:30:00',
    tags: ['beanstalkd'],
    categories: ['技术', '消息队列'],
    permalink: 'beanstalkd-introduction'
  },
  '2021-02-02-docker + redis + beanstalkd + swoole 构建健壮的队列.md': {
    title: 'Docker + Redis + Beanstalkd + Swoole构建健壮的队列',
    date: '2021-02-02 09:30:00',
    tags: ['beanstalkd', 'Docker', 'Redis', 'Swoole'],
    categories: ['技术', '消息队列'],
    permalink: 'docker-redis-beanstalkd-swoole-queue'
  },
  '2021-02-02-PHP 完善的 Error  Exception 的捕获与处理.md': {
    title: 'PHP完善的Error/Exception的捕获与处理',
    date: '2021-02-02 09:30:00',
    tags: ['PHP'],
    categories: ['后端', 'PHP'],
    permalink: 'php-error-exception-handling'
  },
  '2021-04-14-Mysql数据库高CPU问题定位和优化.md': {
    title: 'MySQL数据库高CPU问题定位和优化',
    date: '2021-04-14 09:30:00',
    tags: ['MySQL'],
    categories: ['数据库', 'MySQL'],
    permalink: 'mysql-high-cpu-problem-optimization'
  },
  '2023-03-20-在linux服务器上安装Jenkins.md': {
    title: '在Linux服务器上安装Jenkins',
    date: '2023-03-20 09:30:00',
    tags: ['Jenkins'],
    categories: ['技术', 'Jenkins'],
    permalink: 'install-jenkins-on-linux'
  },
  '2023-08-11-Golang map 三板斧第三式：实现原理.md': {
    title: 'Golang map三板斧第三式：实现原理',
    date: '2023-08-11 09:30:00',
    tags: ['Golang'],
    categories: ['后端', 'Golang'],
    permalink: 'golang-map-implementation-principle'
  },
  '2023-08-11-Golang zap 快速上手.md': {
    title: 'Golang zap快速上手',
    date: '2023-08-11 09:30:00',
    tags: ['Golang', 'zap', '日志'],
    categories: ['后端', 'Golang'],
    permalink: 'golang-zap-quick-start'
  },
  '2023-12-08-WebAssembly是什么.md': {
    title: 'WebAssembly是什么',
    date: '2023-12-08 09:30:00',
    tags: ['WebAssembly'],
    categories: ['技术', 'WebAssembly'],
    permalink: 'what-is-webassembly'
  },
  '2024-09-20-在Laravel中使用策略模式.md': {
    title: '在Laravel中使用策略模式',
    date: '2024-09-20 09:30:00',
    tags: ['设计模式', 'Laravel'],
    categories: ['技术', '设计模式'],
    permalink: 'strategy-pattern-in-laravel'
  },
  '2024-10-07-基于zookeeper的锁和基于redis的锁的不同之处.md': {
    title: '基于Zookeeper的锁和基于Redis的锁的不同之处',
    date: '2024-10-07 09:30:00',
    tags: ['Zookeeper', 'Redis', '分布式锁'],
    categories: ['技术', '分布式锁'],
    permalink: 'zookeeper-redis-lock-difference'
  },
  '2024-10-10-PHP-FPM-进程占用-CPU-过高的情况排查.md': {
    title: 'PHP-FPM进程占用CPU过高的情况排查',
    date: '2024-10-10 09:30:00',
    tags: ['PHP', 'PHP-FPM'],
    categories: ['后端', 'PHP'],
    permalink: 'php-fpm-high-cpu-troubleshooting'
  },
  '2024-10-31-如何安全地重启 Laravel 任务队列让应用代码更新.md': {
    title: '如何安全地重启Laravel任务队列让应用代码更新',
    date: '2024-10-31 09:30:00',
    tags: ['Laravel', '队列'],
    categories: ['后端', 'PHP'],
    permalink: 'safely-restart-laravel-queue'
  },
  '2024-10-31-Laravel 验证规则大全及案例.md': {
    title: 'Laravel验证规则大全及案例',
    date: '2024-10-31 09:30:00',
    tags: ['Laravel'],
    categories: ['后端', 'PHP'],
    permalink: 'laravel-validation-rules'
  },
  '2024-10-31-web-view页面通过wx.miniProgram.navigateTo跳转到小程序页面.md': {
    title: '小程序和H5之间互相跳转实现方法',
    date: '2024-10-31 09:30:00',
    tags: ['小程序', 'web-view'],
    categories: ['前端', '小程序'],
    permalink: 'miniprogram-h5-jump'
  },
  'golang字符串json格式解析.md': {
    title: 'Golang字符串json格式解析',
    date: '2019-01-09 09:30:00',
    tags: ['golang', 'json'],
    categories: ['后端', 'Golang'],
    permalink: 'golang-json-parse'
  }
};

const today = new Date().toISOString().split('T')[0] + ' 12:00:00';

function generateStandardFrontmatter(info) {
  let output = '---\n';
  output += `title: ${info.title}\n`;
  output += `date: ${info.date}\n`;
  output += `updated: ${today}\n`;
  output += `tags:\n`;
  info.tags.forEach(tag => {
    output += `  - ${tag}\n`;
  });
  output += `categories:\n`;
  info.categories.forEach(cat => {
    output += `  - ${cat}\n`;
  });
  output += `permalink: ${info.permalink}\n`;
  output += '---\n';
  return output;
}

// 读取文件并提取内容（不包含frontmatter）
function extractContent(content) {
  const lines = content.split('\n');
  let inFrontmatter = false;
  let contentStart = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
      } else {
        contentStart = i + 1;
        break;
      }
    }
  }

  return lines.slice(contentStart).join('\n');
}

// 获取所有 .md 文件
const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));

let updatedCount = 0;
let skippedCount = 0;

files.forEach(filename => {
  const filePath = path.join(postsDir, filename);
  const info = fileInfoMap[filename];

  if (!info) {
    console.log(`跳过: ${filename} (未找到配置)`);
    skippedCount++;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const bodyContent = extractContent(content);
  const newFrontmatter = generateStandardFrontmatter(info);
  const newContent = newFrontmatter + bodyContent;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`更新: ${filename}`);
  updatedCount++;
});

console.log(`\n完成! 更新了 ${updatedCount} 个文件，跳过了 ${skippedCount} 个文件`);
