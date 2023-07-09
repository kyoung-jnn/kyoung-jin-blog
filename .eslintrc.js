const STATUS = {
  OFF: 'off',
  WARNING: 'warn',
  ERROR: 'error',
};

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: true,
    commonjs: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'import', 'react', '@emotion'],
  extends: [
    'eslint:recommended',
    'next',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': { typescript: {} },
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': STATUS.OFF, // import React 필수
    'react/no-unknown-property': [STATUS.ERROR, { ignore: ['css'] }], // emotion css attributes
  },
};
