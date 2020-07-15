import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createHeaderHTML from './header.template';
import SpeechRecognition from '../../utils/SpeechRecognition.api';
import {
  MAX_WORDS_PAGES, MAX_WORDS_LEVEL, PER_GAME_WORDS, MAX_HISTORY_LIST_COUNT,
} from '../../constants/constants';
import { delay } from '../../../../core/utils';

export default class Header extends Component {
  static className = 'header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['click', 'change'],
      ...options,
    });
    this.mainObserver = this.dataForApp.mainApp.observer;
    this.mainApi = this.dataForApp.mainApp.api;
    this.mainStatistic = this.dataForApp.mainApp.dataForApp.statistics;
  }

  init() {
    super.init();
    this.$gameRoundSelectors = this.$root.find('#game-round-selectors');
    this.$dicitonaryMode = this.$root.find('#dicitonary-mode');
    this.$level = this.$root.find('#gameLevel');
    this.$round = this.$root.find('#gameRound');
    this.speakBtn = this.$root.find('[data-type="speak"');
    this.resultsBtn = this.$root.find('[data-type="results"');
    this.finishBtn = this.$root.find('[data-type="finish"');
    this.faMicrophone = this.$root.find('.fa-microphone');

    this.subscribe('intro:start', () => {
      this.$root.removeClass('d-none');
      changeSelector.call(this, 'level');
      changeSelector.call(this, 'round');
      if (this.dataForApp.state.mode === 'dictionary') {
        this.$gameRoundSelectors.addClass('d-none');
        this.$dicitonaryMode.removeClass('d-none');
      }
    });
    this.subscribe('results:continue', async () => {
      if (this.dataForApp.state.mode === 'rounds') {
        let { level, round, group } = this.dataForApp.state.gameLevel;
        if (group === 0) {
          group += 1;
          this.$round.$el.options.value = `${round}-${group}`;
          this.dataForApp.state.gameLevel.group = group;
          changeSelector.call(this, 'round');
        } else if (group === 1 && round < MAX_WORDS_PAGES) {
          group = 0;
          round += 1;
          this.$round.$el.options.value = `${round}-${group}`;
          this.dataForApp.state.gameLevel.group = group;
          this.dataForApp.state.gameLevel.round = round;
          changeSelector.call(this, 'round');
          await changeGameRoundWords.call(this);
        } else if (group === 1 && round === MAX_WORDS_PAGES) {
          group = 0;
          round = 0;
          this.$round.$el.options.value = `${round}-${group}`;
          this.dataForApp.state.gameLevel.group = group;
          this.dataForApp.state.gameLevel.round = round;
          changeSelector.call(this, 'round');
          if (level < MAX_WORDS_LEVEL) {
            level += 1;
            this.dataForApp.state.gameLevel.level = level;
          } else {
            level = 0;
            this.dataForApp.state.gameLevel.level = level;
          }
          this.$level.$el.options.value = level;
          changeSelector.call(this, 'level');
          await changeGameRoundWords.call(this);
        }
      }
      if (this.dataForApp.state.speakMode) {
        saveGameHistory.call(this);
      }
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    });
    this.subscribe('score:finishGame', () => {
      this.finishBtn.addClass('d-none');
      saveGameHistory.call(this);
      restart.call(this);
      stopSpeak.call(this);
    });
    this.subscribe('rules:rulesreturn', () => {
      this.$root.removeClass('none');
    });
  }

  async onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.data.type === 'speak') {
      if (!this.dataForApp.state.speakMode) {
        this.dataForApp.state.speakMode = true;
      } else {
        this.dataForApp.state.speakMode = false;
      }
      if (this.dataForApp.state.speakMode) {
        this.finishBtn.removeClass('d-none');
        startSpeak.call(this);
        this.emit('header:speak', this.dataForApp.state.speakMode);
      }
    }
    if (clickedElement.data.type === 'restart') {
      this.finishBtn.addClass('d-none');
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('stopSpeak', '');
    }
    if (clickedElement.data.type === 'results') {
      this.emit('header:results', '');
    }
    if (clickedElement.data.type === 'exit') {
      this.dataForApp.destroy();
      this.dataForApp = null;
      this.mainObserver.emit('selectPage', 'MainPage');
    }
    if (clickedElement.data.type === 'history') {
      this.emit('header:history', '');
    }
    if (clickedElement.data.type === 'finish') {
      this.finishBtn.addClass('d-none');
      restart.call(this);
      stopSpeak.call(this);
      saveGameHistory.call(this);
      this.emit('header:finishRound', '');
    }
    if (clickedElement.data.type === 'rules') {
      this.$root.addClass('none');
      this.emit('header:rules', '');
    }
  }

  async onChange(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.$el.id === 'gameLevel') {
      this.dataForApp.state.gameLevel.level = +clickedElement.text();
      await changeGameRoundWords.call(this);
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    }
    if (clickedElement.$el.id === 'gameRound') {
      const [round, group] = clickedElement.text().split('-');
      this.dataForApp.state.gameLevel.round = +round;
      this.dataForApp.state.gameLevel.group = +group;
      if (this.dataForApp.state.gameLevel.group === 0) {
        await changeGameRoundWords.call(this);
      }
      restart.call(this);
      stopSpeak.call(this);
      this.emit('header:restart', this.dataForApp.state.speakMode);
      this.emit('header:changeGameRound', '');
    }
  }

  toHTML() {
    return createHeaderHTML().trim();
  }
}

