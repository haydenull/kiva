<template>
  <div>
    <h2>component: <%= pascalCaseName %></h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'kiva-<%= kebabCaseName %>',  // 必须
}
</script>
