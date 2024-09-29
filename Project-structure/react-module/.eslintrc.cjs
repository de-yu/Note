module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
  },
}
