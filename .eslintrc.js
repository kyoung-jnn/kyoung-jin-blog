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
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'react-hooks', '@emotion'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': { typescript: {} },
    react: { version: 'detect' },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // import React 필수
    'react/no-unknown-property': ['error', { ignore: ['css'] }], // emotion css attributes
  },
};
