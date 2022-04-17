import { defineComponent } from 'vue'
import { InputNumber } from 'ant-design-vue'
import _ from 'lodash'
import styles from './NumberRange.module.less'
const isValidNumberValue = (numbers) => {
  return numbers.filter((v) => !_.isNil(v)).every((v) => _.isNumber(_.toNumber(v)))
}
export default defineComponent({
  props: {
    size: {
      type: String,
      default: 'default',
    },
    placeholder: {
      type: Array,
      default: () => ['请输入', '请输入'],
    },
    value: Array,
    defaultValue: {
      type: Array,
    },
    max: {
      type: Array,
      default: () => [999999999, 999999999],
    },
    min: {
      type: Array,
      default: () => [0, 0],
    },
    unit: {
      type: String,
    },
    step: {
      type: Array,
      default: () => [1, 1],
    },
    width: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {
      internalValue: this.value || this.defaultValue || [],
    }
  },
  watch: {
    value(v) {
      this.internalValue = Array.isArray(v) ? v : []
    },
  },
  methods: {
    handleChange(i, value) {
      const nextValue = this.internalValue.slice()
      nextValue[i] = _.isNil(value) || value === '' ? undefined : value
      if (!isValidNumberValue(nextValue)) {
        return
      }
      this.internalValue = nextValue
      console.log('nextValue---', nextValue)
      this.$emit('change', nextValue)
    },
    handleKeydown(i, e) {
      if (e.keyCode !== 13) {
        return
      }

      const ref = (this as any).$refs.input[i]
      console.log('ref---', ref)
      if (!ref) {
        return
      }

      ref.blur()
    },
    search() {
      this.$nextTick(() => {
        this.$emit('search', this.internalValue)
      })
    },
  },
  render() {
    const { unit, size, width } = this
    const inputProps = [0, 1].map((i) => {
      const data = ['placeholder', 'defaultValue', 'max', 'min', 'step'].reduce(
        (p: any, k) => {
          if (this[k]) {
            p[k] = this[k][i]
          }
          return p
        },
        {
          size,
          onChange: (v) => this.handleChange(i, v),
          keydown: (e) => this.handleKeydown(i, e),
          onBlur: this.search,
          style: {
            width,
          },
        }
      )
      data.value = this.internalValue[i]
      return data
    })
    const x = <InputNumber />
    const y = <InputNumber />
    return (
      <div class={styles.numberRange}>
        <div class={styles.numberRangeRow}>
          <span>从</span>
          {x}
          {unit && <span>{unit}</span>}
        </div>
        <div class={styles.numberRangeRow}>
          <span>从</span>
          {y}
          {unit && <span>{unit}</span>}
        </div>
      </div>
    )
  },
})
