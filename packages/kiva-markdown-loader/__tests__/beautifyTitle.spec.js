const beautifyTitle = require('../src/util/beautifyTitle')

describe('kiva-markdown-loader', function() {

  it('将 h 标签的内容放到子元素 span 中', function() {
    const htmlString = `
      <h2>标题h2</h2>
      <h3>标题h3</h3>
      <div>内容</div>
      <h2>标题h2</h2>
    `
    const expectRes = `
      <h2><span>标题h2</span></h2>
      <h3><span>标题h3</span></h3>
      <div>内容</div>
      <h2><span>标题h2</span></h2>
    `
    expect(beautifyTitle(htmlString)).toEqual(expectRes)
  })

})