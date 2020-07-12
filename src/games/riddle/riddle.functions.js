import ALL_RIDDLES from './ridlde.data';

const state = {
  round: 0,
  riddleAnswer: '',
  riddleText: '',
  riddleTranslate: '',
  riddleOptions: '',
  lvlStatistic: [],
};

function restartStatistic() {
  state.lvlStatistic = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
}

function checkRound() {
  if (state.round !== 0) {
    const restartGame = document.querySelector('[data-click="start-game"]');
    const level = document.querySelector('.input-level');
    const page = document.querySelector('.input-page');
    const lastPlaceInTheGame = state.round.split('-');

    [level.value, page.value] = lastPlaceInTheGame;

    restartGame.click();
  }
}

function prepareLongTimeStatistic() {
  let correctAnswers = 0;
  let wrongAnswers = 0;
  const currentDate = Date.now();

  const currentGameResults = {
    date: '',
    round: '',
    result: '',
  };

  for (let i = 0; i < 6; i += 1) {
    correctAnswers += state.lvlStatistic[i].filter((el) => el !== 0).length;
    wrongAnswers += state.lvlStatistic[i].filter((el) => el === 0).length;
  }

  currentGameResults.date = currentDate;
  currentGameResults.round = state.round;
  currentGameResults.result = `${correctAnswers}-${wrongAnswers}`;

  return currentGameResults;
}

function rememberLevelStatistic() {
  const level = +document.querySelector('.input-level').value - 1;
  const page = +document.querySelector('.input-page').value - 1;
  state.lvlStatistic[level][page] = Date.now();
}

function rewriteLevelStatistic() {
  for (let i = 0; i < 6; i += 1) {
    document.querySelector(`.lvl-${i + 1}`).style.width = `${
      ((state.lvlStatistic[i].filter((el) => el !== 0).length / 90) * 100)
    }%`;
    document.querySelector(`.points-${i + 1}`).textContent = `${
      state.lvlStatistic[i].filter((el) => el !== 0).length
    }/15`;
    document.querySelector(`.percent-${i + 1}`).textContent = `${
      Math.floor((state.lvlStatistic[i].filter((el) => el !== 0).length / 15) * 10000) / 100
    }%`;
  }
}

function removeOldSentences() {
  for (let i = 1; i < 7; i += 1) {
    document.querySelector(`.correct-${i}`).innerHTML = '';
    document.querySelector(`.mistake-${i}`).innerHTML = '';
  }
}

function removeStatistic() {
  removeOldSentences();
  restartStatistic();
  for (let i = 1; i < 7; i += 1) {
    document.querySelector(`.lvl-${i}`).style.width = '0%';
    document.querySelector(`.points-${i}`).textContent = '0/15';
    document.querySelector(`.percent-${i}`).textContent = '(0%)';
    document.querySelector(`.correct-a-${i}`).textContent = '0';
    document.querySelector(`.mistake-a-${i}`).textContent = '0';
  }
}

function recountNumberOfAnswers() {
  for (let i = 1; i < 7; i += 1) {
    const correctAElement = document.querySelector(`.correct-a-${i}`);
    const correctElement = document.querySelector(`.correct-${i}`);
    correctAElement.textContent = correctElement.children.length;

    const mistaketAElement = document.querySelector(`.mistake-a-${i}`);
    const mistakeElement = document.querySelector(`.mistake-${i}`);
    mistaketAElement.textContent = mistakeElement.children.length;
  }
}

function convertDate(time) {
  const currentDate = new Date(time);
  const Year = currentDate.getFullYear();
  const Month = currentDate.getMonth() + 1 < 10
    ? `0${currentDate.getMonth() + 1}`
    : currentDate.getMonth();
  const Day = currentDate.getDate() < 10
    ? `0${currentDate.getDate()}`
    : currentDate.getDate();
  const Hours = currentDate.getHours();
  const Minutes = currentDate.getMinutes() < 10
    ? `0${currentDate.getMinutes()}`
    : currentDate.getMinutes();
  const Seconds = currentDate.getSeconds() < 10
    ? `0${currentDate.getSeconds()}`
    : currentDate.getSeconds();

  return `${Day}/${Month}/${Year} - ${Hours}:${Minutes}:${Seconds} (UTC +3:00);`;
}

