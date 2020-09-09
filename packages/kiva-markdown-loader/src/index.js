const loaderUtils = require('loader-utils')
const MarkdownIt = require('markdown-it')
const grayMatter = require('gray-matter')

const htmlTiVue = require('./htmlToVue')
const htmlToVue = require('./htmlToVue')

const markdownParser = new MarkdownIt({
  html: true,
})

module.exports = function(source) {
  let options = loaderUtils.getOptions(this) || {}

  const { content, data: frontMatter } = grayMatter(source)
  source = content

  console.log('=== kiva markdown loader ===', frontMatter)

  return htmlToVue(markdownParser.render(source))

}