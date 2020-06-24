import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createIntroHTML from './intro.template';
import createButtonSpinnerHTML from './button-spinner.template';
import { getWords } from '../../api/words.api';
import { delay } from '../../../../core/utils';

export default class Intro extends Component {
  static className = 'intro';

  constructor($root, options) {
    super($root, {
      name: 'Intro',
      listeners: ['click'],
      ...options,
    });
    this.dataForApp.gameLevel = {
      level: 0,
      round: 0,
      group: 0,
    };
    this.dataForApp.words = null;
    this.dataForApp.state = {
      gameWords: [],
      correct: 0,
      successWords: [],
    };
  }

  init() {
    super.init();
  }

  async onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.data.action === 'start') {
      clickedElement.html(createButtonSpinnerHTML().trim()).attr('disabled', true);
      await delay(1500);
      // check game level
      // get words - from dictionary or from user level or from page 1 group 1
      const { level: group, round: page } = this.dataForApp.gameLevel;
      this.dataForApp.words = await getWords({ group, page });
      hide.call(this);
      this.emit('intro:start', '');
    }
  }

  toHTML() {
    return createIntroHTML().trim();
  }
}

function hide() {
  this.$root.addClass('none');
}
