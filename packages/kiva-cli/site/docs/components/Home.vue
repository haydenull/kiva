<template>
  <div>
    <h1>Home Kiva</h1>

    <h2 id="home1">1111111111111<code>cccc</code></h2>
    <div style="height: 300px;"></div>
    <h2 id="home2">2222222222222</h2>
    <div style="height: 300px;"></div>
    <h2 id="home3">3333333333333</h2>
    <div style="height: 300px;"></div>
    <h2 id="home4" >4444444444444</h2>
    <div style="height: 300px;"></div>
    <h2 id="home5">5555555555555</h2>
    <div style="height: 300px;"></div>

    <div class="kiva-anchor">
      <a
        class="kiva-anchor__item"
        v-for="anchor in anchors"
        :key="anchor.hash"
        href="javascript: void(0);"
        @click="scrollToAnchor(anchor.hash)"
      >
        <span class="kiva-anchor__item__text">{{ anchor.title }}</span>
        <span class="kiva-anchor__item__circle"></span>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  kivaDocConfig: {
    path: '/',
    title: 'Home',
    group: '开发指南',
  },
  data () {
    return {
      // 锚点
      anchors: [],
    }
  },
  mounted () {
    const anchors = Array.prototype.slice.call(this.$el.querySelectorAll('h2'))
    this.anchors = anchors.map(el => {
      return {
        hash: el.id,
        title: el.innerText
      }
    })
    .filter(item => item.hash && item.title)
  },
  methods: {
    scrollToAnchor(hash) {
      const authorTargetElement = document.getElementById(hash)
      if (authorTargetElement) {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView
        authorTargetElement.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
      }

    }
  }
}
</script>
