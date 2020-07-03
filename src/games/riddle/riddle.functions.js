import ALL_RIDDLES from './ridlde.data';

const state = {
  riddleAnswer: '',
  riddleText: '',
  riddleTranslate: '',
  riddleOptions: '',
  levelStatistic: [0, 0, 0, 0, 0, 0],
};

function rememberLevelStatistic() {
  const level = +document.querySelector('.input-level').value - 1;
  console.log(level);
  console.log(state.levelStatistic);
  state.levelStatistic[level] += 1;
  console.log(state.levelStatistic);
}

function rewriteLevelStatistic() {
  /* document.querySelector('.lvl-1').style.width = `${((state.levelStatistic[0] / 90) * 100)}%`;
  document.querySelector('.lvl-2').style.width = `${((state.levelStatistic[1] / 90) * 100)}%`;
  document.querySelector('.lvl-3').style.width = `${((state.levelStatistic[2] / 90) * 100)}%`;
  document.querySelector('.lvl-4').style.width = `${((state.levelStatistic[3] / 90) * 100)}%`;
  document.querySelector('.lvl-5').style.width = `${((state.levelStatistic[4] / 90) * 100)}%`;
  document.querySelector('.lvl-6').style.width = `${((state.levelStatistic[5] / 90) * 100)}%`;

  document.querySelector('.points-1').textContent = `${state.levelStatistic[0]}/15`;
  document.querySelector('.points-2').textContent = `${state.levelStatistic[1]}/15`;
  document.querySelector('.points-3').textContent = `${state.levelStatistic[2]}/15`;
  document.querySelector('.points-4').textContent = `${state.levelStatistic[3]}/15`;
  document.querySelector('.points-5').textContent = `${state.levelStatistic[4]}/15`;
  document.querySelector('.points-6').textContent = `${state.levelStatistic[5]}/15`;

  document.querySelector('.percent-1').textContent =
  `${Math.floor((state.levelStatistic[0] / 15) * 10000) / 100}%`;
  document.querySelector('.percent-2').textContent =
  `${Math.floor((state.levelStatistic[1] / 15) * 10000) / 100}%`;
  document.querySelector('.percent-3').textContent =
  `${Math.floor((state.levelStatistic[2] / 15) * 10000) / 100}%`;
  document.querySelector('.percent-4').textContent =
  `${Math.floor((state.levelStatistic[3] / 15) * 10000) / 100}%`;
  document.querySelector('.percent-5').textContent =
  `${Math.floor((state.levelStatistic[4] / 15) * 10000) / 100}%`;
  document.querySelector('.percent-6').textContent =
  `${Math.floor((state.levelStatistic[5] / 15) * 10000) / 100}%`; */

  for (let i = 0; i < 6; i += 1) {
    document.querySelector(`.lvl-${i + 1}`).style.width = `${((state.levelStatistic[i] / 90) * 100)}%`;
    document.querySelector(`.points-${i + 1}`).textContent = `${state.levelStatistic[i]}/15`;
    document.querySelector(`.percent-${i + 1}`).textContent = `${Math.floor((state.levelStatistic[i] / 15) * 10000) / 100}%`;
  }
}

function hideIntro() {
  document.querySelector('.riddle__intro').style.display = 'none';
}

function showSpinner() {
  document.querySelector('.main-sp').style.display = 'flex';
}

function hideSpinner() {
  document.querySelector('.main-sp').style.display = 'none';
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
      console.log(13);
  }
}

function chooseRiddleInformation() {
  const currentLevel = document.querySelector('.input-level').value;
  const currentPage = document.querySelector('.input-page').value;
  const keys = Object.keys(ALL_RIDDLES[currentLevel - 1]);
  state.riddleAnswer = ALL_RIDDLES[currentLevel - 1][keys[currentPage - 1]].answer;
  state.riddleText = ALL_RIDDLES[currentLevel - 1][keys[currentPage - 1]].riddle;
  state.riddleTranslate = ALL_RIDDLES[currentLevel - 1][keys[currentPage - 1]].translate;
  state.riddleOptions = ALL_RIDDLES[currentLevel - 1][keys[currentPage - 1]].options;
}

function rewriteRiddleText() {
  document.querySelector('.riddle-block').innerHTML = state.riddleText;
}

