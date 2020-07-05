const statisticsPattern = {
  id: null,
  learnedWords: 0,
  optional: {},
};

const roundsStructure = '|-|000000000000000000000000000000000000000000000-|0000000000000000000000000000000000000000-|0000000000000000000000000000000000000000-|0000000000000000000000000-|0000000000000000000000000-|0000000000000000000000000';

const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const puzzleSizeSettings = {
  801: {
    marginShift: 22,
    minSpace: 20,
    fontSize: 16,
    textShiftY: 29,
    circleRadius: 12.5,
    circleShiftX1: 13.5,
    circleShiftX2: 7.5,
  },
  623: {
    marginShift: 22,
    minSpace: 20,
    fontSize: 12,
    textShiftY: 22,
    circleRadius: 9.5,
    circleShiftX1: 10.5,
    circleShiftX2: 5.5,
  },
};

export {
  statisticsPattern, roundsStructure, monthNames, puzzleSizeSettings,
};
