function setRoundWord(roundWordsArr) {
  const arrCopy = roundWordsArr;
  const wordsCopy = roundWordsArr.concat();
  const [roundWord] = wordsCopy.splice(Math.floor(Math.random() * wordsCopy.length), 1);

  arrCopy.find((word) => word.word === roundWord.word).isAnswer = true;

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
      <i class="fas fa-play text-dark" data-event="stat-sound"></i>
      <audio src="https://raw.githubusercontent.com/Jekman87/rslang-data/master/${audio}"></audio>
      <span class="ml-2">${word}</span>
      <span class="text-muted ml-1">- ${translate}</span>
    </p>
  </div>
  `;
}

function insertLongStats(date, result) {
  const [correct, wrong] = result.split('-');
  const Data = new Date(date);
  const Year = Data.getFullYear();
  const Month = Data.getMonth() + 1 < 10 ? `0${Data.getMonth() + 1}` : Data.getMonth();
  const Day = Data.getDate() < 10 ? `0${Data.getDate()}` : Data.getDate();
  const Hours = Data.getHours();
  const Minutes = Data.getMinutes() < 10 ? `0${Data.getMinutes()}` : Data.getMinutes();
  const Seconds = Data.getSeconds();
  const time = `${Day}/${Month}/${Year} - ${Hours}:${Minutes}:${Seconds} (UTC +3:00);`;

  return `
  <div class="row">
    <div class="col-2 d-flex justify-content-center icon-col">
      <i class="fas fa-music"></i>
    </div>
    <div class="col-8">
      <p>${time}</p>
      <p>правильных ответов - ${correct}</p>
      <p>ошибок - ${wrong}</p>
    </div>
  </div>
  `;
}

function getTip() {
  const bulb = document.querySelector('.fa-lightbulb');
  let words = [...document.querySelectorAll('.btn-word')];

  words = words.filter((item) => item.dataset.answer === 'false');
  words[1].classList.add('text-muted', 'isTipped');
  words[3].classList.add('text-muted', 'isTipped');

  bulb.classList.add('text-muted');
}

export {
  setRoundWord,
  setAnswerAttribute,
  crossTheWord,
  onArrows,
  insertStats,
  insertLongStats,
  getTip,
};
