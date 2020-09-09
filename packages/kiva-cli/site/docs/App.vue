<template>
  <div class="w100 h100 flex flex-column">
    <header class="header flex flex-cross-center">
      <span>Kiva</span>
    </header>
    <div class="container flex flex1">
      <!-- nav left -->
      <div class="nav">
        <nav-group group-title="test" :group-nav-list="navList" />
      </div>

      <!-- content -->
      <div class="content flex1">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>

      <!-- simlator -->
      <div class="simlator">
        <iframe class="w100 h100" src="debug.html#/" frameborder="0"></iframe>
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
      navList: [
        { path: '/button', title: '按钮' },
        { path: '/list', title: ' 列表' },
      ]
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
  background-color: #fafafa;
}
.nav {
  width: 220px;
  background-color: #fff;
  box-shadow: #ebedf0 0 4px 12px;
}
.content {
  padding: 30px;
}
.simlator {
  width: 375px;
  max-height: 667px;
  // background-color: #fafafa;
  border-radius: 12px;
  box-shadow: #ebedf0 0 4px 12px;
  margin-top: 30px;
}
</style>
