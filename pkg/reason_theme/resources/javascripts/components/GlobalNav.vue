<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import NavList, { NavItem } from './NavList.vue';
import TocList from './TocList.vue';

defineProps({
  lightLogoUrl: {
    type: String,
    required: true,
  },
  darkLogoUrl: {
    type: String,
    required: true,
  },
  homeUrl: {
    type: String,
    required: true,
  },
  hideToc: {
    type: Boolean,
    default: false,
  },
  navItems: {
    type: Array<NavItem>,
    default: [],
  },
  tocItems: {
    type: Array<NavItem>,
    default: [],
  },
  searchUrl: {
    type: String,
    default: '',
  },
  searchPlaceHolder: {
    type: String,
    default: '',
  },
});

const showNav = ref(false);
const showToc = ref(false);
</script>

<template>
  <div>
    <nav class="Nav">
      <button
        id="button_sidebar_nav"
        class="Nav__button"
        type="button"
        @click="showNav = true"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H17V2H0V0ZM0 7H17V9H0V7ZM0 14H17V16H0V14Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <a class="Nav__logo" :href="homeUrl">
        <h1>
          <img class="Sidebar__logoImage--light" :src="lightLogoUrl" />
          <img class="Sidebar__logoImage--dark" :src="darkLogoUrl" />
        </h1>
      </a>
      <template v-if="hideToc">
        <button
          id="button_toc_nav"
          class="Nav__button"
          data-drawer-target="default-tocbar"
          data-drawer-toggle="default-tocbar"
          aria-controls="default-tocbar"
          type="button"
          @click="showToc = true"
        >
          <span class="sr-only">Open tocbar</span>
          <svg
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 15V17H1V15H19ZM4.596 0.903999L6.01 2.318L2.828 5.5L6.01 8.682L4.596 10.096L0 5.5L4.596 0.903999ZM19 8V10H10V8H19ZM19 0.999999V3H10V0.999999H19Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </template>
      <template v-else>
        <div></div>
      </template>
    </nav>
    <NavList
      :nav-items="navItems"
      :is-show="showNav"
      :is-root="true"
      animation-direction="right"
      @close="showNav = false"
    ></NavList>
    <TocList
      :toc-items="tocItems"
      :search-url="searchUrl"
      :search-place-holder="searchPlaceHolder"
      title="Inbox"
      :is-root="true"
      :is-show="showToc"
      @close="showToc = false"
    ></TocList>
  </div>
</template>

<style lang="scss" scope>
.Nav {
  @apply fixed w-full flex justify-around items-center flex-row py-6 px-5 lg:hidden z-50;

  & &__button {
    @apply inline-flex items-center p-3 w-10 h-10 text-gray-500 focus:outline-none text-black dark:text-white bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30;

    backdrop-filter: blur(2px);
  }

  &__logo {
    img {
      width: 163px;
    }
  }
}
</style>
