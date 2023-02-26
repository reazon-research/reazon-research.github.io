const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

type THEME_NAMES = keyof typeof THEMES;
type THEME_VALUES = (typeof THEMES)[THEME_NAMES];

export default class SwitchTheme {
  mode: THEME_VALUES;

  darkClassName: string = THEMES['DARK'];

  constructor(buttons: HTMLCollectionOf<Element>) {
    this.onInitEvent(buttons);

    const mode = this.getLocalStorageItem();
    if (!mode) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.mode = THEMES['DARK'];
      } else {
        this.mode = THEMES['LIGHT'];
      }
    } else {
      this.mode = mode;
    }
    this.setTheme(this.mode);
  }

  private onInitEvent(buttons: HTMLCollectionOf<Element>) {
    Array.from(buttons).forEach((btn) => {
      btn.addEventListener('click', this.toggleTheme.bind(this));
    });
  }

  private getLocalStorageItem(): THEME_VALUES | null {
    try {
      const value = localStorage.getItem('theme');
      if (value) {
        return value as THEME_VALUES;
      }

      return null;
    } catch (e) {
      return null;
    }
  }

  private setLocalStorageItem(mode: THEME_VALUES) {
    localStorage.setItem('theme', mode);
  }

  setTheme(mode: THEME_VALUES) {
    if (mode === THEMES['LIGHT']) {
      document.documentElement.classList.remove(this.darkClassName);
    } else {
      document.documentElement.classList.add(this.darkClassName);
    }

    this.mode = mode;
    this.setLocalStorageItem(mode);
  }

  toggleTheme() {
    if (this.mode === THEMES['LIGHT']) {
      this.setTheme(THEMES['DARK']);
    } else {
      this.setTheme(THEMES['LIGHT']);
    }
  }
}
