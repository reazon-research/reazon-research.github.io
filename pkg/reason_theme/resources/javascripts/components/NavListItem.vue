<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import NavList, { NavItem } from './NavList.vue';

const props = defineProps<{
  title: string;
  url: string;
  children: NavItem[];
}>();

const emit = defineEmits(['close']);

const isShow = ref(false);

const isChild = props.children.length > 0;
const href = isChild ? '#' : props.url;

const onClickLink = (event: Event) => {
  if (isChild) {
    isShow.value = true;
    event.stopPropagation();
  } else {
    emit('close');
  }
};
</script>

<template>
  <li class="NavListItem">
    <a :href="href" @click="onClickLink">{{ title }}</a>
    <label
      v-if="children.length > 0"
      class="Nav__ToggleButton"
      @click="isShow = true"
    >
      <i class="NavListItem__button">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.17192 6.99999L0.221924 2.04999L1.63592 0.635986L7.99992 6.99999L1.63592 13.364L0.221924 11.95L5.17192 6.99999Z"
            fill="currentColor"
          />
        </svg>
      </i>
    </label>
    <NavList
      :title="title"
      :nav-items="children"
      :is-show="isShow"
      @back="isShow = false"
      @close="emit('close')"
    />
  </li>
</template>

<style lang="scss" scoped>
.NavListItem {
  @apply w-full h-8 mt-8 flex justify-between items-center;

  & > a {
    @apply text-xl text-black dark:text-white leading-normal block;

    flex: 1;
  }

  &__button {
    @apply w-6 h-6 inline-flex justify-center items-center text-black dark:text-white cursor-pointer;
  }
}
</style>
