<template>
  <div class="kiva-tabs">
    <div class="kiva-tabs__navs">
      <div
        v-for="(nav, index) in navs"
        :key="index"
        class="kiva-tabs-nav"
        :class="{ 'kiva-tabs-nav--active': index === activeIndex }"
        ref="nav"
        @click="onClickNav(index)"
      >{{ nav.title }}</div>
      <div class="kiva-tabs__line" :style="lineStyle"></div>
    </div>

    <div class="kiva-tabs__content">
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'kiva-tabs',
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    }
  },
  data () {
    return {
      navs: [],
      panes: [],
      lineStyle: {},
    }
  },
  watch: {
    activeIndex: {
      // immediate: true,
      handler: 'onActiveIndexChange',
    }
  },

  mounted () {
    this.panes = this.$children.filter(item => item.$options.name === 'kiva-tabs-pane')
    this.navs = this.panes.map(item => {
      return {
        title: item.$attrs.title,
      }
    })

    this.setupLine()
    this.setupPane()
  },

  methods: {
    onActiveIndexChange() {
      this.setupLine()
      this.setupPane()
    },
    setupLine() {
      this.$nextTick(() => {
        const navs = this.$refs.nav
        const activeNav = navs[this.activeIndex]
        if (!navs || !activeNav) return

        const left = activeNav.offsetLeft + activeNav.offsetWidth / 2
        this.lineStyle = {
          transform: `translateX(${left}px) translateX(-50%)`,
        }
      })
    },
    setupPane() {
      this.$nextTick(() => {
        this.panes.forEach((pane, index) => {
          pane.isActive = index === this.activeIndex
        })
      })
    },
    onClickNav(index) {
      this.$emit('update:active-index', index)
    },
  },
}
</script>
