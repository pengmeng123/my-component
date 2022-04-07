import Antd, { Spin } from 'ant-design-vue'
module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/vue3",
  core : { 
    builder : "webpack5" ,  //This将告诉 Storybook 使用 Webpack 5 
  }
}
