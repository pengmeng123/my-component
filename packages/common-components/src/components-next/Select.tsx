import { defineComponent, PropType } from 'vue'
import { Select } from 'ant-design-vue'
// import styles from './Select.module.less'

export default defineComponent({
  props: {
    size: String as PropType<string>,
  },
  setup() {
    const options = [
      {
        label: '小米',
        value: 1,
      },
      {
        label: '华为',
        value: 2,
      },
    ]
    return () => (
      <div>
        sss
        <Select
          options={options}
          placeholder="请选择"
          style={{
            width: '200px',
          }}
        />
      </div>
    )
  },
})
