/**
 * 给 h3 与 h3 及以上的标题间的内容加 kiva-markdown-card 包裹
 * @param {string} htmlString
 */
module.exports = function(htmlString) {
  htmlString = htmlString.replace(/<h1|<h2|<h3/g, res => ':::' + res)

  return htmlString.split(':::')
    .map(fragment => {
      if (/^<h3/.test(fragment)) {
        return `<section class="kiva-markdown-card">${fragment}</section>`
      }
      return fragment
    })
    .join('')
}
