import { defineComponent, PropType, toRefs } from 'vue'
import { Dropdown } from 'ant-design-vue'
import Menu from './Menu'
import { IOptions, IType } from '../interface/options'
import styles from './Select.module.less'

export default defineComponent({
  props: {
    getPopupContainer: {
      type: Function,
    },
    disabled: {
      type: Boolean,
    },
    options: {
      type: Array as PropType<IOptions[]>,
    },
    type: {
      type: String as PropType<IType>,
      default: 'single',
    },
    value: {},
  },
  setup(props, { emit }) {
    const onChange = (value) => {
      emit('change', value)
    }
    return () => (
      <Dropdown
        trigger={['click']}
        getPopupContainer={props.getPopupContainer}
        disabled={props.disabled}
        v-slots={{
          overlay: () => <Menu {...props} onChange={onChange} />,
        }}
      >
        <a class="ant-dropdown-link">Hover me, Click menu item</a>
      </Dropdown>
    )
  },
})
