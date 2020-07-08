const userBasicSettings = {
  pzlHelpers: 'on-on-on-on',
  pzlLastRound: '1-0',
  pzlPassedRounds: '|-|000000000000000000000000000000000000000000000-|0000000000000000000000000000000000000000-|0000000000000000000000000000000000000000-|0000000000000000000000000-|0000000000000000000000000-|0000000000000000000000000',
  pzlGallery: 'empty',
};

const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const puzzleSizeSettings = {
  801: {
    aspectRatio: 1.78,
    partsAmount: 10,
    marginShift: 22,
    minSpace: 20,
    fontSize: 16,
    textShiftY: 29,
    circleRadius: 12.5,
    circleShiftX1: 13.5,
    circleShiftX2: 7.5,
  },
  623: {
    aspectRatio: 1.78,
    partsAmount: 10,
    marginShift: 22,
    minSpace: 20,
    fontSize: 12,
    textShiftY: 22,
    circleRadius: 9.5,
    circleShiftX1: 10.5,
    circleShiftX2: 5.5,
  },
};

export { userBasicSettings, monthNames, puzzleSizeSettings };
