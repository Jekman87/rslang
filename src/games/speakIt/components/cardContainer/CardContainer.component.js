import Component from '../../../../core/Component';
import createCardContainerHTML from './cardContainer.template';
import { ASSETS_URL, LOCAL_ASSETS_URL } from '../../constants/constants';

export default class CardContainer extends Component {
  static className = 'card-container';

  constructor($root, options) {
    super($root, {
      name: 'Card-container',
      listeners: [],
      ...options,
    });
  }

  init() {
    super.init();
    this.$wordCardImg = this.$root.find('.word-card__img');
    this.$wordCardTranslation = this.$root.find('.word-card__translation');
    this.$wordCardFormGroup = this.$root.find('.form-group');
    this.$wordCardInput = this.$root.find('.word-card__input');

    this.subscribe('intro:start', () => {
      this.$root.removeClass('d-none');
    });
    this.subscribe('cardsDesk:clickOnCard', (data) => {
      updateWordCard.call(this, data);
    });
    this.subscribe('header:speak', (speakMode) => {
      if (speakMode) {
        this.$wordCardImg.attr(
          'src',
          `${LOCAL_ASSETS_URL}/img/blank.jpg`,
        );
        this.$wordCardFormGroup.removeClass('d-none');
        this.$wordCardTranslation.clear();
        this.$wordCardInput.text('');
      }
    });
    this.subscribe('header:restart', () => {
      resetCard.call(this);
    });
    this.subscribe('speech:recognition', (word) => {
      const wordObj = checkSpeechWord.call(this, word);
      let id;
      if (wordObj) {
        if (this.dataForApp.state.mode === 'rounds') {
          id = wordObj.id;
        }
        if (this.dataForApp.state.mode === 'dictionary') {
          id = wordObj._id;
        }
        updateWordCard.call(this, wordObj);
        changeStateWordsArrays.call(this, word);
        this.emit('cardContainer:findWord', id);
      } else {
        this.emit('cardContainer:notFindWord', '');
      }
    });
    this.subscribe('header:finishRound', () => {
      resetCard.call(this);
    });
    this.subscribe('cardsDesk:finishGame', () => {
      resetCard.call(this);
    });
    this.subscribe('header:rules', () => {
      this.$root.addClass('none');
    });
    this.subscribe('rules:rulesreturn', () => {
      this.$root.removeClass('none');
    });
  }

  toHTML() {
    return createCardContainerHTML().trim();
  }
}

function checkSpeechWord(word) {
  return this.dataForApp.state.gameWords.find((el) => el.word.toLowerCase() === word.toLowerCase());
}

async function updateWordCard(data) {
  const {
    image, wordTranslate, word,
  } = data;
  try {
    this.$wordCardImg.attr(
      'src',
      `${ASSETS_URL}/${image.replace('files/', '')}`,
    );
    this.$wordCardTranslation.removeClass('d-none').text(wordTranslate);
    this.$wordCardInput.text(word);
  } catch {
    this.emit('alert:open', {
      type: 'danger',
      text: 'Ошибка связи с сервером, попробуйте позже.',
    });
  }
}

function changeStateWordsArrays(word) {
  this.dataForApp.state.gameWords = this.dataForApp.state.gameWords
    .filter((el) => {
      if (el.word === word) {
        this.dataForApp.state.successWords.push(el);
      }
      return el.word !== word;
    });
}

function resetCard() {
  this.$wordCardImg.attr(
    'src',
    `${LOCAL_ASSETS_URL}/img/blank.jpg`,
  );
  this.$wordCardFormGroup.addClass('d-none');
  this.$wordCardTranslation.removeClass('d-none').clear();
  this.$wordCardInput.text('');
}
