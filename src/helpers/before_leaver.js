let $ = require('jquery')
const beforeLeave = {
  created() {
    window.addEventListener('beforeunload', this.handleBrowseLeave)
  },
  beforeRouteLeave(to, from, next) {
    this.handleLeave(to, from, next)
  },
  methods: {
    handleBrowseLeave(e) {
      if (this.isSaved()) {
        return undefined
      }
      e.returnValue = null
      return null
    },
    handleLeave(to, from, next) {
      if (this.beforeLeaveHasAllowed) {
        next()
        return
      }
      if (!this.isSaved()) {
        this.$confirm('尚未保存，确认离开？', '提示', {
          type: 'warning',
        })
          .then(() => {
            this.beforeLeaveHasAllowed = true
            next()
          })
          .catch(() => {
            this.beforeLeaveHasAllowed = false
          })
      } else {
        next()
      }
    },
  },
}
export default beforeLeave