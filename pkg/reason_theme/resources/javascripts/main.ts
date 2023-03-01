import '../stylesheets/style.scss';
import Navigation from './Navigation';
import SwitchTheme from './SwithcTheme';
import TocNavigation from './TocNavigation';

document.addEventListener('DOMContentLoaded', () => {
  new SwitchTheme(
    Array.from(document.getElementsByClassName('ToolButton__viewModeButton'))
  );

  new TocNavigation();

  new Navigation();
});
