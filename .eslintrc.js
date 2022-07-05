module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:react-hooks/recommended"
  ],
  rules: {
    'react/prop-types': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 1,
    "@typescript-eslint/no-explicit-any": 2,
    'react-hooks/exhaustive-deps': 1,
    'keyword-spacing': [2, { before: true, after: true }],
    'no-nested-ternary': 1,
    'react/no-multi-comp': 0,
    'react/no-render-return-value': 0,
    '@typescript-eslint/no-var-requires': 2,
    '@typescript-eslint/ban-ts-comment': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-useless-constructor': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
      { blankLine: 'always', prev: '*', next: 'multiline-const' },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
    ],
    'prefer-destructuring': ['error', {
      array: true,
      object: true,
    }, {
      enforceForRenamedProperties: false,
    }],
  },
};
