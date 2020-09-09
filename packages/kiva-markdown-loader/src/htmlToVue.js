module.exports = function(htmlString) {
  return `
    <template>
      <section v-html="content" v-once />
    </template>

    <script>
      export default {
        data() {
          return {
            content: '',
          }
        },

        created() {
          this.content = "<div>loader<div>"
        },

        methods: {

        }
      }
    </script>
  `
}