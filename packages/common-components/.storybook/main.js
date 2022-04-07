const path = require('path')

const CWD = path.resolve(__dirname, '../src')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/vue3',
  core: {
    builder: 'webpack5', //This将告诉 Storybook 使用 Webpack 5
  },
  webpackFinal: async (config) => {
    // Support `@` alias
    config.resolve.alias['@'] = CWD

    // Automatically generate annotation
    config.module.rules.push({
      test: /\.(j|t)sx$/,
      use: 'vue-docgen-loader',
      enforce: 'post',
    })

    // Support `.tsx`
    config.module.rules.push({
      test: /\.(j|t)sx$/i,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@vue/cli-plugin-babel/preset',
              '@babel/preset-typescript',
            ],
            // babelrc: false,
            // plugins: [
            //   'lodash',
            //   [
            //     'import',
            //     {
            //       libraryName: 'ant-design-vue',
            //       libraryDirectory: 'es',
            //       style: false,
            //     },
            //   ],
            // ],
          },
        },
      ],
    })

    // Support `.modules.less`
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]',
              exportLocalsConvention: 'camelCaseOnly',
              auto: true,
            },
          },
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
              math: 'always',
            },
          },
        },
      ],
    })

    return config
  },
}
