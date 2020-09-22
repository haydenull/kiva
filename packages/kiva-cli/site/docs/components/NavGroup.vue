<template>
  <div class="nav__group">
    <div class="nav__title">{{ groupTitle }}</div>
    <div
      class="nav__item"
      v-for="nav in groupNavList"
      :key="nav.path"
    >
      <router-link :to="nav.path" active-class="active" exact>
        <span>{{ nav.title }}</span>
      </router-link>
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
