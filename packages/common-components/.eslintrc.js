module.exports = {
    env: {
      browser: true,
      node: true,
    },
    ignorePatterns: ['/modules/*', 'dist/*', '/src/assets/*', '/src/static/*', '/src/mock/*'],
    extends: [
      "plugin:vue/vue3-recommended",
      "eslint:recommended",
      "@vue/typescript/recommended",
      // Add under other rules
      // "@vue/prettier",
      // "@vue/prettier/@typescript-eslint"
    ],
    rules: {},
  }