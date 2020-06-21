module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint-config-airbnb-base'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': ['error', { functions: false }],
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'no-restricted-globals': 'off',
  },
};
