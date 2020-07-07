import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createRulesHTML from './Rules.template';

export default class Rules extends Component {
  static className = 'rules';

  constructor($root, options) {
    super($root, {
      name: 'Rules',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
  }

  async onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.data.action === 'close') {
      console.log('close');
    }
  }

  toHTML() {
    return createRulesHTML().trim();
  }
}
