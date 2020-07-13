const feildsAllMap = {
  words: 0,
  cards: 1,
};

const feildsTodayMap = {
  wordsToday: 0,
  cardsToday: 1,
  cardsLeftToday: 2,
  answerRatio: 3,
  longestSeries: 4,
};

const fieldsAll = [
  {
    text: 'Всего выучено слов',
    data: '0 из 3600',
  },
  {
    text: 'Всего карточек пройдено',
    data: 0,
  },
];

const feildsToday = [
  {
    text: 'Новые слова:',
    data: 0,
  },
  {
    text: 'Карточек изучено:',
    progress: 'bg-success',
    progressValue: 0,
    data: 0,
  },
  {
    text: 'Карточек осталось:',
    progress: 'bg-danger',
    progressValue: 0,
    data: 0,
  },
  {
    text: 'Процент правильных ответов:',
    data: '0%',
  },
  {
    text: 'Лучшая серия ответов:',
    data: 0,
  },
];

export {
  feildsAllMap, fieldsAll, feildsTodayMap, feildsToday,
};
