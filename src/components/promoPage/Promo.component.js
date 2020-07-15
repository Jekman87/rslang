import Component from '../../core/Component';
import createPromoPageLayout from './promo.template';

export default class Promo extends Component {
  static className = 'Promo';

  constructor($root, options) {
    super($root, {
      name: 'Promo',
      listeners: [],
      ...options,
    });
  }

  toHTML() {
    return createPromoPageLayout().trim();
  }
}
