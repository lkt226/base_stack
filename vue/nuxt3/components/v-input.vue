<template>
  <label class="_v_input" :class="className">
    <span>{{ options?.label || placeholder }}</span>
    
    <div class="_input_box">
      <input 
        :type="type" 
        :placeholder="placeholder" 
        :required="required" 
        :list="list" 
        :maxlength="options?.mask.length || options?.max"
        :name="name"
  
        @input="masked"
      >
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: true
    },
    list: {
      type: String
    },
    options: {
      type: Object
    }
  },
  setup (props) {
    const className = []
    if (props.name) { className.push(`_input_${props.name}`) }
    if (props.list) { className.push('_is_list') }

    return {
      className: className.join(' ')
    }
  },
  methods: {
    masked (e: Event) {
      // Verifica o valor do input
      let input = (e.target as HTMLInputElement).value

      // Verifica se "mask" existe e se o input tem alguma coisa escrita
      if (this.options?.mask && input.length>0) {
        let mask:string = this.options.mask
        let masked = mask

        // Remove se você esta digitando um numero
        input.replace(/([^0-9])/g, '').split('').forEach((number) => {
          // Caso sim, ele coloca no formato que você escolheu em "options.mask"
          masked = masked.replace('#', number)
        });

        (e.target as HTMLInputElement).value = masked.split('#')[0]
      }
    }
  }
})
</script>

<style lang="scss">
  ._v_input {
    ._input_box {
      @apply bg-white w-full overflow-hidden
                border border-$primary rounded-5px;
      input {
        @apply w-full px-15px py-6px text-14px text-$black
                bg-transparent outline-none;
        line-height: 26px;

        &::placeholder {
          @apply opacity-80;
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover, 
        &:-webkit-autofill:focus, 
        &:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px white inset !important;
        }

        &::-webkit-calendar-picker-indicator {
          @apply opacity-0;
        }
      }
    }

    &._is_list {
      @apply relative;

      select{
        @apply appearance-none;
      }

      &::after{
        content: '';
        @apply text-14px w-14px h-full bg-no-repeat bg-center bg-contain
              absolute top-1/2 right-25px mb-2px
              transform -translate-y-1/2 scale-y-75
              pointer-events-none opacity-0;
        background-image: url('@/assets/svgs/arrow_down.svg');
        transition: all 0.2s ease-in;
      }

      &:hover::after {
        @apply opacity-100;
      }
    }
  }
</style>