module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'react/prop-types': 0,
    'no-restricted-imports': ['error', { patterns: ['../*'] }],
    'import/first': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index']
      }
    ],
    'import/no-default-export': 'error',
    'import/no-useless-path-segments': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    semi: [2, 'always']
  }
};
