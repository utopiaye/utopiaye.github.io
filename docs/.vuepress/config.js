const path = require('path')
require('dotenv').config()

// 站点基础信息（SEO核心配置）
const siteInfo = {
  title: 'Metal-Organic Framework (MOF) | 金属有机框架材料',
  description: '探索MOF材料的最新研究、应用案例与未来前景 | 金属有机框架(MOF)知识库',
  domain: 'mof.top',
  keywords: [
    'MOF',
    '金属有机框架',
    'MOF材料',
    'MOF应用',
    'Metal-Organic Framework',
    'MOF研究',
    'MOF前景',
  ],
  author: 'utopiaye',
  lang: 'zh-CN',
}

module.exports = {
  // 基础URL配置（重要！影响SEO和资源加载）
  base: '/',
  dest: 'dist',

  // 站点核心信息
  title: siteInfo.title,
  description: siteInfo.description,

  // 语言配置（多语言SEO优化）
  locales: {
    '/': {
      lang: siteInfo.lang,
      // 语言特定元数据
      meta: [
        { name: 'language', content: siteInfo.lang === 'zh-CN' ? 'Chinese' : 'English' },
      ],
    },
  },

  evergreen: true,

  // 插件配置（SEO增强）
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-132770851-331', // 保持现有GA配置
      },
    ],
    // SEO元数据插件
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description || siteInfo.description,
        author: (_, $site) => $site.themeConfig.personalInfo.nickname,
        keywords: ($page, $site) => [
          ...siteInfo.keywords,
          ...($page.frontmatter.keywords || []),
        ],
        canonical: ($page, $site) => `${siteInfo.domain}${$page.path}`,
        openGraph: {
          type: 'website',
          url: ($page, $site) => `${siteInfo.domain}${$page.path}`,
          title: $page => $page.title || siteInfo.title,
          description: $page => $page.frontmatter.description || siteInfo.description,
          images: ($page) => {
            // 使用页面封面图作为OGP图片，默认使用站点头像
            const avatar = $site.themeConfig.personalInfo.avatar
            return $page.frontmatter.cover || avatar ? [
              $page.frontmatter.cover || avatar,
            ] : []
          },
          site_name: siteInfo.title,
        },
        // 百度站点验证（可选）
        baiduSiteVerification: '你的百度验证代码',
        // 谷歌站点验证（可选）
        googleSiteVerification: '你的谷歌验证代码',
      },
    ],
    // 生成sitemap.xml（对搜索引擎友好）
    [
      'sitemap',
      {
        hostname: `https://${siteInfo.domain}`,
        exclude: ['/404.html'], // 排除不需要索引的页面
        changefreq: 'weekly', // 内容更新频率
        priority: 0.8, // 站点优先级
      },
    ],
    // 自动生成robots.txt
    [
      'robots',
      {
        host: `https://${siteInfo.domain}`,
        sitemap: `https://${siteInfo.domain}/sitemap.xml`,
        rules: [
          { userAgent: '*', allow: '/' },
        ],
      },
    ],
  ],

  chainWebpack: (config, isServer) => {
    if (isServer === false) {
      config.optimization.splitChunks({
        maxInitialRequests: 5,
        cacheGroups: {
          vue: {
            test: /[\\/]node_modules[\\/](vue|vue-router|vssue)[\\/]/,
            name: 'vendor.vue',
            chunks: 'all',
          },
          commons: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendor.commons',
            chunks: 'all',
          },
        },
      })
    }
    // 优化图片加载（SEO间接影响）
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => ({
        ...options,
        limit: 10000, // 小图片转base64，减少请求
        name: 'assets/img/[name].[hash:8].[ext]',
      }))
  },

  theme: path.resolve(__dirname, '../../lib'),

  themeConfig: {
    // 基础SEO信息
    lang: siteInfo.lang,
    metaTitle: siteInfo.title,
    metaDescription: siteInfo.description,

    personalInfo: {
      nickname: siteInfo.author,
      description: '专注MOF材料研究与分享',
      email: '307191020@qq.com',
      location: 'GZ, China',
      // 优化头像ALT文本（SEO友好）
      avatar: {
        src: 'https://media.istockphoto.com/id/183047071/zh/%E7%85%A7%E7%89%87/glucosamine-model.jpg?s=1024x1024&w=is&k=20&c=IEEVy-GBToPRGR81qCKAaWkquc_4f9lL_B_nFPJDjj0=',
        alt: 'MOF材料分子结构示意图',
      },
      sns: {
        github: {
          account: 'utopiaye',
          link: 'https://github.com/utopiaye',
        },
      },
    },

    header: {
      background: {
        // 建议添加一张与MOF相关的高质量背景图
        // url: '/assets/img/mof-header.jpg',
        useGeo: true,
      },
      showTitle: true,
    },

    footer: {
      poweredBy: true,
      poweredByTheme: true,
      custom: `
        Copyright 2018-present <a href="https://github.com/utopiaye" target="_blank">${siteInfo.author}</a> |
        <a href="https://${siteInfo.domain}" rel="home">${siteInfo.domain}</a> |
        <a href="/sitemap.xml">网站地图</a> |
        MIT License
      `,
    },

    infoCard: {
      headerBackground: {
        // url: '/assets/img/header-image-01.jpg',
        useGeo: true,
      },
    },

    // 显示最后更新时间（对SEO友好，表明内容时效性）
    lastUpdated: true,
    lastUpdatedText: '最后更新时间',

    nav: [
      { text: '首页', link: '/', exact: true },
      { text: 'MOF文章', link: '/posts/', exact: false },
      // { text: '关于MOF', link: '/about/', exact: false }, // 新增关于页面提升站点完整性
      // { text: '研究资源', link: '/resources/', exact: false }, // 新增资源页面
    ],

    smoothScroll: true, // 开启平滑滚动提升用户体验（间接影响SEO）

    zooming: {
      selector: '.content img:not(.no-zoom)', // 图片放大功能，提升体验
    },

    comments: {
      owner: 'utopiaye',
      repo: 'Metal-Organic-Framework',
      clientId: process.env.VUEPRESS_COMMENT_CLIENT_ID,
      clientSecret: process.env.VUEPRESS_COMMENT_CLIENT_SECRET,
      autoCreateIssue: false,
    },

    pagination: {
      perPage: 10,
    },
  },
}
