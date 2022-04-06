import { defineComponent, ref, provide } from 'vue'
import HelloWorld from '@/components/HelloWorld'
import {columnType} from '@pengmeng/fe-utils'
import Select from '@/components/Select'
const items = [
  {
    label: '小米',
    value: 'xiaomin'
  }
]
export default defineComponent({
  name: 'HomeView',
  setup() {
    const sonRef:any = ref()
    
    const clickMe = ()=>{
      console.log('columnType---', columnType)
      sonRef.value.aa()
    }
    provide('clickMe', clickMe)
    return () => (
      <div>
        <a onClick={clickMe}>click me</a>
        <HelloWorld ref={sonRef} items={items}/>
        <Select/>
      </div>
    )
  },
})
