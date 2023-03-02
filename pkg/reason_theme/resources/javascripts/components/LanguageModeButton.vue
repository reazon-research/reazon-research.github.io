<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  urlJa: {
    type: String,
    required: true,
  },
  urlEn: {
    type: String,
    required: true,
  },
  currentLanguage: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="LanguageModeButton">
    <div class="LanguageModeButton__Label">Language</div>
    <div class="LanguageModeButton__Buttons">
      <a
        class="LanguageModeButton__Button"
        :href="urlJa"
        :disabled="currentLanguage === 'ja'"
        >JP</a
      >
      /
      <a
        class="LanguageModeButton__Button"
        :href="urlEn"
        :disabled="currentLanguage === 'en'"
        >EN</a
      >
    </div>
  </div>
</template>

<style lang="scss">
.LanguageModeButton {
  @apply text-center flex flex-row items-center justify-center ml-6;

  &__Label {
    @apply text-sm font-bold text-gray-400 mr-3 font-roboto tracking-widest;
  }

  &__Buttons {
    @apply flex flex-row items-center justify-center;
  }

  &__Button {
    @apply block text-black underline;

    font-size: 22px;

    &[disabled='true'] {
      @apply font-bold no-underline pointer-events-none cursor-default;
    }

    &:nth-child(1) {
      @apply mr-1;
    }

    &:nth-child(2) {
      @apply ml-1;
    }
  }
}
</style>
