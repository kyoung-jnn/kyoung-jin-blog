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
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', '@emotion'],
  settings: {
    'import/resolver': { typescript: {} },
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': STATUS.OFF, // import React 필수
    'react/no-unknown-property': [STATUS.ERROR, { ignore: ['css'] }], // emotion css attributes
    'react-hooks/exhaustive-deps': STATUS.ERROR,
  },
};
