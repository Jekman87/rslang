import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createScoreContainerHTML from './scoreContainer.template';
// import createScoreHTML from './score.template';

export default class Score extends Component {
  static className = 'score';

  constructor($root, options) {
    super($root, {
      name: 'Score',
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
    return createScoreContainerHTML().trim();
  }
}
