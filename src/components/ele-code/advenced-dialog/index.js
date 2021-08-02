import advancedDialog from './index.vue'

const install = Vue => {
  Vue.component(advancedDialog.name, advancedDialog)
}

export default { install }
