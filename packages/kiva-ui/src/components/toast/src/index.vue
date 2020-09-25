<template>
  <div class="kiva-toast" :class="[ positionClass ]" v-show="visible">
    <span class="kiva-toast__txt">{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'kiva-toast',  // 必须
  props: {
    message: {
      type: String,
      default: 'toast',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    position: {
      type: String,
      default: 'bottom',
    }
  },
  data () {
    return {
      visible: false,
    }
  },
  computed: {
    positionClass() {
      return `kiva-toast--${this.position}`
    }
  }
}
</script>
