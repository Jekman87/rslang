import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createHeaderHTML from './header.template';
import SpeechRecognition from '../../api/SpeechRecognition.api';

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
    });
    this.subscribe('results:continue', async () => {
      if (this.dataForApp.state.gameLevel.group === 0) {
        this.dataForApp.state.gameLevel.group += 1;
        this.$round.$el.options.value = `${this.dataForApp.state.gameLevel.round}-${this.dataForApp.state.gameLevel.group}`;
        changeSelector.call(this, 'round');
      } else if (this.dataForApp.state.gameLevel.group === 1
        && this.dataForApp.state.gameLevel.round < 29) {
        this.dataForApp.state.gameLevel.group = 0;
        this.dataForApp.state.gameLevel.round += 1;
        this.$round.$el.options.value = `${this.dataForApp.state.gameLevel.round}-${this.dataForApp.state.gameLevel.group}`;
        changeSelector.call(this, 'round');
        await changeGameRoundWords.call(this);
      } else if (this.dataForApp.state.gameLevel.group === 1
        && this.dataForApp.state.gameLevel.round === 29) {
        this.dataForApp.state.gameLevel.group = 0;
        this.dataForApp.state.gameLevel.round = 0;
        this.$round.$el.options.value = `${this.dataForApp.state.gameLevel.round}-${this.dataForApp.state.gameLevel.group}`;
        changeSelector.call(this, 'round');
        if (this.dataForApp.state.gameLevel.level < 5) {
          this.dataForApp.state.gameLevel.level += 1;
        } else {
          this.dataForApp.state.gameLevel.level = 0;
        }
        this.$level.$el.options.value = this.dataForApp.state.gameLevel.level;
        changeSelector.call(this, 'level');
        await changeGameRoundWords.call(this);
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
      this.mainObserver.emit('mainLogout');
    } else {
      console.error(`${e.message}: something went wrong`);
    }
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
  if (group === 0) {
    gameRound = `${level + 1}-${(round + 1) * 2 - 1}`;
  } else {
    gameRound = `${level + 1}-${(round + 1) * 2}`;
  }
  const speakItLongStat = {
    date,
    round: `${gameRound}`,
    result: `${correct}-${10 - correct}`,
  };

  let histories = [];
  if (this.mainStatistic.optional.SpeakItLong) {
    histories = JSON.parse(this.mainStatistic.optional.SpeakItLong);
    if (histories.length > 9) {
      histories = histories.slice(1);
    }
    histories.push(speakItLongStat);
  } else {
    histories.push(speakItLongStat);
  }
  const speakItMain = { lastRound: { level, round, group } };

  this.mainStatistic.optional.SpeakItLong = JSON.stringify(histories);
  this.mainStatistic.optional.SpeakItMain = JSON.stringify(speakItMain);
  try {
    await this.mainApi.updateStatistics(this.mainStatistic);
    // await this.mainApi.updateStatistics({
    //   learnedWords: 0,
    //   optional: {
    //     MainGameShort: false,
    //     MainGameLong: false,
    //   },
    // });
  } catch (e) {
    if (e.message === '401') {
      this.mainObserver.emit('mainLogout');
    } else {
      console.error(`${e.message}: something went wrong`);
    }
  }
}

function changeSelector(key) {
  Array.from(this[`$${key}`].$el.options).forEach((option, i) => {
    if (key === 'round') {
      if (option.value === `${this.dataForApp.state.gameLevel.round}-${this.dataForApp.state.gameLevel.group}`) {
        this.$round.$el.selectedIndex = i;
      }
    } else if (option.value === `${this.dataForApp.state.gameLevel[key]}`) {
      this[`$${key}`].$el.selectedIndex = i;
    }
  });
}
