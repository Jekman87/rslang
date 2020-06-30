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
  /* console.log(state.riddleAnswer);
  console.log(state.riddleText);
  console.log(state.riddleTranslate);
  console.log(state.riddleOptions); */
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
    document.querySelector('.answer-blocks').insertAdjacentHTML('beforeend', `<div class="answer-block">${el}</div>`);
  });
}

function fillGameFields() {
  rewriteRiddleText();
  rewriteRiddleTranslate();
  rewriteRiddleOptions();
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
  hideIntroScreen, changeLevelAndPage, chooseRiddleInformation, fillGameFields, click,
  showOrHideTranslatePrompt, showOrHideOptionsPrompt,
};
