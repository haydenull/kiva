const escape = require('js-string-escape')

module.exports = function(htmlString, config) {
  htmlString = escape(htmlString)
  return `
    <template>
      <div>
        <section v-html="content" v-once />


        <div class="kiva-anchor" v-if="anchors.length > 0">
          <a
            class="kiva-anchor__item"
            v-for="anchor in anchors"
            :key="anchor.hash"
            :href="'/#' + anchor.hash"
          >
            <span class="kiva-anchor__item__text">{{ anchor.title }}</span>
            <span class="kiva-anchor__item__circle"></span>
          </a>
        </div>

      </div>
    </template>

    <script>
      export default {
        kivaDocConfig: ${JSON.stringify(config)},
        data() {
          return {
            content: '${htmlString}',
            anchors: [],
          }
        },

        mounted () {
          const anchors = Array.prototype.slice.call(this.$el.querySelectorAll('h2'))
          this.anchors = anchors.map(el => {
            return {
              hash: el.id,
              title: el.innerText
            }
          })
          .filter(item => item.hash && item.title)
        },

      }
    </script>
  `
}
