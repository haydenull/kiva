module.exports = function(htmlString, config) {
  htmlString = htmlString.trim()
  return `
    <template>
      <section v-html="content" v-once />
    </template>

    <script>
      export default {
        kivaDocConfig: ${JSON.stringify(config)},
        data() {
          return {
            content: '${htmlString}',
          }
        },

        methods: {
          addRoutes() {
            this.$router.addRoutes({

            })
          },
        }
      }
    </script>
  `
}
