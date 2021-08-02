module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-irregular-whitespace': 'off',
    'no-async-promise-executor': 'off',
    'no-unused-vars': 'off',
    'vue/no-reserved-keys': 'off',
    'require-atomic-updates': 'off',
    semi: ['error', 'never'],
    quotes: ['error', 'single']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
