import { defineComponent } from 'vue'
import { DownOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'
import styles from './SelectTrigger.module.less'

export default defineComponent({
  name: 'SelectTrigger',
  props: {
    label: {
      type: [Number, String],
    },
    placeholder: {
      type: String,
    },
    visible: {
      type: Boolean,
    },
    autoResize: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      hovering: false,
    }
  },
  computed: {
    showClearBtn() {
      if (this.label) {
        if (this.hovering) {
          return true
        }
      }
      return false
    },
  },
  methods: {
    handleClickClearBtn(e) {
      e.stopPropagation()
      this.$emit('clear')
    },
    handleMouseenter() {
      this.hovering = true
    },
    handleMouseLeave() {
      this.hovering = false
    },
  },
  render() {
    const showClear = this.allowClear && this.showClearBtn

    return (
      <div
        class={{
          [styles.trigger]: true,
          [styles.triggerExpanded]: this.visible,
          [styles.triggerAutoResize]: this.autoResize,
        }}
        onMouseenter={this.handleMouseenter}
        onMouseleave={this.handleMouseLeave}
      >
        <div
          class={[
            'ant-input',
            styles.label,
            {
              'ant-input-disabled': this.disabled,
            },
          ]}
        >
          {this.label && <span>{this.label}</span>}
          {!this.label && this.placeholder && <span>{this.placeholder}</span>}

          <CloseCircleOutlined
            class={styles.clearBtn}
            v-show={showClear}
            onClick={this.handleClickClearBtn}
          />
          <DownOutlined class={styles.arrow} v-show={!showClear} />
        </div>
      </div>
    )
  },
})
