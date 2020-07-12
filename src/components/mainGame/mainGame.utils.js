import {
  TEN_MINUTES, ONE_DAY, FOUR_DAYS, MULTIPLIER_GOOD, MULTIPLIER_EASY, WORD_PARAM,
} from '../../constants/constants';

const getIntervalsOfRepeat = (intervalParams) => {
  let again;
  let hard;
  let good;
  let easy;

  const {
    timeAgain, timeHard, timeGood, timeEasy, difficulty,
  } = intervalParams;

  switch (difficulty) {
    case WORD_PARAM.again:
      again = timeAgain;
      hard = timeHard;
      good = timeGood;
      easy = timeEasy;
      break;

    case WORD_PARAM.hard:
      again = timeAgain;
      hard = timeHard;
      good = timeGood;
      easy = timeEasy;
      break;

    case WORD_PARAM.good:
      again = TEN_MINUTES;
      hard = timeGood;
      good = timeGood === TEN_MINUTES ? ONE_DAY : (timeGood * MULTIPLIER_GOOD);
      easy = timeGood === TEN_MINUTES ? FOUR_DAYS : (timeGood * MULTIPLIER_EASY);
      break;

    case WORD_PARAM.easy:
      again = TEN_MINUTES;
      hard = timeEasy;
      good = timeEasy * MULTIPLIER_GOOD;
      easy = timeEasy * MULTIPLIER_EASY;
      break;

    default:
      break;
  }

  return {
    again, hard, good, easy,
  };
};

const getStringTime = (timeMs) => {
  console.log(timeMs);
  return timeMs;
};

export {
  getIntervalsOfRepeat, getStringTime,
};
