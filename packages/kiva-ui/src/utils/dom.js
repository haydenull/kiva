/**
 * 找到最近的具有overflow-y: scroll || auto的元素,作为滚动容器
 * @param element
 */
export const getScrollEventTarget = function(element) {
  let currentNode = element
  while (
    currentNode
    && currentNode.tagName !== 'HTML'
    && currentNode.tagName !== 'BODY'
    && currentNode.nodeType === 1
  ) {
    const { overflowY } = window.getComputedStyle(currentNode)
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return window
}

export const getScrollTop = function(element) {
  if (element === window) {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop)
  }

  return element.scrollTop
}
