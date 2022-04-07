import { createApp } from 'vue'
import Antd, { Spin } from 'ant-design-vue'
import '../src/styles/main.less'
createApp().use(Antd)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
