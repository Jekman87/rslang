import Component from '../../../../core/Component';
// import $$ from '../../../../core/domManipulation';
import createScoreContainerHTML from './scoreContainer.template';
import createScoreHTML from './score.template';

export default class Score extends Component {
  static className = 'score';

  constructor($root, options) {
    super($root, {
      name: 'Score',
      listeners: [],
      ...options,
    });
  }

  init() {
    super.init();
    this.$scoreContainer = this.$root.find('.score-content');
    this.subscribe('intro:start', () => {
      this.$root.removeClass('d-none');
    });
    this.subscribe('cardContainer:findWord', () => {
      const content = this.$scoreContainer.html();
      this.$scoreContainer.html(`${content}${createScoreHTML()}`);
    });
    this.subscribe('header:restart', (speakMode) => {
      if (!speakMode) {
        this.$scoreContainer.clear();
      }
    });
  }

  toHTML() {
    return createScoreContainerHTML().trim();
  }
}
