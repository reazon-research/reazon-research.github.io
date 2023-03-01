import { createApp, h, ComponentPublicInstance, defineExpose, ref } from 'vue';
import { NavItem } from './components/NavList.vue';
import GlobalNav from './components/GlobalNav.vue';

export default class Navigation {
  constructor() {
    this.initGlobalNavigation();
  }

  private initGlobalNavigation() {
    const rootTarget = document.querySelector('aside#sidebar .Tree > ul');
    if (!rootTarget) {
      return;
    }
    const tocTarget = document.querySelector('aside.Page__toc .Toc__tree > ul');
    const navItems = this.searchTreeItem(rootTarget as HTMLElement);

    const searchForm = document.querySelector('#sidebar .Search__form');
    const searchInputField = document.querySelector(
      '#sidebar .Search__formText'
    );

    createApp(GlobalNav, {
      lightLogoUrl: document
        .querySelector('.Sidebar__logoImage--light')
        ?.getAttribute('src'),
      darkLogoUrl: document
        .querySelector('.Sidebar__logoImage--dark')
        ?.getAttribute('src'),
      homeUrl: document.querySelector('a.Sidebar__logo')?.getAttribute('href'),
      navItems,
      hideToc: !!document.querySelector('aside.Page__toc'),
      tocItems: tocTarget ? this.searchTreeItem(tocTarget as HTMLElement) : [],
      searchUrl: searchForm?.getAttribute('action'),
      searchPlaceHolder: searchInputField?.getAttribute('placeholder'),
    }).mount('#global_nav');
  }

  private searchTreeItem(parentElement: HTMLElement): NavItem[] {
    const results: NavItem[] = [];

    parentElement.querySelectorAll(':scope > li').forEach((target) => {
      const link = target.querySelector(':scope > a');
      if (!link) {
        return;
      }

      const result: NavItem = {
        title: link.textContent || '',
        url: link?.getAttribute('href') || '',
        children: [],
      };

      const children = target.querySelector(':scope > ul');
      if (children) {
        result.children = this.searchTreeItem(children as HTMLElement);
      }

      results.push(result);
    });

    return results;
  }
}
