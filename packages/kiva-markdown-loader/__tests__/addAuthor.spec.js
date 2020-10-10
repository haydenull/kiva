const addAuthor = require('../src/util/addAuthor')

describe('kiva-markdown-loader', function() {

  it('为h2标签添加id作为锚点使用', function() {
    const htmlString = '<h2>标题1</h2><div>content</div><h2>标题2</h2>'
    const expectRes = '<h2 id="biao-ti-1">标题1</h2><div>content</div><h2 id="biao-ti-2">标题2</h2>'
    expect(addAuthor(htmlString)).toEqual(expectRes)
  })

})