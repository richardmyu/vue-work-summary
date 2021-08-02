// 拖拽弹框
const overer = 200
export default {
  bind: function(el, binding, vnode) {
    if (binding.value === false) {
      return false
    }
    const dlg = el.querySelector('.el-dialog')
    const docEl = document.documentElement
    dlg.offsetX = 0
    dlg.offsetY = 0
    const move = function(e) {
      dlg.style.marginLeft = '0px'
      dlg.style.marginTop = '0px'
      let left = e.pageX - dlg.offsetX
      let top = e.pageY - dlg.offsetY
      if (left < 0) {
        left = 0
      } else if (docEl.clientWidth - left < overer) {
        left = docEl.clientWidth - overer
      }
      if (top < 0) {
        top = 0
      } else if (docEl.clientHeight - top < overer) {
        top = docEl.clientHeight - overer
      }
      dlg.style.left = left + 'px'
      dlg.style.top = top + 'px'
    }

    const up = function() {
      removeEventListener('mousemove', move)
      removeEventListener('mouseup', up)
    }

    const down = function(e) {
      dlg.offsetX = e.pageX - dlg.offsetLeft
      dlg.offsetY = e.pageY - dlg.offsetTop

      addEventListener('mousemove', move)
      addEventListener('mouseup', up)
    }

    const header = el.querySelector('.el-dialog__header')
    header.addEventListener('mousedown', down)
  }
}
