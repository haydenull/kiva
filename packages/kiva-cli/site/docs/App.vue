<template>
  <div class="w100 h100 flex flex-column">
    <header class="header flex flex-cross-center">
      <div class="logo">
        <a href="javascript: void(0);" @click="onClickLogo">Kiva</a>
      </div>
      <div class="top-navs">
        <a
          v-for="(topNav, index) in $store.state.topNavs"
          :key="index"
          href="javascript: void(0);"
          @click="onClickTopNav(topNav)"
        >
          {{topNav.text}}
        </a>
      </div>
    </header>
    <div class="container flex flex1">
      <!-- nav left -->
      <div class="nav scroll-transparent">
        <nav-group
          v-for="group in $store.getters.sideBarDocs"
          :key="group.group"
          :group-title="group.group"
          :group-nav-list="group.navs"
        />
      </div>

      <!-- content center -->
      <div class="content flex flex1 flex-main-center scroll-transparent" :class="{ 'full-page': !isShowSimlator }">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>

      <!-- simlator right -->
      <div class="simlator flex flex-column" v-if="isShowSimlator">
        <div class="simlatore__header">
          <img src="../common/assets/img/phtitle.png" alt="status bar" />
          <input class="border-box" type="text" :value="simlatorShowUrl" readonly />
        </div>
        <iframe class="w100 flex1" :src="$store.state.debugSiteUrl" frameborder="0"></iframe>
      </div>

    </div>
  </div>
</template>

<script>
import NavGroup from './components/NavGroup.vue'

export default {
  components: {
    NavGroup,
  },
  data () {
    return {
      navList: this.$store.docs,
      urlOrigin: window.location.origin,
    }
  },
  computed: {
    simlatorShowUrl() {
      return `${window.location.origin}/${this.$store.state.debugSiteUrl}`
    },
    isShowSimlator() {
      return this.$store.state.currentTopNav === 'default'
    },
  },
  methods: {
    onClickTopNav(topNav) {
      this.$store.commit('updateTopNav', topNav.text)
      this.$router.push({
        path: topNav.link,
      })
    },
    onClickLogo() {
      this.$store.commit('updateTopNav', 'default')
      this.$router.push({
        path: '/',
      })
    },
  }
}
</script>
