const loaderUtils = require('loader-utils')
const MarkdownIt = require('markdown-it')
const grayMatter = require('gray-matter')

const htmlTiVue = require('./htmlToVue')
const htmlToVue = require('./htmlToVue')

const markdownParser = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
})

module.exports = function(source) {
  let options = loaderUtils.getOptions(this) || {}

  const { content, data: frontMatter } = grayMatter(source)
  source = content

  // TODO: 为何重复调用 3 次
  // console.log('=== kiva markdown loader ===', frontMatter)

  return htmlToVue(markdownParser.render(source), frontMatter)

}
