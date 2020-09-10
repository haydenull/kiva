<template>
  <div class="w100 h100 flex flex-column">
    <header class="header flex flex-cross-center">
      <span @click="$router.push('/')" class="scroll-transparent">Kiva</span>
    </header>
    <div class="container flex flex1">
      <!-- nav left -->
      <div class="nav scroll-transparent">
        <nav-group
          v-for="group in $store.state.docs"
          :key="group.group"
          :group-title="group.group"
          :group-nav-list="group.navs"
        />
      </div>

      <!-- content center -->
      <div class="content flex1 scroll-transparent">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>

      <!-- simlator right -->
      <div class="simlator">
        <iframe class="w100 h100" :src="$store.state.debugSiteUrl" frameborder="0"></iframe>
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
      navList: this.$store.docs
    }
  }
}
</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
}
.header {
  color: #fff;
  height: 60px;
  padding: 0 30px;
  background-color: #001938;
  span {
    font-size: 22px;
  }
}

.container {
  // background-color: #fafafa;
  overflow: hidden; // hack 其子元素 nav content overflow-y: scroll 无效的问题
}
.nav {
  width: 220px;
  background-color: #fff;
  box-shadow: #ebedf0 0 4px 12px;
  overflow-y: scroll;
}
.content {
  padding: 30px;
  overflow-y: scroll;

  .kiva-markdown-card {
    margin-bottom: 24px;
    padding: 24px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 8px 12px #ebedf0;
  }
}
.simlator {
  width: 375px;
  max-height: 667px;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: #ebedf0 0 4px 12px;
  margin: 30px 30px 10px 10px;
}
</style>
