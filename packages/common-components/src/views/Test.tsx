import { defineComponent } from 'vue'
import { Select } from '@/components'

const options = [
  {
    label: '近7天',
    value: { currently: true, flag: 1, number: 7, unit: 'day' },
  },
  {
    label: '近30天',
    value: { currently: true, flag: 1, number: 30, unit: 'day' },
  },
]

export default defineComponent({
  data() {
    return {
      value: undefined,
    }
  },
  methods: {
    onChange(value) {
      console.log('8----', value)
      this.value = value
    },
  },
  render() {
    return <Select value={this.value} options={options} onChange={this.onChange} />
  },
})
