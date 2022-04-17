import { defineComponent, PropType, toRefs } from 'vue'
import { Dropdown, Menu, Popover, InputNumber, Select } from 'ant-design-vue'
import MenuComponent from './Menu'
import SelectTrigger from '../SelectTrigger'
import CustomizeDateRange from './CustomizeDateRange'
import CustomizeNumberRange from './CustomNumberRange'
import { IOptions, IType } from '../interface/options'
import styles from './Select.module.less'
import shareStyles from '../../styles/share.module.less'
import { MULTIPLE, SINGLE } from '../config/common'
import { defaultParser } from '@pengmeng/fe-utils/lib/parser'
import _, { isEqual } from 'lodash'

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
      required: true,
    },
    type: {
      type: String as PropType<IType>,
      default: 'single',
    },
    value: {
      type: [String, Number, Object, Array] as PropType<any | Array<any>>,
    },
    showValueLabel: {
      type: Boolean,
    },
    customize: {
      type: String,
    },
    customizeProps: {
      type: Object,
    },
    parser: {
      type: Object,
      default: () => defaultParser,
    },
  },
  data() {
    return {
      visible: false,
      customizeValue: undefined,
      customizeVisible: false,
    }
  },
  computed: {
    isMultiple() {
      return this.type === 'multiple'
    },
  },
  methods: {
    onChange(value) {
      if (!this.isMultiple) {
        this.visible = false
      }
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
            .filter((o) => {
              return _.findIndex(value, (sv) => isEqual(o.value, sv)) !== -1
            })
            .map((o) => o.label)
            .join('/')
        }
      }
      return (
        <SelectTrigger
          placeholder="请选择"
          label={referenceLabel}
          onClear={() => {
            this.onChange(undefined)
          }}
        />
      )
    },
    onVisibleChange(v) {
      this.visible = v
    },
    handleCustomizeReset() {
      this.customizeValue = undefined
    },
    handleCustomizeChange() {
      console.log('customizeValue111----', this.customizeValue)
      // const parse = _.get(this.parser, `${this.customize}.toSource`)
      // if (parse) {
      //   const v = parse(this.customizeValue)
      //   console.log(v)
      //   if (_.isNil(v)) {
      //     console.log('isnil-----')
      //   } else {
      //     this.onChange(v)
      //   }
      // }
      // console.log('submit', parse)
    },
    renderCustomize() {
      let node
      let popoverProps = {}
      const data = {
        value: this.customizeValue,
        onChange: (value) => {
          console.log('value----', value)
          this.customizeValue = value
        },
        onReset: this.handleCustomizeReset,
        onSubmit: this.handleCustomizeChange,
      }
      switch (this.customize) {
        case 'date-range':
          node = <CustomizeDateRange />
          popoverProps = {
            placement: 'rightTop',
            align: {
              offset: [20, 0],
            },
          }
          break
        case 'number-range':
          node = <CustomizeNumberRange {...data} />
          popoverProps = {
            placement: 'rightBottom',
            align: {
              offset: [20, 10],
            },
          }
          break
        default:
          return null
      }
      return (
        <Menu.Item
          class={{
            [shareStyles.menuItem]: true,
            [shareStyles.menuItemWithChildren]: true,
            [shareStyles.menuItemChecked]: false,
          }}
        >
          <Popover
            trigger={['hover']}
            overlayClassName={styles.groupItemCustomizeOverlay}
            v-slots={{ content: () => node }}
            {...popoverProps}
          >
            <div>123</div>
          </Popover>
        </Menu.Item>
      )
    },
  },
  render() {
    return (
      <Dropdown
        trigger={['click']}
        getPopupContainer={this.getPopupContainer}
        disabled={this.disabled}
        visible={this.visible}
        onVisibleChange={this.onVisibleChange}
        v-slots={{
          overlay: () => (
            <MenuComponent
              value={this.value}
              type={this.type}
              options={this.options}
              onChange={this.onChange}
            >
              {this.renderCustomize()}
            </MenuComponent>
          ),
        }}
      >
        {this.renderLabel()}
      </Dropdown>
    )
  },
})