function recountStatistic() {
  removeOldSentences();

  for (let i = 0; i < 6; i += 1) {
    const keys = Object.keys(ALL_RIDDLES[i]);
    for (let j = 0; j < 15; j += 1) {
      const riddleText = ALL_RIDDLES[i][keys[j]].riddle;
      const riddleAnswer = ALL_RIDDLES[i][keys[j]].answer;

      const correctAnswer = `
      <div class="riddle-statistic-block riddle-correct">
        <span><b>${convertDate(state.lvlStatistic[i][j])}</b></span>
        <span>${riddleText}</span>
        <span>- ${riddleAnswer}</span>
      </div>
      `;
      const wrongAnswer = `
      <div class="riddle-statistic-block riddle-wrong">
        <span>${riddleText}</span>
      </div>
      `;

      if (state.lvlStatistic[i][j] !== 0) {
        document.querySelector(`.correct-${i + 1}`).insertAdjacentHTML('beforeend', correctAnswer);
      } else {
        document.querySelector(`.mistake-${i + 1}`).insertAdjacentHTML('beforeend', wrongAnswer);
      }
    }
  }

  recountNumberOfAnswers();
}

function hideIntro() {
  document.querySelector('.riddle__intro').style.display = 'none';
}

function showSpinner() {
  document.querySelector('.riddle-main-sp').style.display = 'flex';
}

function hideSpinner() {
  document.querySelector('.riddle-main-sp').style.display = 'none';
}

function hideIntroScreen() {
  setTimeout(hideIntro, 0);
  setTimeout(showSpinner, 0);
  setTimeout(hideSpinner, 1500);
}

function changeLevelAndPage(answerFromHandler) {
  const level = document.querySelector('.input-level');
  const page = document.querySelector('.input-page');
  switch (answerFromHandler) {
    case 'minus-level':
      level.stepDown();
      break;
    case 'plus-level':
      level.stepUp();
      break;
    case 'plus-page':
      page.stepUp();
      break;
    case 'minus-page':
      page.stepDown();
      break;
    default:
      break;
  }
}

function chooseRiddleInformation() {
  const currentLevel = document.querySelector('.input-level').value;
  const currentPage = document.querySelector('.input-page').value;
  const keys = Object.keys(ALL_RIDDLES[currentLevel - 1]);
  const objectWithData = ALL_RIDDLES[currentLevel - 1][keys[currentPage - 1]];

  state.riddleAnswer = objectWithData.answer;
  state.riddleText = objectWithData.riddle;
  state.riddleTranslate = objectWithData.translate;
  state.riddleOptions = objectWithData.options;
}

function rewriteRiddleText() {
  document.querySelector('.riddle-block').innerHTML = state.riddleText;
}

function rewriteRiddleTranslate() {
  document.querySelector('.riddle-translate-block').innerHTML = state.riddleTranslate;
}

function rewriteRiddleOptions() {
  document.querySelector('.riddle-answer-blocks').innerHTML = '';
  state.riddleOptions.forEach((el) => {
    if (el === state.riddleAnswer) {
      document.querySelector('.riddle-answer-blocks').insertAdjacentHTML('beforeend',
        `<button type="button" class="btn btn-outline-secondary riddle-button answer-block">${el}</button>`);
      return true;
    }
    document.querySelector('.riddle-answer-blocks').insertAdjacentHTML('beforeend',
      `<button type="button" class="btn btn-outline-secondary riddle-button answer-block wa">${el}</button>`);
    return true;
  });
}

function showGameFields() {
  document.querySelector('.riddle-container').style.border = '2px solid #7b8a8b80;';
  document.querySelector('.riddle-answer-form').style.opacity = '100';
  document.querySelector('.riddle-prompts').style.position = 'static';
  document.querySelector('.riddle-prompts').style.opacity = '100';
}

function fillGameFields() {
  showGameFields();
  rewriteRiddleText();
  rewriteRiddleTranslate();
  rewriteRiddleOptions();
}

function markAnswer(answerStatus) {
  const answerBlock = document.querySelector('.riddle-container');
  if (answerStatus) {
    answerBlock.style.backgroundColor = '#0c851e54';
    answerBlock.style.border = '2px solid #0c851e';
  } else {
    answerBlock.style.backgroundColor = '#ff000054';
    answerBlock.style.border = '2px solid #d24c3e';
  }
  setTimeout(() => {
    answerBlock.style.backgroundColor = 'transparent';
    answerBlock.style.border = '2px solid #7b8a8b80';
  }, 300);
}

function playCorrectAudio() {
  document.querySelector('.riddle-correct-voice').play().catch(() => true);
}

function playWrongAudio() {
  document.querySelector('.riddle-wrong-voice').play().catch(() => true);
}

function swithchOffVoice() {
  document.querySelector('.riddle-mute').style.display = 'none';
  document.querySelector('.riddle-unmute').style.display = 'flex';

  document.querySelector('.riddle-correct-voice').src = '';
  document.querySelector('.riddle-wrong-voice').src = '';
  document.querySelector('.riddle-pass-voice').src = '';
}

