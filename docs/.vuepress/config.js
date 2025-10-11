const path = require('path')
require('dotenv').config()

module.exports = {
  title: 'Metal-Organic-Framework',

  description: "MOF INFO. of utopiaye's blog",

  locales: {
    '/': {
      lang: 'en-US',
    },
  },

  evergreen: true,

  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-132770851-331',
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
  },

  theme: path.resolve(__dirname, '../../lib'),

  themeConfig: {
    lang: 'en-US',
    personalInfo: {
      nickname: 'utopiaye',
      description: 'MOF',
      email: '307191020@qq.com',
      location: 'GZ, China',
      avatar: 'https://www.meteorlxy.cn/assets/img/avatar.jpg',
      sns: {
        github: {
          account: 'utopiaye',
          link: 'https://github.com/utopiaye',
        },
      },
    },

    header: {
      background: {
        // url: '/assets/img/header-image-01.jpg',
        useGeo: true,
      },
      showTitle: true,
    },

    footer: {
      poweredBy: true,
      poweredByTheme: true,
      custom:
        'Copyright 2018-present <a href="https://github.com/utopiaye" target="_blank">utopiaye</a> | MIT License',
    },

    infoCard: {
      headerBackground: {
        // url: '/assets/img/header-image-01.jpg',
        useGeo: true,
      },
    },

    lastUpdated: true,

    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/', exact: false },
      { text: 'Custom Pages', link: '/custom-pages/', exact: false },
    ],

    // Enable smooth scrolling or not
    smoothScroll: false,

    // Configs for vuepress-plugin-zooming
    zooming: {
      // @see https://vuepress.github.io/en/plugins/zooming
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
