import ALL_RIDDLES from './ridlde.data';

const state = {
  riddleAnswer: '',
  riddleText: '',
  riddleTranslate: '',
  riddleOptions: '',
};

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

export {
  hideIntroScreen, hideTwoWrongAnswers,
  changeLevelAndPage, chooseRiddleInformation, fillGameFields, click,
  showOrHideTranslatePrompt, showOrHideOptionsPrompt,
  compareAnswers, moveAnswerIntoInput,
};
