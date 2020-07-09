export default class UserWord {
  constructor() {
    this.difficulty = 'new';
    this.optional = {
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
