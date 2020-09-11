<template>
  <div class="w100 h100 flex flex-column">
    <header class="header flex flex-cross-center">
      <span class="scroll-transparent">
        <router-link to="/">Kiva</router-link>
      </span>
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
