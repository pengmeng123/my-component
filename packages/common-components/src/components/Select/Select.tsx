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
  methods: {
    onChange(value) {
      this.$emit('change', value)
    },
  },
  render() {
    return (
      <Dropdown
        trigger={['click']}
        getPopupContainer={this.getPopupContainer}
        disabled={this.disabled}
        v-slots={{
          overlay: () => (
            <Menu
              value={this.value}
              type={this.type}
              options={this.options}
              onChange={this.onChange}
            />
          ),
        }}
      >
        <a class="ant-dropdown-link">Hover me, Click menu item</a>
      </Dropdown>
    )
  },
})
