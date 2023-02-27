import '../stylesheets/style.scss';
import SwitchTheme from './SwithcTheme';
import TocNavigation from './TocNavigation';

document.addEventListener('DOMContentLoaded', () => {
  new SwitchTheme(
    document.getElementsByClassName('ToolButton__viewModeButton')
  );

  new TocNavigation();
});
