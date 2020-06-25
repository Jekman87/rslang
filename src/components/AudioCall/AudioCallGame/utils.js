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
  //   console.log(span.parentNode.children[0]);
  //   span.previousSibling.children[0].setAttribute('data-answer', boolean);
}

function crossTheWord(target) {
  if (target.tagName === 'SPAN') {
    target.classList.toggle('text-decoration');
  } else if (target.tagName === 'BUTTON') {
    target.children[1].classList.toggle('text-decoration');
  }
}

export { setRoundWord, setAnswerAttribute, crossTheWord };
