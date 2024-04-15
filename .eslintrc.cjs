module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    '@typescript-eslint/quotes': ['warn', 'single'],
    'jsx-quotes': ['warn', 'prefer-single'],
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-imports': [
  'warn',
  {
    'name': 'react-redux',
    'importNames': ['useSelector', 'useDispatch'],
    'message': 'Usa el hook  `useAppDispatch` y `useAppSelector` en ves de usar `useDispatch`.'
  }
],
  },
  
}