function swithchOnVoice() {
  document.querySelector('.riddle-mute').style.display = 'flex';
  document.querySelector('.riddle-unmute').style.display = 'none';

  document.querySelector('.riddle-correct-voice').src = 'assets/voices/pew.mp3';
  document.querySelector('.riddle-wrong-voice').src = 'assets/voices/wrong.mp3';
  document.querySelector('.riddle-pass-voice').src = 'assets/voices/pass.mp3';
}

function upLevel() {
  const level = document.querySelector('.input-level');
  const page = document.querySelector('.input-page');
  const userInput = document.querySelector('.riddle-answer-input');
  const restartGame = document.querySelector('[data-click="start-game"]');

  if (+page.value !== 15) {
    document.querySelector('.riddle-answer-blocks').childNodes.forEach((el) => {
      const element = el;
      element.style.opacity = '100';
    });
    page.stepUp();
    restartGame.click();
    userInput.value = '';
    state.round = `${level.value}-${page.value}`;
  } else if (+level.value !== 6) {
    document.querySelector('.riddle-answer-blocks').childNodes.forEach((el) => {
      const element = el;
      element.style.opacity = '100';
    });
    level.stepUp();
    page.value = 1;
    restartGame.click();
    userInput.value = '';
    state.round = `${level.value}-${page.value}`;
  }
}

function compareAnswers() {
  const currentAnswer = document.querySelector('.riddle-answer-input').value.toLowerCase();
  if (state.riddleAnswer.toLowerCase() === currentAnswer) {
    playCorrectAudio();
    rememberLevelStatistic();
    markAnswer(true);
    upLevel();
    rewriteLevelStatistic();
    prepareLongTimeStatistic();
  } else {
    playWrongAudio();
    markAnswer(false);
  }
}

function moveAnswerIntoInput(element, answer) {
  const currentElement = element;
  document.querySelector('.riddle-answer-input').value = answer;
  document.querySelector('.riddle-answer-blocks').childNodes.forEach((el) => {
    const elem = el;
    elem.style.opacity = '100';
  });
  currentElement.style.opacity = '0';
}

function hideTwoWrongAnswers() {
  document.querySelectorAll('.wa').forEach((el, index) => {
    const element = el;
    if (index === 2) {
      return true;
    }
    element.style.display = 'none';
    element.style.pointerEvents = 'none';
    return true;
  });
}

function showOrHideTranslatePrompt() {
  document.querySelector('.riddle-translate-block').classList.toggle('riddle-hide-prompt');
}

function showOrHideOptionsPrompt() {
  document.querySelector('.riddle-answer-blocks').classList.toggle('riddle-hide-prompt');
}

function passHandler() {
  const level = document.querySelector('.input-level');
  const page = document.querySelector('.input-page');

  document.querySelector('.riddle-pass-voice').play().catch(() => true);
  markAnswer();
  upLevel();

  state.round = `${level.value}-${page.value}`;
}

function showStatistic() {
  document.querySelector('.riddle-statistic-screen').style.display = 'flex';
}

function showCorrectPartOfStatistic() {
  document.querySelector('.riddle-statistic-blocks').style.display = 'none';
  document.querySelector('.riddle-statistic-blocks-correct').style.display = 'block';
}

function showWrongPartOfStatistic() {
  document.querySelector('.riddle-statistic-blocks').style.display = 'none';
  document.querySelector('.riddle-statistic-blocks-wrong').style.display = 'block';
}

function backToStatisticScreen() {
  document.querySelector('.riddle-statistic-blocks-correct').style.display = 'none';
  document.querySelector('.riddle-statistic-blocks-wrong').style.display = 'none';
  document.querySelector('.riddle-statistic-blocks').style.display = 'block';
}

function backToGameFromStatistic() {
  document.querySelector('.riddle-statistic-screen').style.display = 'none';
}

export {
  hideIntroScreen, hideTwoWrongAnswers, restartStatistic,
  changeLevelAndPage, chooseRiddleInformation, fillGameFields,
  showOrHideTranslatePrompt, showOrHideOptionsPrompt,
  compareAnswers, moveAnswerIntoInput, passHandler, swithchOffVoice,
  showStatistic, recountStatistic, removeStatistic, swithchOnVoice,
  showCorrectPartOfStatistic, showWrongPartOfStatistic,
  backToStatisticScreen, backToGameFromStatistic, state,
  prepareLongTimeStatistic, checkRound, rewriteLevelStatistic,
};
