import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createSettingsHTML from './settingsPage.template';

export default class Settings extends Component {
  static className = 'Settings';

  constructor($root, options) {
    super($root, {
      name: 'Settings',
      listeners: ['click'],
      ...options,
    });
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log('Settings onClick', clickedElement);
  }

  toHTML() {
    return createSettingsHTML().trim();
  }
}
