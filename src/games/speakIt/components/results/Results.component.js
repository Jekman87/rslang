import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createResultsHTML from './results.template';

export default class Results extends Component {
  static className = 'results';

  constructor($root, options) {
    super($root, {
      name: 'Results',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log(clickedElement);
  }

  toHTML() {
    return createResultsHTML().trim();
  }
}
