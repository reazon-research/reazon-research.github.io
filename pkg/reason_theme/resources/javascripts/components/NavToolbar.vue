<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  title: {
    type: String,
    default: '',
  },
  isRoot: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['back', 'close']);
</script>
<template>
  <div class="NavToolbar">
    <template v-if="isRoot">
      <div></div>
    </template>
    <template v-else>
      <button class="NavToolbar_button Button-back" @click="emit('back')">
        <svg
          width="10"
          height="17"
          viewBox="0 0 10 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.6359 8.5L10 15.1114L8.18205 17L5.82128e-07 8.5L8.18205 -7.9465e-08L10 1.88859L3.6359 8.5Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </template>
    <p class="NavToolbar__title">{{ title }}</p>
    <button class="NavToobar_button Button-close" @click="emit('close')">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 6.2225L14.2225 0L16 1.7775L9.7775 8L16 14.2225L14.2225 16L8 9.7775L1.7775 16L0 14.2225L6.2225 8L0 1.7775L1.7775 0L8 6.2225Z"
          fill="currentColor"
        />
      </svg>
    </button>
  </div>
</template>

<style lang="scss">
.NavToolbar {
  @apply flex flex-row justify-between items-center w-full pt-6 px-5;
  &__title {
    @apply text-lg font-bold text-black dark:text-white;
  }
  &__button {
    @apply w-10 h-10 flex justify-center items-center;

    backdrop-filter: blur(2px);
  }
}
</style>
