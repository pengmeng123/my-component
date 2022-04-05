import { defineComponent } from 'vue'

import useCount from '@/hooks/useCount'
export default defineComponent({
  setup() {
    const { count, multiple, increase, decrease } = useCount(10)
    return () => (
      <div>
        <p>count---{count.value}</p>
        <p>multiple---{multiple.value}</p>
        <button
          onClick={() => {
            console.log(123)
            increase(10)
          }}
        >
          increase
        </button>
        <button
          onClick={() => {
            decrease(10)
          }}
        >
          increase
        </button>
      </div>
    )
  },
})
