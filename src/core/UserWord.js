import { ONE_MINUTE, TEN_MINUTES, FOUR_DAYS } from '../constants/constants';

export default class UserWord {
  constructor() {
    this.difficulty = 'new';
    this.optional = {
      timeAgain: ONE_MINUTE,
      timeHard: ONE_MINUTE,
      timeGood: TEN_MINUTES,
      timeEasy: FOUR_DAYS,
      lastRepeat: 0,
      nextRepeat: 0,
      counter: 0,
      success: 0,
      progress: 1,
      status: 'new',
      gameError: false,
    };
  }
}
