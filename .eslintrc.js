module.exports = {
  env: {
    browser: false,
    node: true, // 关键：启用 Node 环境
    es2020: true
  },
  parserOptions: {
    ecmaVersion: 2020, // 支持现代 ES 语法
    sourceType: 'module'
  },
  globals: {
    $site: true,
    $page: true
  },
  rules: {
    // 可根据需要添加规则
    'no-undef': 'error'
  }
}