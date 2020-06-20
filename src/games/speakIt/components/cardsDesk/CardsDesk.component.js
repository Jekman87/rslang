import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createCardsDeskHTML from './cardsDesk.template';
import createCardHTML from './card.template';
import { getRandomNum } from '../../../../core/utils';
// import getWords from '../../api/words.api';

export default class CardsDesk extends Component {
  static className = 'cards-desk';

  constructor($root, options) {
    super($root, {
      name: 'Сards-desk',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
    this.subscribe('intro:start', () => {
      const cardsData = prepareCardsData.apply(this);
      const cardsRow = this.$root.find('.row');
      // console.log(cardsData);
      // console.log(cardsRow);
      cardsRow.html(cardsData);
      this.$root.removeClass('d-none');
    });
  }

  onClick(event) {
    let clickedElement = $$(event.target);
    if (clickedElement.hasClass('card') || clickedElement.closest('.card')) {
      if (!clickedElement.hasClass('card')) {
        clickedElement = $$(clickedElement.closest('.card'));
      }
      this.$root.findAll('.card-body').forEach((el) => {
        $$(el).removeClass('bg-success').addClass('bg-info');
      });
      const cardBody = clickedElement.find('.card-body');
      cardBody.removeClass('bg-info').addClass('bg-success');
    }
  }

  toHTML() {
    return createCardsDeskHTML().trim();
  }
}

function prepareCardsData() {
  const randomNum = getRandomNum(0, 1);
  const wordsArr = this.dataForApp.words;
  const wordsTen = randomNum ? wordsArr.slice(0, 10) : wordsArr.slice(10, 20);
  const cards = wordsTen.map((name) => {
    const { word: term, wordTranslate: translation, transcription } = name;
    const card = createCardHTML({ term, translation, transcription });
    return card;
  });
  return cards.join('');
}
