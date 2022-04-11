module.exports = {
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['/modules/*', 'dist/*', '/src/assets/*', '/src/static/*', '/src/mock/*'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-empty-function': ['error', { allow: ['functions'] }],
  },
}
