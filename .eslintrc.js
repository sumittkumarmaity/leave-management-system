module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  env: {
    node: true,
    es2021: true
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      }
    }
  }
};
