import { ref, reactive, computed, PropType, defineComponent, inject, watchEffect } from 'vue'

interface Iitems {
  label: string
  value: string | number
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String as PropType<string>,
    },
    items: {
      type: Array as PropType<Iitems[]>,
      required: true,
    },
  },
  methods: {
    aa() {
      console.log('123--')
      return 12
    },
  },
  setup(props, { expose }) {
    const count = ref(1)
    const obj = reactive({
      a: 1,
    })
    const addCount = () => {
      count.value++
      obj.a++
    }
    const count1 = computed(() => count.value + 2)
    const obj1 = computed(() => obj.a + 2)
    const clickMe: any = inject('clickMe')

    // const stopWatchRoom = watch([count, obj], ([pr, cr], [pre, cre])=>{
    //   console.log('pr-=--', pr, cr)
    //   console.log('pre----', pre, cre)
    // })
    // setTimeout(()=>{
    //   stopWatchRoom();
    // }, 3000)

    watchEffect(()=>{
      console.log(count.value)
    })
    

    // expose({
    //   addCount,
    // })
    return () => (
      <div>
        <div>sss-{props.msg}---</div>
        <a onClick={addCount}>
          button{count.value}-{obj.a}-{count1.value}-{obj1.value}
        </a>
        <div>
          <a
            onClick={clickMe}
          >
            click me9999
          </a>
        </div>
      </div>
    )
  },
})
