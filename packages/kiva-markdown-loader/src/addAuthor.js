const pinyin = require('pinyin')

/**
 *  为 h2 标签增加 id, 作为锚点使用
 * @param {string} htmlString
 */
module.exports = function(htmlString) {

  // 使用非贪婪匹配
  return htmlString.replace(/<h2(.*?)>(.*?)<\/h2>/g, (res, $1, $2) => {
    const id = pinyin($2, {
      style: pinyin.STYLE_NORMAL
    }).join('-')
    return `<h2 id="${id}"${$1}>${$2}</h2>`
  })


}
