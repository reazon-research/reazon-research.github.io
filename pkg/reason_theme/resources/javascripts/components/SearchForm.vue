<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  searchUrl: {
    type: String,
    required: true,
  },
  searchPlaceHodler: {
    type: String,
    default: '検索',
  },
});
</script>
<template>
  <div class="Search">
    <form class="Search__form" method="get" :action="searchUrl" role="search">
      <div class="Search__formTextField">
        <i class="Search__icon">
          <svg
            width="22"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z"
              fill="currentColor"
            />
          </svg>
        </i>
        <input
          class="Search__formText"
          :placeholder="searchPlaceHodler"
          name="q"
          :aria-label="searchPlaceHodler"
        />
      </div>
      <input type="hidden" name="check_keywords" value="yes" />
      <input type="hidden" name="area" value="default" />
      <button type="submit" class="Search__formSubmitButton">
        {{ searchPlaceHodler }}
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.Search {
  @apply p-2 flex items-center w-full border-0;

  &__icon {
    @apply text-black dark:text-white mr-2;

    width: 20px;
    height: 20px;
  }

  &__form {
    @apply flex-1 flex items-center justify-center;

    &TextField {
      @apply border-b-3 border-gray-50 dark:border-gray-800  flex items-center p-2;
    }

    &Text {
      @apply bg-transparent w-full outline-none;

      &::placeholder {
        @apply text-base text-gray-400 dark:text-gray-300;
      }
    }
    &SubmitButton {
      @apply text-gray-500 dark:text-zinc-300 bg-gray-50 dark:bg-gray-800 px-2 py-1 text-sm ml-1;

      height: 43px;
    }
  }
}
</style>
