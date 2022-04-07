
// import Antd, { Spin } from 'ant-design-vue'
// import Vue from 'vue'
// import '@/styles/main.less'

// Vue.use(Antd)

// const path = require('path')

// module.exports = async ({ config, mode }) => {
//   // Automatically generate annotation
//   config.module.rules.push({
//     test: /\.(j|t)sx$/,
//     use: 'vue-docgen-loader',
//     enforce: 'post',
//   })
//   // Support `.tsx`
//   config.module.rules.push({
//     test: /\.(j|t)sx$/i,
//     use: [
//       {
//         loader: 'babel-loader',
//         options: {
//           presets: ['@vue/cli-plugin-babel/preset', '@babel/preset-typescript'],
//           // babelrc: false,
//           // plugins: [
//           //   'lodash',
//           //   [
//           //     'import',
//           //     {
//           //       libraryName: 'ant-design-vue',
//           //       libraryDirectory: 'es',
//           //       style: false,
//           //     },
//           //   ],
//           // ],
//         },
//       },
//     ],
//   })
//   config.module.rules.push({
//     test: /\.less$/,
//     use: [
//       'style-loader',
//       {
//         loader: 'css-loader',
//         options: {
//           modules: {
//             localIdentName: '[path][name]__[local]',
//             exportLocalsConvention: 'camelCaseOnly',
//             auto: true,
//           },
//         },
//       },
//       {
//         loader: 'less-loader',
//         options: {
//           lessOptions: {
//             javascriptEnabled: true,
//             math: 'always',
//           },
//         },
//       },
//     ],
//   })
//   return config
// }
