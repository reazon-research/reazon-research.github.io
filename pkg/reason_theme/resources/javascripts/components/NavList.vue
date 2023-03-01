<script setup lang="ts">
import { PropType } from 'vue';
import NavListItem from './NavListItem.vue';
import NavToolbar from './NavToolbar.vue';

export interface NavItem {
  title: string;
  children: NavItem[];
  url: string;
}

type AnimatioDirection = 'right' | 'left';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  navItems: {
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
});
const emit = defineEmits(['close', 'back']);

const transitionName = `slide-${props.animationDirection || 'left'}`;
</script>

<template>
  <transition :name="transitionName">
    <div v-if="isShow" class="Nav">
      <NavToolbar
        :title="title"
        :is-root="isRoot"
        @back="emit('back')"
        @close="emit('close')"
      ></NavToolbar>
      <ul class="Nav__list">
        <NavListItem
          v-for="item in navItems"
          :key="item.title"
          :title="item.title"
          :url="item.url"
          :children="item.children"
          @close="emit('close')"
        ></NavListItem>
      </ul>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.Nav {
  @apply flex flex-col justify-start items-center w-full h-full z-10 top-0 left-0 bg-white dark:bg-black;

  &__list {
    @apply flex flex-col justify-start items-center w-full mt-10 pl-16 pr-6;
  }
}
</style>
