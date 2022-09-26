export const imgerror = {
  // 插入dom 使用inserted
  inserted(el, binding, vnode) {
    el.onerror = function() {
      el.src = binding.value
    }

    console.log(1, el)
    // dom节点信息
    console.log(2, binding)
    // 相关信息
    console.log(3, vnode)
  }
}
