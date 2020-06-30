import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createIntroHTML from './intro.template';
import createButtonSpinnerHTML from './button-spinner.template';
import { delay } from '../../../../core/utils';

export default class Intro extends Component {
  static className = 'intro';

  constructor($root, options) {
    super($root, {
      name: 'Intro',
      listeners: ['click'],
      ...options,
    });
    this.dataForApp.state.words = null;
    this.dataForApp.state = {
      gameLevel: {
        level: 0,
        round: 0,
        group: 0,
      },
      gameWords: [],
      correct: 0,
      successWords: [],
      words: [],
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
      const { level: gr, round: pg } = this.dataForApp.state.gameLevel;
      try {
        this.dataForApp.state.words = await this.dataForApp.mainApp.api.getWords(gr, pg);
      } catch (e) {
        if (e.message === '401') {
          console.log(e.message);
          // logout
        } else {
          console.log(`${e.message}: something went wrong`);
        }
      }
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
