const pinyin = require('pinyin')

/**
 *  将 h 标签的内容放到子元素 span 中，为美化标题预留空间
 * @param {string} htmlString
 */
module.exports = function(htmlString) {

  // 使用非贪婪匹配
  return htmlString.replace(/<h([1-6])(.*?)>(.*?)<\/h([1-6])>/g, (res, $1, $2, $3, $4) => {
    return `<h${$1}${$2}><span>${$3}</span></h${$4}>`
  })


}
