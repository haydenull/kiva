const addAuthor = require('../src/addAuthor')
// import addAuthor from '../src/addAuthor'

describe('kiva-markdown-loader', function() {

  it('为h2标签添加id作为锚点使用12', function() {
    console.log('=== xxxx ====1')
    const htmlString = '<h2>标题1</h2><div>content</div><h2>标题2</h2>'
    const res = '<h2 id="biao-ti-1">标题1</h2><div>content</div><h2 id="biao-ti-2">标题2</h2>'
    expect(addAuthor(htmlString)).toEqual(res)

  })

})