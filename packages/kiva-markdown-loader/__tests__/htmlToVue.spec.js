const htmlToVue = require('../src/util/htmlToVue')

describe('kiva-markdown-loader', function() {

  it('html转Vue组件', function() {
    const htmlString = '<h2>标题1</h2><div>content</div><h2>标题2</h2>'
    const expectReg = /<template>[\s\S]+<\/template>[\s\S]*<script>[\s\S]+<h2>标题1<\/h2><div>content<\/div><h2>标题2<\/h2>[\s\S]+<\/script>/
    expect(htmlToVue(htmlString)).toMatch(expectReg)
  })

})