import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
    // 根据仓库地址设置 base
  base: '/', // 仓库是 <username>.github.io 时用这个
  // 如果是其他仓库，例如仓库名是 my-docs，则改为 base: '/my-docs/'
})