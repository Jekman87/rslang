import './scss/riddle.scss';

import Component from '../../core/Component';
import createGameField from './riddle.template';
import {
  hideIntroScreen, hideTwoWrongAnswers, restartStatistic,
  changeLevelAndPage, chooseRiddleInformation, fillGameFields,
  showOrHideTranslatePrompt, showOrHideOptionsPrompt,
  compareAnswers, moveAnswerIntoInput, passHandler,
  showStatistic, removeStatistic, recountStatistic,
  showCorrectPartOfStatistic, showWrongPartOfStatistic, prepareLongTimeStatistic,
  backToStatisticScreen, backToGameFromStatistic, state, checkRound, rewriteLevelStatistic,
} from './riddle.functions';

export default class RiddleGame extends Component {
  static className = 'riddle';

  constructor($root, options) {
    super($root, {
      name: 'Riddle',
      listeners: ['click', 'submit'],
      ...options,
    });
    this.options = options;
    this.statistic = this.options.dataForApp.statistics;
    this.mainApi = this.options.api;
  }

  init() {
    super.init();
    this.unpackStatistics();
    rewriteLevelStatistic();
    checkRound();
    recountStatistic();
  }

  onClick(event) {
    switch (event.target.dataset.click) {
      case 'start':
        hideIntroScreen();
        break;
      case 'minus-level':
        changeLevelAndPage(event.target.dataset.click);
        break;
      case 'plus-level':
        changeLevelAndPage(event.target.dataset.click);
        break;
      case 'minus-page':
        changeLevelAndPage(event.target.dataset.click);
        break;
      case 'plus-page':
        changeLevelAndPage(event.target.dataset.click);
        break;
      case 'start-game':
        chooseRiddleInformation();
        fillGameFields();
        break;
      case 'show-options':
        showOrHideOptionsPrompt();
        break;
      case 'show-translate':
        showOrHideTranslatePrompt();
        break;
      case 'check':
        compareAnswers();
        this.prepareStatisticForSend(prepareLongTimeStatistic());
        console.log(this.statistic);
        break;
      case 'pass':
        passHandler();
        break;
      case 'remove-wrong':
        hideTwoWrongAnswers();
        break;
      case 'statistic':
        recountStatistic();
        showStatistic();
        break;
      case 'correct-answers':
        showCorrectPartOfStatistic();
        break;
      case 'wrong-answers':
        showWrongPartOfStatistic();
        break;
      case 'return-statistic':
        backToStatisticScreen();
        break;
      case 'remove-statistic':
        removeStatistic();
        recountStatistic();
        this.statistic.optional.RiddleLong = JSON.stringify([]);
        this.statistic.optional.RiddleShort = JSON.stringify([]);
        break;
      case 'return':
        backToGameFromStatistic();
        break;
      case 'home':
        this.destroy();
        this.options.observer.emit('selectPage', 'MainPage');
        break;
      default:
        break;
    }

    if (event.target.classList.contains('answer-block')) {
      moveAnswerIntoInput(event.target, event.target.textContent);
    }
  }

  prepareStatisticForSend(roundResult) {
    let longTimeStatisic = [];
    const shortTimeStatisic = [state.lvlStatistic, state.round];

    if (this.statistic.optional.RiddleLong) {
      longTimeStatisic = JSON.parse(this.statistic.optional.RiddleLong);
    }

    if (longTimeStatisic.length < 15) {
      longTimeStatisic.push(roundResult);
    } else {
      longTimeStatisic.shift();
      longTimeStatisic.push(roundResult);
    }

    this.statistic.optional.RiddleLong = JSON.stringify(longTimeStatisic);
    this.statistic.optional.RiddleShort = JSON.stringify(shortTimeStatisic);
    this.mainApi.updateStatistics(this.statistic);
  }

  unpackStatistics() {
    if (this.statistic.optional.RiddleShort) {
      const shortTimeStatisic = JSON.parse(this.statistic.optional.RiddleShort);
      [state.lvlStatistic, state.round] = shortTimeStatisic;
    } else {
      restartStatistic();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    compareAnswers();
    this.prepareStatisticForSend(prepareLongTimeStatistic());
  }

  toHTML() {
    return createGameField().trim();
  }
}
