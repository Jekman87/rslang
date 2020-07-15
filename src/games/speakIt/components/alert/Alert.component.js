import Component from '../../../../core/Component';
import createAlertHTML from './alert.template';

export default class Alert extends Component {
  static className = 'alert';

  constructor($root, options) {
    super($root, {
      name: 'Alert',
      listeners: [],
      ...options,
    });
  }

  init() {
    super.init();
    this.subscribe('alert:open', (data) => {
      this.$root.html(createAlertHTML(data).trim());
    });
    this.subscribe('alert:close', () => {
      this.$root.clear();
    });
  }
}
