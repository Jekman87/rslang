import Component from '../../../../core/Component';
import createScoreContainerHTML from './scoreContainer.template';
import createScoreHTML from './score.template';
import {
  PER_GAME_WORDS,
} from '../../constants/constants';

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
      this.dataForApp.state.correct += 1;
      if (this.dataForApp.state.correct === PER_GAME_WORDS) {
        this.emit('score:finishGame', '');
      }
    });
    this.subscribe('header:restart', (speakMode) => {
      if (!speakMode) {
        this.$scoreContainer.clear();
      }
    });
    this.subscribe('header:finishRound', () => {
      this.$scoreContainer.clear();
    });
    this.subscribe('cardsDesk:finishGame', () => {
      this.$scoreContainer.clear();
    });
  }

  toHTML() {
    return createScoreContainerHTML().trim();
  }
}
