module.exports = {
  root: true,
  extends: ['universe/native', 'plugin:import/recommended'],
  plugins: ['unused-imports'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': 'warn',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],
  },
  settings: {
    'import/ignore': 'firebase/auth',
    'import/resolver': {
      node: {
        paths: ['.'],
      },
      alias: {
        map: [
          ['~components', './components'],
          ['~assets', './src/assets'],
          ['~redux', './src/redux'],
          ['~utils', './src/utils'],
          ['~app', './src/app'],
          ['~firebase', './src/firebase'],
        ],
        extensions: ['.ts', '.js', '.tsx', '.json', '.stories.tsx'],
      },
    },
  },
};
