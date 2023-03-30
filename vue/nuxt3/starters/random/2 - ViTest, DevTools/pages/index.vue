<template>
  <main id="home">
    <h1>Home</h1>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const meta = {
  title: '',
  description: ''
}

export default defineComponent({
  setup() {
    useHead({
      title: meta.title,
      meta: [
        { name: 'title', content: meta.title },
        { name: 'description', content: meta.description },
        // Google
        { property: 'og:title', content: meta.title },
        { property: 'og:description', content: meta.description }
      ]
    })
  },

  mounted () {
    this.$toast.show({
      type: 'danger',
      title: 'This is the title property',
      timeout: 6
    })
  },
})
</script>


<style lang="scss">
  #home {
    h1 {
      @apply text-blue-400;
    }
  }
</style>