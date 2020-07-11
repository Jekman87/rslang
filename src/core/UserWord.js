import { ONE_MINUTE, TEN_MINUTES, ONE_DAY } from '../constants/constants';

export default class UserWord {
  constructor() {
    this.difficulty = 'new';
    this.optional = {
      intervalAgain: ONE_MINUTE,
      intervalHard: ONE_MINUTE,
      intervalGood: TEN_MINUTES,
      intervalEasy: ONE_DAY * 4,
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
