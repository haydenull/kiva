<template>
  <div>
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

<style>

</style>
