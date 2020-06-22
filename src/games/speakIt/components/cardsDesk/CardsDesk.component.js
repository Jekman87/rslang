import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createCardsDeskHTML from './cardsDesk.template';
import createCardHTML from './card.template';
import { getRandomNum } from '../../../../core/utils';
import { ASSETS_URL } from '../../api/constants';
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
    this.$audio = this.$root.find('#audio');
    this.subscribe('intro:start', () => {
      const cardsData = prepareCardsData.apply(this);
      const cardsRow = this.$root.find('.row');
      cardsRow.html(cardsData);
      this.$root.removeClass('d-none');
    });
    this.subscribe('header:speak', (speakMode) => {
      if (speakMode) {
        this.$root.findAll('.card').forEach((el) => {
          $$(el).removeClass('bg-success').addClass('bg-info');
        });
        this.$root.findAll('.card-body').forEach((el) => {
          $$(el).removeClass('bg-success').addClass('bg-info');
        });
      }
    });
    this.subscribe('header:restart', (speakMode) => {
      if (!speakMode) {
        this.$root.findAll('.card').forEach((el) => {
          $$(el).removeClass('bg-success').addClass('bg-info');
        });
        this.$root.findAll('.card-body').forEach((el) => {
          $$(el).removeClass('bg-success').addClass('bg-info');
        });
      }
    });
  }

  onClick(event) {
    let clickedElement = $$(event.target);
    if (clickedElement.hasClass('card') || clickedElement.closest('.card')) {
      if (!this.dataForApp.state.speakMode) {
        if (!clickedElement.hasClass('card')) {
          clickedElement = $$(clickedElement.closest('.card'));
        }
        this.$root.findAll('.card').forEach((el) => {
          $$(el).removeClass('bg-success').addClass('bg-info');
        });
        this.$root.findAll('.card-body').forEach((el) => {
          $$(el).removeClass('bg-success').addClass('bg-info');
        });
        const cardBody = clickedElement.find('.card-body');
        clickedElement.addClass('bg-success');
        cardBody.removeClass('bg-info').addClass('bg-success');
        const data = this.dataForApp.words.find((el) => el.id === clickedElement.data.wordid);
        const { audio } = data;
        this.emit('cardsDesk:clickOnCard', data);
        playAudio.apply(this, [audio.replace('files/', '')]);
      }
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
    const {
      id, word: term, wordTranslate: translation, transcription,
    } = name;
    const card = createCardHTML({
      id, term, translation, transcription,
    });
    return card;
  });
  this.dataForApp.words = wordsTen;
  return cards.join('');
}

function playAudio(file) {
  if (file) {
    this.$audio.attr(
      'src',
      `${ASSETS_URL}${file}`,
    );
    this.$audio.$el.currentTime = 0;
    this.$audio.$el.play();
  }
}
