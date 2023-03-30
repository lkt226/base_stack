<template>
  <div class="_form">
    <form :id="id" @submit="submit">
      <slot />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    submit (e: Event) {
      e.preventDefault()
      const form = e.target as HTMLFormElement

      const data = {
        conversion_identifier: '#empresa-#site-#local',
        email: form.email.value
      }

      this.$email.send(data).then((res: Response) => {
        if (res.ok) {
          setTimeout(() => {
            this.$router.push('obrigado')
          }, 10)
        }
      })
    }
  },
})
</script>

<style lang="scss">
  ._form {
    @apply relative;
  }
</style>
