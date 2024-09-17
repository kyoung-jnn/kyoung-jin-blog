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
  settings: {
    react: { version: 'detect' },
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
  rules: {
    'react/react-in-jsx-scope': STATUS.OFF, // import React 필수
    'react/no-unknown-property': [STATUS.ERROR, { ignore: ['css'] }], // emotion css attributes
    'react-hooks/exhaustive-deps': STATUS.ERROR,
    'import/order': [
      STATUS.WARNING,
      {
        groups: ['builtin', 'external', 'internal', 'index'],
        pathGroups: [
          {
            pattern: '{react*,react/**,}',
            group: 'builtin',
          },
          {
            pattern: '{next*,next/**,}',
            group: 'builtin',
          },
          {
            pattern: '@/components/*',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: '*.css.ts',
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
