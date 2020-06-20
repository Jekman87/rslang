import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createIntroHTML from './intro.template';
import getWords from '../../api/words.api';
// import { delay } from '../../../../core/utils';

export default class Intro extends Component {
  static className = 'intro';

  constructor($root, options) {
    super($root, {
      name: 'Intro',
      listeners: ['click'],
      ...options,
    });
    this.dataForApp.gameLevel = {
      page: 1,
      group: 1,
    };
  }

  init() {
    super.init();
  }

  async onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.data.action === 'start') {
      clickedElement.html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Loading...`).attr('disabled', true);
      // await delay(1000);
      // check game level
      // get words - from dictionary or from user level or from page 1 group 1

      this.dataForApp.words = await getWords({ ...this.dataForApp.gameLevel });
      console.log(this.dataForApp.words);
      hide.call(this);
      this.emit('intro:start', '');
    }
  }

  toHTML() {
    return createIntroHTML().trim();
  }
}

function hide() {
  this.$root.addClass('d-none');
}
