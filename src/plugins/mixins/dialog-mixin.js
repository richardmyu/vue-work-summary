export default {
  data() {
    return {
      visible: false,
      submitting: false
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
}
