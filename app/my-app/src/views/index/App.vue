<template>
  <div id="app">
    <Logo />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <!-- <kiva-image
      src="https://files.catbox.moe/1c387i.jpg"
      style="width: 100px; height: 100px;"
    /> -->
    <kiva-loading color="#e88b00">加载中...</kiva-loading>
    <kiva-dialog :show="true" message="xxxxx"></kiva-dialog>
    <!-- <kiva-mask show></kiva-mask> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from '../../components/Logo.vue'
import HelloWorld from '../../components/HelloWorld.vue'



@Component({
  components: {
    Logo,
    HelloWorld
  },
})
export default class App extends Vue {
  mounted() {
    // this.$dialog({
    //   title: '新浪新闻',
    //   message: '新浪新闻客户端，专享更多精彩视频',
    //   cancelText: 'cancel',
    //   confirmText: 'confirm',
    //   confirm() {
    //     console.log('=== click confirm ===')
    //   },
    //   cancel() {
    //     console.log('=== click cancel ===')
    //   },
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
</style>
