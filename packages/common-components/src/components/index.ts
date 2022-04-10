import Select from './Select'

const components = [Select]
function install(Vue) {
  components.forEach((component) => {
    Vue.use(component)
  })
}

export { install, Select }

export default install
