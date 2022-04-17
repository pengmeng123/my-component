import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import NumberRange from '../NumberRange'
import styles from './Select.module.less'
export default defineComponent({
  props: {
    value: {
      type: Array,
    },
    width: {
      type: String,
      default: '200px',
    },
  },
  methods: {
    onChange(c) {
      console.log('c----', c)
      this.$emit('change', c)
    },
    onReset(e) {
      this.$emit('reset')
    },
    onSubmit(e) {
      this.$emit('submit')
    },
  },
  render() {
    return (
      <div class={styles.groupNumberRange}>
        <NumberRange
          width={this.width}
          value={this.value}
          onChange={this.onChange}
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        />
        <div class={styles.groupNumberRangeBtns}>
          <Button size="small" type="link" onClick={this.onReset}>
            清空
          </Button>
          <Button size="small" type="link" onClick={this.onSubmit}>
            确定
          </Button>
        </div>
      </div>
    )
  },
})
