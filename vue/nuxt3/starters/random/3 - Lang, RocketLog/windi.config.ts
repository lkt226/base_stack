import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      "node_modules/tailvue/dist/tailvue.es.js",
    ],
  },
})