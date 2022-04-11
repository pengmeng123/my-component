import { defineComponent, PropType, toRefs } from 'vue'
import { Dropdown } from 'ant-design-vue'
import Menu from './Menu'
import SelectTrigger from '../SelectTrigger'
import { IOptions, IType } from '../interface/options'
import styles from './Select.module.less'
import { MULTIPLE, SINGLE } from '../config/common'
import _ from 'lodash'

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
    showValueLabel: {
      type: Boolean,
    },
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    },
    renderLabel() {
      const { type, value, options } = this
      const active = type === SINGLE ? value !== undefined : _.get(value, 'length', 0) > 0
      const count = active && type === MULTIPLE ? `${_.get(value, 'length')}` : 0
      let referenceLabel
      if (active && type === SINGLE) {
        referenceLabel = _.get(
          options?.find((o) => _.isEqual(o.value, value)),
          'label'
        )
      }
      if (type === MULTIPLE && count > 0) {
        referenceLabel = `已选择 ${count}项`
        if (this.showValueLabel) {
          referenceLabel = options
            ?.filter((o) => _.findIndex(value, (sv) => _.isEqual(o.value, sv) !== -1))
            .map((o) => o.label)
            .join('/')
        }
      }
      return <SelectTrigger placeholder="请选择" label={referenceLabel} />
      // return <a class="ant-dropdown-link">Hover me, Click menu item</a>
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
        {this.renderLabel()}
      </Dropdown>
    )
  },
})
