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

const emit = defineEmits(['back']);
</script>
<template>
  <div class="NavToolbar">
    <button
      v-if="!isRoot"
      class="NavToolbar_button Button-back"
      @click="emit('back')"
    >
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
    <p class="NavToolbar__title">{{ title }}</p>
  </div>
</template>

<style lang="scss">
.NavToolbar {
  @apply flex flex-row justify-between items-center w-full pt-6 px-5;

  &__title {
    @apply text-lg font-bold text-center text-black dark:text-white;

    flex: 1;
    min-height: 28px;
  }

  &__button {
    @apply w-10 h-10 flex justify-center items-center;

    backdrop-filter: blur(2px);
  }
}
</style>
