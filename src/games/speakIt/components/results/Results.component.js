import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createResultsHTML from './results.template';
import createWordHTML from './word.tempate';
import createHistoryHTML from './history.template';
import { storage } from '../../../../core/utils';

export default class Results extends Component {
  static className = 'results';

  constructor($root, options) {
    super($root, {
      name: 'Results',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$resultsDialog = this.$root.find('#resultsDialog');
    this.$historyDialog = this.$root.find('#historyDialog');
    this.$errorItems = this.$root.find('.error-items');
    this.$errorNum = this.$root.find('.errors-num');
    this.$successNum = this.$root.find('.success-num');
    this.$successItems = this.$root.find('.success-items');
    this.$historyItems = this.$root.find('.history-items');
    this.subscribe('header:speak', (speakMode) => {
      if (speakMode) {
        updateResults.call(this);
      }
    });
    this.subscribe('header:restart', (speakMode) => {
      if (!speakMode) {
        this.$errorItems.clear();
        this.$successItems.clear();
        this.$errorNum.text('0');
        this.$successNum.text('0');
      }
    });
    this.subscribe('cardsDesk:finishGame', () => {});
    this.subscribe('header:results', () => {
      this.$resultsDialog.$el.showModal();
    });
    this.subscribe('header:history', () => {
      updateGameHistory.call(this);
      this.$historyDialog.$el.showModal();
    });
    this.subscribe('cardContainer:findWord', () => {
      updateResults.call(this);
    });
    this.subscribe('header:finishRound', () => {
      this.$resultsDialog.$el.showModal();
    });
    this.subscribe('score:finishGame', () => {
      updateResults.call(this);
    });
    this.subscribe('cardsDesk:finishGame', () => {
      this.$resultsDialog.$el.showModal();
    });
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    if (Object.keys(clickedElement.data).length) {
      if (clickedElement.data.target === 'resultsreturn') {
        this.$resultsDialog.$el.close();
      }
      if (clickedElement.data.target === 'continue') {
        this.$resultsDialog.$el.close();
      }
      if (clickedElement.data.target === 'historyreturn') {
        this.$historyDialog.$el.close();
      }
    }
  }

  toHTML() {
    return createResultsHTML().trim();
  }
}

function updateResults() {
  const { gameWords, successWords } = this.dataForApp.state;
  const errorWordsToHTML = gameWords.map((word) => createWordHTML(word, 'danger'));
  const successWordsToHTML = successWords.map((word) => createWordHTML(word, 'success'));
  this.$errorItems.html(errorWordsToHTML.join(''));
  this.$successItems.html(successWordsToHTML.join(''));
  this.$errorNum.text(gameWords.length);
  this.$successNum.text(successWords.length);
}

function updateGameHistory() {
  const history = storage('speakit-history');
  if (history) {
    const historyToHTML = history.reverse().map((game) => createHistoryHTML(game));
    this.$historyItems.html(historyToHTML.join(''));
  } else {
    this.$historyItems.html('<p>Вы еще не играли.</p>');
  }
}
