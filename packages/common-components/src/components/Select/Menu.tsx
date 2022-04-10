import { defineComponent, PropType, toRefs } from 'vue'
import { Menu } from 'ant-design-vue'
import { IOptions, IType } from '../interface/options'
import { SINGLE, MULTIPLE } from '../config/common'
import _ from 'lodash'
import styles from './Select.module.less'
import shareStyles from '../../styles/share.module.less'

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
  setup(props, { emit }) {
    const renderLabel = (option, index) => {
      let node
      let checked = false
      switch (props.type) {
        case SINGLE: {
          if (!_.isNil(props.value) && _.isObject(props.value)) {
            checked = _.isEqual(option.value, props.value)
          } else {
            checked = option.value === props.value
          }
          node = <div>{option.label}</div>
          break
        }
        case MULTIPLE: {
          break
        }
        default: {
          break
        }
      }
      node.$_checked = checked
      return node
    }
    const renderItem = (option, index) => {
      const label = renderLabel(option, index)
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
    }
    const callChange = (value) => {
      if (_.isNil(value)) {
        emit('change', undefined)
        return
      }
      let fieldValue = props.value
      switch (props.type) {
        case SINGLE: {
          if (props.value && _.isEqual(props.value, value)) {
            return
          }
          fieldValue = value
          break
        }
        default:
          break
      }
      emit('change', fieldValue)
    }
    const handleMenuClick = ({ key }) => {
      if (key === -1) {
        return
      }
      const option = props.options[key]
      if (option) {
        callChange(option.value)
      }
    }
    return () => (
      <Menu class={{ [styles.menu]: true }} slot="overlay" onClick={handleMenuClick}>
        {props.options?.map((option, index) => renderItem(option, index))}
      </Menu>
    )
  },
})
