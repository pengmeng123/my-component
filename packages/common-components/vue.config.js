const path = require("path");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
    .rule('less')
    .oneOf('normal-modules')
    .test(/.less$/)
    .use('css-loader')
    .tap(options => {
      return Object.assign(options, {
        modules: {
          localIdentName: '[name]__[local]___[hash:base64:5]',
          auto: /\.less$/i,
        },
      })
    });
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/global.less")]
    }
  }
});
