<script setup lang="ts">
import { PropType } from 'vue';
import { NavItem } from './NavList.vue';
import NavListItem from './NavListItem.vue';
import NavToolbar from './NavToolbar.vue';
import SearchForm from './SearchForm.vue';
import ViewModeButton from './ViewModeButton.vue';
import LanguageModeButton from './LanguageModeButton.vue';

type AnimatioDirection = 'right' | 'left';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  tocItems: {
    type: Array<NavItem>,
    required: true,
  },
  isShow: {
    type: Boolean,
    default: false,
  },
  isRoot: {
    type: Boolean,
    default: false,
  },
  animationDirection: {
    type: String as PropType<AnimatioDirection>,
    default: 'left',
  },
  searchUrl: {
    type: String,
    default: '',
  },
  searchPlaceHolder: {
    type: String,
    default: '',
  },
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
const emit = defineEmits(['back']);

const transitionName = `slide-${props.animationDirection || 'left'}`;
</script>

<template>
  <transition :name="transitionName">
    <div v-if="isShow" class="Nav">
      <NavToolbar
        :title="title"
        :is-root="isRoot"
        @back="emit('back')"
      ></NavToolbar>
      <div class="Nav__searchForm">
        <SearchForm
          v-if="searchUrl !== ''"
          :search-url="searchUrl"
          :search-place-hodler="searchPlaceHolder"
        ></SearchForm>
      </div>
      <ul class="Nav__list">
        <NavListItem
          v-for="item in tocItems"
          :key="item.title"
          :title="item.title"
          :url="item.url"
          :children="item.children"
        ></NavListItem>
      </ul>
      <div class="Nav__footer">
        <hr />
        <ViewModeButton class="Nav__footerViewModeButton"></ViewModeButton>
        <LanguageModeButton
          :url-ja="urlJa"
          :url-en="urlEn"
          :current-language="currentLanguage"
          class="Nav__footerLanguageModeButton"
        ></LanguageModeButton>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.Nav {
  @apply flex flex-col justify-start items-center w-full h-full top-0 left-0 bg-white dark:bg-black;

  z-index: 100;

  &__list {
    @apply flex flex-col justify-start items-center w-full mt-10 pl-16 pr-6;

    a:hover {
      @apply underline;
    }
  }

  &__searchForm {
    @apply mt-4 px-16 w-full;
  }

  &__footer {
    hr {
      @apply border-t border-gray-50 dark:border-gray-800;
    }
    @apply mt-12 w-full px-16;

    &ViewModeButton {
      @apply pt-5;
    }

    &LanguageModeButton {
      @apply mt-4;
    }
  }
}
</style>
