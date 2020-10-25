/**
 * 获取正文滚动容器
 */
let articleContainerEle = null
export function getDocArticleContainer() {
  if (articleContainerEle) return articleContainerEle
  return document.querySelector('.container .content')
}