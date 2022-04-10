import { defineComponent, PropType, toRefs } from 'vue'
import { Menu, Checkbox } from 'ant-design-vue'
import { IOptions, IType } from '../interface/options'
import { SINGLE, MULTIPLE } from '../config/common'
import _ from 'lodash'
import styles from './Select.module.less'
import shareStyles from '../../styles/share.module.less'
import { convertLegacyProps } from 'ant-design-vue/lib/button/buttonTypes'
const stopPropagation = (e) => e.stopPropagation()

export default defineComponent({
  props: {
    options: {
      type: Array as PropType<IOptions[]>,
      default: () => [],
    },
    type: {
      type: String as PropType<IType>,
      default: SINGLE,
    },
    value: {},
  },
  methods: {
    renderItem(option, index) {
      const label = this.renderLabel(option, index)
      return (
        <Menu.Item
          key={index}
          class={{
            [shareStyles.menuItem]: true,
            [shareStyles.menuItemChecked]: label.$_checked,
          }}
        >
          {label}
        </Menu.Item>
      )
    },
    renderLabel(option, index) {
      let node
      let checked = false
      switch (this.type) {
        case SINGLE: {
          if (!_.isNil(this.value) && _.isObject(this.value)) {
            checked = _.isEqual(option.value, this.value)
          } else {
            checked = option.value === this.value
          }
          node = <div>{option.label}</div>
          break
        }
        case MULTIPLE: {
          checked = _.some(this.value || [], (v) => _.isEqual(v, option.value))
          node = (
            <Checkbox
              checked={checked}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              {option.label}
            </Checkbox>
          )
          break
        }
        default: {
          break
        }
      }
      node.$_checked = checked
      return node
    },
    callChange(value) {
      let fieldValue
      switch (this.type) {
        case SINGLE: {
          if (_.isNil(value)) {
            this.$emit('change', undefined)
            return
          }
          if (this.value && _.isEqual(this.value, value)) {
            return
          }
          fieldValue = value
          break
        }
        case MULTIPLE: {
          fieldValue = this.value
          if (_.isNil(value)) {
            return
          }
          if (!fieldValue || !Array.isArray(fieldValue)) {
            fieldValue = [value]
          } else {
            const index = _.findIndex(fieldValue, (v) => _.isEqual(v, value))
            if (index === -1) {
              fieldValue = fieldValue.concat(value)
            } else {
              fieldValue = fieldValue.slice()
              fieldValue.splice(index, 1)
            }
          }
          break
        }
        default:
          break
      }
      this.$emit('change', fieldValue)
    },
    handleMenuClick({ key }) {
      if (key === -1) {
        return
      }
      const option = this.options[key]
      if (option) {
        this.callChange(option.value)
      }
    },
  },
  render() {
    return (
      <Menu class={{ [styles.menu]: true }} onClick={this.handleMenuClick}>
        {this.options?.map((option, index) => this.renderItem(option, index))}
      </Menu>
    )
  },
})
