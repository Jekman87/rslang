import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createCardsDeskHTML from './cardsDesk.template';
import createCardHTML from './card.template';
import { ASSETS_URL, LOCAL_ASSETS_URL, PER_GAME_WORDS } from '../../constants/constants';
import { delay } from '../../../../core/utils';

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
      toCardHTML.call(this);
      this.$root.removeClass('d-none');
    });
    this.subscribe('header:speak', (speakMode) => {
      if (speakMode) {
        unSelectCards.call(this);
      }
    });
    this.subscribe('header:restart', (speakMode) => {
      if (!speakMode) {
        unSelectCards.call(this);
      }
    });
    this.subscribe('cardContainer:findWord', (id) => {
      const $card = Array.from(this.$root.findAll('.card'))
        .find((el) => $$(el).data.wordid === id);
      if ($card) {
        playAudio.apply(this, ['correct.mp3', `${LOCAL_ASSETS_URL}/voices/`]);
        const card = $$($card);
        card.removeClass('bg-primary').addClass('bg-success');
        const cardBody = card.find('.card-body');
        cardBody.removeClass('bg-primary').addClass('bg-success');
      } else {
        playAudio.apply(this, ['error.mp3', `${LOCAL_ASSETS_URL}/voices/`]);
      }
    });
    this.subscribe('cardContainer:notFindWord', () => {
      playAudio.apply(this, ['error.mp3', `${LOCAL_ASSETS_URL}/voices/`]);
    });

    this.subscribe('header:changeGameRound', () => {
      const cardsData = prepareCardsDataHTML.apply(this);
      const cardsRow = this.$root.find('.row');
      cardsRow.html(cardsData);
    });
    this.subscribe('stopSpeak', () => {
      const { group } = this.dataForApp.state.gameLevel;
      const wordsArr = this.dataForApp.state.words;
      const wordsTen = group ? wordsArr.slice(0, PER_GAME_WORDS)
        : wordsArr.slice(PER_GAME_WORDS, PER_GAME_WORDS * 2);
      this.dataForApp.state.gameWords = wordsTen;
    });
    this.subscribe('results:playword', (wordId) => {
      if (wordId) {
        const data = this.dataForApp.state.words
          .find((el) => el.id === wordId);
        const { audio } = data;
        playAudio.apply(this, [audio.replace('files/', ''), ASSETS_URL]);
      }
    });
    this.subscribe('results:continue', () => {
      unSelectCards.call(this);
    });
    this.subscribe('header:finishRound', () => {
      unSelectCards.call(this);
      prepareCardsDataHTML.call(this);
    });
    this.subscribe('score:finishGame', async () => {
      await delay(1500);
      playAudio.apply(this, ['success.mp3', `${LOCAL_ASSETS_URL}/voices/`]);
      unSelectCards.call(this);
      prepareCardsDataHTML.call(this);
      this.emit('cardsDesk:finishGame', '');
    });
    this.subscribe('header:rules', () => {
      this.$root.addClass('none');
    });
    this.subscribe('rules:rulesreturn', () => {
      this.$root.removeClass('none');
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
          $$(el).removeClass('bg-success').addClass('bg-primary');
        });
        this.$root.findAll('.card-body').forEach((el) => {
          $$(el).removeClass('bg-success').addClass('bg-primary');
        });
        const cardBody = clickedElement.find('.card-body');
        clickedElement.addClass('bg-success');
        cardBody.removeClass('bg-primary').addClass('bg-success');
        const data = this.dataForApp.state.gameWords
          .find((el) => el.id === clickedElement.data.wordid);
        const { audio } = data;
        this.emit('cardsDesk:clickOnCard', data);
        playAudio.apply(this, [audio.replace('files/', ''), ASSETS_URL]);
      }
    }
  }

  toHTML() {
    return createCardsDeskHTML().trim();
  }
}

function prepareCardsDataHTML() {
  const { group } = this.dataForApp.state.gameLevel;
  const wordsTen = group ? this.dataForApp.state.words.slice(0, PER_GAME_WORDS)
    : this.dataForApp.state.words.slice(PER_GAME_WORDS, PER_GAME_WORDS * 2);
  const cards = wordsTen.map((name) => {
    const {
      id, word: term, wordTranslate: translation, transcription,
    } = name;
    const card = createCardHTML({
      id, term, translation, transcription,
    });
    return card;
  });
  this.dataForApp.state.gameWords = wordsTen;
  this.dataForApp.state.successWords = [];
  return cards.join('');
}

function playAudio(file, url) {
  if (file) {
    this.$audio.attr(
      'src',
      `${url}/${file}`,
    );
    this.$audio.$el.currentTime = 0;
    this.$audio.$el.play();
  }
}

function toCardHTML() {
  const cardsData = prepareCardsDataHTML.apply(this);
  const cardsRow = this.$root.find('.row');
  cardsRow.html(cardsData);
}

function unSelectCards() {
  this.$root.findAll('.card').forEach((el) => {
    $$(el).removeClass('bg-success').addClass('bg-primary');
  });
  this.$root.findAll('.card-body').forEach((el) => {
    $$(el).removeClass('bg-success').addClass('bg-primary');
  });
}
