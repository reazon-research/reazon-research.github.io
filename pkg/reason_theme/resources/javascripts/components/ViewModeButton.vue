<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import SwitchTheme from '../SwithcTheme';

const lightButton = ref<HTMLButtonElement>();
const darkButton = ref<HTMLButtonElement>();
const autoButton = ref<HTMLButtonElement>();
onMounted(() => {
  new SwitchTheme([
    lightButton.value as Element,
    darkButton.value as Element,
    autoButton.value as Element,
  ]);
});
</script>
<template>
  <div class="ViewModeButton">
    <div class="ViewModeButton__label">View Mode</div>
    <button
      ref="darkButton"
      class="ViewModeButton__button ViewModeButton__button--dark"
    >
      Night Mode
    </button>
    <button
      ref="lightButton"
      class="ViewModeButton__button ViewModeButton__button--light"
    >
      Day Mode
    </button>
    <button
      ref="autoButton"
      class="ViewModeButton__button ViewModeButton__button--system"
    >
      System Setting
    </button>
  </div>
</template>

<style lang="scss">
.ViewModeButton {
  @apply text-center flex flex-row items-center justify-center;

  &__label {
    @apply text-xs font-bold text-gray-400 mr-2 font-roboto tracking-widest;
  }

  &__button {
    @apply text-xs text-black text-left rounded-full relative font-roboto;

    width: 130px;
    height: 40px;
    padding-left: 50px;

    &::before {
      @apply block absolute top-0 left-0;

      content: '';
      background: var(--view-mode-icon-url) no-repeat center;
      background-size: 100% 100%;
      width: 23px;
      height: 23px;
      top: 8px;
      left: 18px;
    }

    &--light {
      @apply bg-gray-50 dark:hidden;
    }

    &--dark {
      @apply text-white bg-gray-800 hidden dark:block;
    }

    &--system {
      @apply hidden;

      &::before {
        background: url('/images/system.svg') no-repeat center;
        background-size: 100% 100%;
        top: 8px;
        left: 18px;
      }
    }
  }
}
</style>
