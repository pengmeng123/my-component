module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        corejs: { version: 3 },
        useBuiltIns: 'usage',
        polyfills: [
          'es.array.find',
          'es.array.find-index',
          'es.object.entries',
          'es.object.values',
          'es.array.includes',
        ],
        targets: {
          browsers: '> 1%, last 2 versions, not dead',
        },
      },
    ],
  ],
  // plugins: ['lodash', ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: false }]],
};