function startSpeak() {
  this.dataForApp.state.successWords = [];
  this.faMicrophone.addClass('fa-anim-flash');
  this.speakBtn.removeClass('btn-warning').addClass('btn-primary');
  if (!(this.speech instanceof SpeechRecognition)) {
    this.speech = new SpeechRecognition(this.observer);
  }
  this.speech.startWindowSpeechRecognition();
}

function stopSpeak() {
  this.speakBtn.removeClass('btn-primary').addClass('btn-warning');
  this.faMicrophone.removeClass('fa-anim-flash');
  if (this.speech instanceof SpeechRecognition) {
    this.speech.stopWindowsSpeachRecognition();
  }
}

async function changeGameRoundWords() {
  const { level: gr, round: pg } = this.dataForApp.state.gameLevel;
  try {
    this.dataForApp.state.words = await this.mainApi.getWords(pg, gr);
  } catch (e) {
    if (e.message === '401') {
      this.emit('alert:open', {
        type: 'danger',
        text: 'Ошибка авторизации.',
      });
      await delay(1500);
      this.mainObserver.emit('mainLogout');
      return;
    }
    this.emit('alert:open', {
      type: 'danger',
      text: 'Ошибка связи с сервером, попробуйте позже.',
    });
  }
}

function restart() {
  this.dataForApp.state.speakMode = false;
  this.dataForApp.state.correct = 0;
}

async function saveGameHistory() {
  const correct = this.dataForApp.state.successWords.length;
  const { level, round, group } = this.dataForApp.state.gameLevel;
  const date = Date.now();
  let gameRound;
  if (this.dataForApp.state.mode === 'rounds') {
    if (group === 0) {
      gameRound = `${level + 1}-${(round + 1) * 2 - 1}`;
    } else {
      gameRound = `${level + 1}-${(round + 1) * 2}`;
    }
  }
  if (this.dataForApp.state.mode === 'dictionary') {
    gameRound = 'Из словаря-';
  }

  const speakItLongStat = {
    date,
    round: `${gameRound}`,
    result: `${correct}-${PER_GAME_WORDS - correct}`,
  };

  let histories = [];
  if (this.mainStatistic.optional.SpeakItLong) {
    histories = JSON.parse(this.mainStatistic.optional.SpeakItLong);
    if (histories.length >= MAX_HISTORY_LIST_COUNT) {
      histories = histories.slice(1);
    }
    histories.push(speakItLongStat);
  } else {
    histories.push(speakItLongStat);
  }
  const speakItMain = { lastRound: { level, round, group } };

  this.mainStatistic.optional.SpeakItLong = JSON.stringify(histories);
  this.mainStatistic.optional.SpeakItMain = JSON.stringify(speakItMain);

  if (this.dataForApp.state.mode === 'dictionary') {
    this.dataForApp.state.gameWords.forEach((word) => {
      const _word = word;
      _word.userWord.optional.gameError = true;
      try {
        this.mainApi.updateUserWord(_word._id, _word.userWord);
      } catch (e) {
        this.emit('alert:open', {
          type: 'danger',
          text: 'Ошибка связи с сервером, статистика не записалась, попробуйте позже.',
        });
      }
    });
  }

  upUserScore.apply(this, [correct, PER_GAME_WORDS]);

  try {
    await this.mainApi.updateStatistics(this.mainStatistic);
  } catch (e) {
    if (e.message === '401') {
      this.emit('alert:open', {
        type: 'danger',
        text: 'Ошибка авторизации.',
      });
      await delay(1500);
      this.mainObserver.emit('mainLogout');
      return;
    }
    this.emit('alert:open', {
      type: 'danger',
      text: 'Ошибка связи с сервером, статистика не записалась, попробуйте позже.',
    });
  }
}

function changeSelector(key) {
  const { round, group } = this.dataForApp.state.gameLevel;
  Array.from(this[`$${key}`].$el.options).forEach((option, i) => {
    if (key === 'round') {
      if (option.value === `${round}-${group}`) {
        this.$round.$el.selectedIndex = i;
      }
    } else if (option.value === `${this.dataForApp.state.gameLevel[key]}`) {
      this[`$${key}`].$el.selectedIndex = i;
    }
  });
}

function upUserScore(correct, maxAnswers) {
  let value = 10;
  value *= correct / maxAnswers;
  this.mainObserver.emit('saveCommonProgress', value);
}
