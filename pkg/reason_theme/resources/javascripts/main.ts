import '../stylesheets/style.scss';
import SwitchTheme from './SwithcTheme';

document.addEventListener('DOMContentLoaded', () => {
  new SwitchTheme(
    document.getElementsByClassName('ToolButton__viewModeButton')
  );
});
