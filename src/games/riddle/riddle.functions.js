import ALL_RIDDLES from './ridlde.data';

const state = {
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
restartStatistic();

function rememberLevelStatistic() {
  const level = +document.querySelector('.input-level').value - 1;
  const page = +document.querySelector('.input-page').value - 1;
  state.lvlStatistic[level][page] = 1;
}

function rewriteLevelStatistic() {
  for (let i = 0; i < 6; i += 1) {
    document.querySelector(`.lvl-${i + 1}`).style.width = `${((state.lvlStatistic[i].filter((el) => el === 1).length / 90) * 100)}%`;
    document.querySelector(`.points-${i + 1}`).textContent = `${state.lvlStatistic[i].filter((el) => el === 1).length}/15`;
    document.querySelector(`.percent-${i + 1}`).textContent = `${Math.floor((state.lvlStatistic[i].filter((el) => el === 1).length / 15) * 10000) / 100}%`;
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
    document.querySelector(`.correct-a-${i}`).textContent = document.querySelector(`.correct-${i}`).children.length;
    document.querySelector(`.mistake-a-${i}`).textContent = document.querySelector(`.mistake-${i}`).children.length;
  }
}

function recountStatistic() {
  removeOldSentences();

  for (let i = 0; i < 6; i += 1) {
    const keys = Object.keys(ALL_RIDDLES[i]);
    for (let j = 0; j < 15; j += 1) {
      const riddleText = ALL_RIDDLES[i][keys[j]].riddle;
      const riddleAnswer = ALL_RIDDLES[i][keys[j]].answer;

      const correctAnswer = `
      <div class="statistic-block correct">
        <span>${riddleText}</span>
        <span>- ${riddleAnswer}</span>
      </div>
      `;
      const wrongAnswer = `
      <div class="statistic-block wrong">
        <span>${riddleText}</span>
      </div>
      `;

      if (state.lvlStatistic[i][j] === 1) {
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
    return true;
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
  } else if (+level.value !== 6) {
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
    rememberLevelStatistic();
    markAnswer(true);
    upLevel();
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
    return true;
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

function showStatistic() {
  document.querySelector('.statistic-screen').style.display = 'flex';
}

function showCorrectPartOfStatistic() {
  document.querySelector('.statistic-blocks').style.display = 'none';
  document.querySelector('.statistic-blocks-correct').style.display = 'block';
}

function showWrongPartOfStatistic() {
  document.querySelector('.statistic-blocks').style.display = 'none';
  document.querySelector('.statistic-blocks-wrong').style.display = 'block';
}

function backToStatisticScreen() {
  document.querySelector('.statistic-blocks-correct').style.display = 'none';
  document.querySelector('.statistic-blocks-wrong').style.display = 'none';
  document.querySelector('.statistic-blocks').style.display = 'block';
}

function backToGameFromStatistic() {
  document.querySelector('.statistic-screen').style.display = 'none';
}

export {
  hideIntroScreen, hideTwoWrongAnswers,
  changeLevelAndPage, chooseRiddleInformation, fillGameFields,
  showOrHideTranslatePrompt, showOrHideOptionsPrompt,
  compareAnswers, moveAnswerIntoInput, passHandler,
  showStatistic, recountStatistic, removeStatistic,
  showCorrectPartOfStatistic, showWrongPartOfStatistic,
  backToStatisticScreen, backToGameFromStatistic,
};
