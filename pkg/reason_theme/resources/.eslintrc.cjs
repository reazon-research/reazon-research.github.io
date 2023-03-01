module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    // 'indent': [
    //     'error',
    //     4
    // ],
    'linebreak-style': ['error', 'unix'],
    // 'quotes': [
    //     'error',
    //     'single'
    // ],
    // 'semi': [
    //     'error',
    //     'always'
    // ]
  },
};
