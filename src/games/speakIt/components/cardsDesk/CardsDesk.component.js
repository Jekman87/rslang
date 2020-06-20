import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createCardsDeskHTML from './cardsDesk.template';
// import getTranslation from '../../api/translate.api';
import getWords from '../../api/words.api';

export default class CardsDesk extends Component {
  static className = 'cards-desk';

  constructor($root, options) {
    super($root, {
      name: 'Сards-desk',
      listeners: ['click'],
      ...options,
    });
    this.gameLevel = {
      page: 1,
      group: 1,
    };
  }

  init() {
    super.init();
    this.subscribe('intro:start', () => {
      this.$root.removeClass('d-none');
    });
    // const res = await getTranslation({ word: 'dog', langs: 'en-ru' });
    // console.log(res);
    prepareCardsData.apply(this);
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log(clickedElement);
  }

  toHTML() {
    return createCardsDeskHTML().trim();
  }
}

async function prepareCardsData() {
  const res2 = await getWords({ ...this.gameLevel });
  console.log(res2);
}
