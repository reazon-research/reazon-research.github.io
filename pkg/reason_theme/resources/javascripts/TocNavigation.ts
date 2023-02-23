export default class TocNavigation {
  activeClassName: string = 'current';
  fixedClassName: string = 'Toc__inner--fixed';

  constructor() {
    const tocFollowingTargets = document.querySelectorAll(
      'article.Page__body *[id]'
    );

    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0,
    };
    const tocFollowingObserver = new IntersectionObserver(
      this.doWhenIntersectOfTocFollowing.bind(this),
      options
    );
    tocFollowingTargets.forEach((target) => {
      tocFollowingObserver.observe(target);
    });

    const fixedTarget = document.querySelector('.Page__header');
    if (fixedTarget) {
      const fixedObserver = new IntersectionObserver(
        this.doWhenIntercectOfTocFixed.bind(this)
      );
      fixedObserver.observe(fixedTarget);
    }
  }

  private doWhenIntersectOfTocFollowing(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.tocActivate(entry.target);
      }
    });
  }

  private doWhenIntercectOfTocFixed(entries: IntersectionObserverEntry[]) {
    const target = document.querySelector('.Page__toc .Toc__inner');
    if (!target) {
      return;
    }

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        target.classList.remove(this.fixedClassName);
      } else {
        target.classList.add(this.fixedClassName);
      }
    });
  }

  private tocActivate(element: Element) {
    const currentActiveIndex = document.querySelector(
      `.Toc__tree .${this.activeClassName}`
    );

    if (currentActiveIndex !== null) {
      currentActiveIndex.classList.remove(this.activeClassName);
    }

    const newActiveIndex = document.querySelector(
      `.Toc__tree a[href='#${element.id}']`
    );
    if (newActiveIndex && newActiveIndex.parentElement) {
      newActiveIndex.classList.add(this.activeClassName);
    }
  }
}