function rewriteRiddleTranslate() {
  document.querySelector('.translate-block').innerHTML = state.riddleTranslate;
}

function rewriteRiddleOptions() {
  document.querySelector('.answer-blocks').innerHTML = '';
  state.riddleOptions.forEach((el) => {
    if (el === state.riddleAnswer) {
      document.querySelector('.answer-blocks').insertAdjacentHTML('beforeend',
        `<button type="button" class="btn btn-outline-success button answer-block">${el}</button>`);
      return true;
    }
    document.querySelector('.answer-blocks').insertAdjacentHTML('beforeend',
      `<button type="button" class="btn btn-outline-success button answer-block wa">${el}</button>`);
  });
}

function showGameFields() {
  document.querySelector('.riddle-container').style.border = '2px solid #005e8d';
  document.querySelector('.answer-form').style.opacity = '100';
  document.querySelector('.riddle-prompts').style.position = 'static';
  document.querySelector('.riddle-prompts').style.opacity = '100';
}

function fillGameFields() {
  console.log(state.riddleAnswer);
  showGameFields();
  rewriteRiddleText();
  rewriteRiddleTranslate();
  rewriteRiddleOptions();
}

function markAnswer(answerStatus) {
  const answerBlock = document.querySelector('.riddle-container');
  if (answerStatus) {
    answerBlock.style.backgroundColor = '#04930430';
    answerBlock.style.border = '2px solid #079816';
  } else {
    answerBlock.style.backgroundColor = '#ff000054';
    answerBlock.style.border = '2px solid #d24c3e';
  }
  setTimeout(() => {
    answerBlock.style.backgroundColor = 'transparent';
    answerBlock.style.border = '2px solid #005e8d';
  }, 300);
}

function playCorrectAudio() {
  document.querySelector('.correct-voice').play();
}

function playWrongAudio() {
  document.querySelector('.wrong-voice').play().catch(() => true);
}

function upLevel() {
  const level = document.querySelector('.input-level');
  const page = document.querySelector('.input-page');
  const userInput = document.querySelector('.answer-input');
  const restartGame = document.querySelector('[data-click="start-game"]');
  if (+page.value !== 15) {
    document.querySelector('.answer-blocks').childNodes.forEach((el) => el.style.opacity = '100');
    page.stepUp();
    restartGame.click();
    userInput.value = '';
  } else {
    document.querySelector('.answer-blocks').childNodes.forEach((el) => el.style.opacity = '100');
    level.stepUp();
    page.value = 1;
    restartGame.click();
    userInput.value = '';
  }
}

function compareAnswers() {
  const currentAnswer = document.querySelector('.answer-input').value.toLowerCase();
  if (state.riddleAnswer.toLowerCase() === currentAnswer) {
    playCorrectAudio();
    markAnswer(true);
    upLevel();
    rememberLevelStatistic();
    rewriteLevelStatistic();
  } else {
    playWrongAudio();
    markAnswer(false);
  }
}

function moveAnswerIntoInput(currentElement, answer) {
  document.querySelector('.answer-input').value = answer;
  document.querySelector('.answer-blocks').childNodes.forEach((el) => el.style.opacity = '100');
  currentElement.style.opacity = '0';
}

function hideTwoWrongAnswers() {
  document.querySelectorAll('.wa').forEach((el, index) => {
    if (index === 2) {
      return true;
    }
    el.style.display = 'none';
    el.style.pointerEvents = 'none';
  });
}

function click() {
  document.addEventListener('click', (event) => {
    console.log(event.target.dataset);
  });
}

function showOrHideTranslatePrompt() {
  document.querySelector('.translate-block').classList.toggle('hide-prompt');
}

function showOrHideOptionsPrompt() {
  document.querySelector('.answer-blocks').classList.toggle('hide-prompt');
}

function passHandler() {
  document.querySelector('.pass-voice').play().catch(() => true);
  markAnswer();
  upLevel();
}

export {
  hideIntroScreen, hideTwoWrongAnswers,
  changeLevelAndPage, chooseRiddleInformation, fillGameFields, click,
  showOrHideTranslatePrompt, showOrHideOptionsPrompt,
  compareAnswers, moveAnswerIntoInput, passHandler,
};
