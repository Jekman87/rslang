import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createCardContainerHTML from './cardContainer.template';

export default class CardContainer extends Component {
  static className = 'card-container';

  constructor($root, options) {
    super($root, {
      name: 'Card-container',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
    this.subscribe('intro:start', () => {
      this.$root.removeClass('d-none');
    });
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log(clickedElement);
  }

  toHTML() {
    return createCardContainerHTML().trim();
  }
}
