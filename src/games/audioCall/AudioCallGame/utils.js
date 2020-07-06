/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
function setRoundWord(roundWordsArr) {
  const wordsCopy = roundWordsArr.concat();
  const [roundWord] = wordsCopy.splice(Math.floor(Math.random() * wordsCopy.length), 1);

  roundWordsArr.find((word) => word.id === roundWord.id).isAnswer = true;

  return roundWord;
}

function setAnswerAttribute(span, boolean) {
  span.setAttribute('data-answer', boolean);
  span.parentNode.setAttribute('data-answer', boolean);
}

function crossTheWord(target) {
  if (target.tagName === 'SPAN') {
    target.classList.toggle('text-decoration');
  } else if (target.tagName === 'BUTTON') {
    target.children[1].classList.add('text-decoration');
  }
}

function onArrows(direction) {
  const btnsRoundWords = [...document.querySelectorAll('.btn-word')];
  const activeIndex = btnsRoundWords.indexOf(document.activeElement);

  if (direction === 'right') {
    if (activeIndex === 4) {
      btnsRoundWords[0].focus();
    } else btnsRoundWords[activeIndex + 1].focus();
  } else if (direction === 'left') {
    if (activeIndex === 0) {
      btnsRoundWords[4].focus();
    } else btnsRoundWords[activeIndex - 1].focus();
  }
}

function insertStats(word, translate, audio) {
  return `
  <div class="container word-container pl-0">
    <p class="">
      <i class="fas fa-play text-dark"></i>
      <audio src="https://raw.githubusercontent.com/Jekman87/rslang-data/master/${audio}"></audio>
      <span class="ml-2">${word}</span>
      <span class="text-muted ml-1">- ${translate}</span>
    </p>
  </div>
  `;
}

export { setRoundWord, setAnswerAttribute, crossTheWord, onArrows, insertStats };
