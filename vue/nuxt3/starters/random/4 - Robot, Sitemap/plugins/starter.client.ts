import { createApp } from 'vue';
import App from '@/app.vue';

import { useToast, useModal } from 'tailvue'

const app = createApp(App);


export default defineNuxtPlugin((app) => {

  return {
    provide: {
      toast: useToast(),
      modal: useModal()
    }
  }
})