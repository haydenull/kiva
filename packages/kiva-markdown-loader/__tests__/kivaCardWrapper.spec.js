const kivaCardWrapper = require('../src/kivaCardWrapper')

describe('kiva-markdown-loader', function() {

  it('给 h3 与 h3 及以上的标题间的内容加 kiva-markdown-card 包裹', function() {
    const htmlString = `
      <h2>标题h2</h2>
      <h3>标题h3</h3>
      <div>内容</div>
      <h2>标题h2</h2>
    `
    const expectRes = `
      <h2>标题h2</h2>
      <section class="kiva-markdown-card"><h3>标题h3</h3>
      <div>内容</div>
      </section><h2>标题h2</h2>
    `
    expect(kivaCardWrapper(htmlString)).toEqual(expectRes)
  })

})