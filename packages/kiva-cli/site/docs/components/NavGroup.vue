<template>
  <div class="nav__group">
    <div class="nav__title">{{ groupTitle }}</div>
    <div
      class="nav__item"
      v-for="nav in groupNavList"
      :key="nav.path"
    >
      <router-link :to="nav.path">{{ nav.title }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-group',
  props: {
    groupTitle: {
      type: String,
      default: 'GroupTitle',
    },
    groupNavList: {
      type: Array,
      default: []
    },
  }
}
</script>

<style lang="less">
.nav__group {
  margin-bottom: 16px;
}
.nav__title {
  padding: 8px 0 8px 30px;
  color: #455a64;
  font-weight: bold;
  font-size: 15px;
  line-height: 28px;
}
.nav__item {
  a {
    display: block;
    padding: 8px 0 8px 30px;
    color: #455a64;
    font-size: 14px;
    line-height: 28px;
  }
}
</style>
