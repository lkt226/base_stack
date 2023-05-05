<template>
  <picture class="_v_img">
    <source v-if="img.mobile?.webp" :srcset="img.mobile.webp" media="(max-width: 768px)">
    <source v-if="img.mobile?.src" :srcset="img.mobile.src" media="(max-width: 768px)">
    <source v-if="img.webp" :srcset="img.webp" type="image/webp">
    
    <img 
      :loading="lazy ? 'lazy':'eager'" 
      :width="width" 
      :height="height" 
      :src="img.src" 
      :alt="alt" 
    />
  </picture>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Verifica se uma imagem existe
const verify = (src: string, callback: (src: string) => void) => {
  const img = new Image()
  img.src = src

  img.onload = () => {
    callback(src)
  }
}

// Converte a URL de uma imagem para o formato WebP
const toWebp = (url: string) => {
  const base = url.replace(/\.[^.]+$/, '.webp')
  return `${base}.webp`
}

// Define o formato do objeto de imagem
interface Image {
  src: string;
  mobile: {
    src: string;
    webp: string;
  };
  webp: string;
}

export default defineComponent({
  props: {
    src: {
      type: String,
      default: 'https://picsum.photos/'
    },
    alt: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    lazy: {
      type: Boolean
    },
  },
  data () {
    const config = useRuntimeConfig().public
    const prefix = config.origin + config.url

    return {
      img: {
        src: prefix + this.src
      } as Image
    }
  },
  mounted () {
    /* Prefixo com location.origin pra o NuxtImg não criar um monte 
       pasta e entender como se fosse um link web, eu prefiro dessa forma. */
    const config = useRuntimeConfig().public
    const prefix = config.origin + config.url

    // Caso seja a imagem padrão que ta marcado no "Props" ele remove o px do width pra URL fazer sentido :D
    if (this.src.includes('https://picsum.photos/')) {
      this.img.src = this.src.replace(prefix, '') + this.width.replace('px', '')

    } else {
      // Define o padrão de URLs das imagens para a resolução desktop e móvel
      const img = {
        src: prefix + this.src,
        mobile: prefix + this.src.replace('images', 'images/mobile')
      }
  
      this.img.src = img.src
      // Verifica se as imagens carregaram com sucesso e atualiza o objeto de imagem correspondente
      verify(img.mobile, (src: string) => { this.img.mobile.src = src })
      verify(toWebp(img.mobile), (src: string) => { this.img.mobile.webp = src })
      verify(toWebp(img.src), (src: string) => { this.img.webp = src })
    }
  }
})
</script>

<style lang="scss">
  ._v_img {
    @apply block w-max h-max;
  }
</style>