import userBasicSettings from './userBacicSettings';

export default class Logger {
  constructor() {
    this.form = document.querySelector('form.entrance-form');
    this.emailField = document.getElementById('userEmail');
    this.passwordField = document.getElementById('userPassword');
    this.logBtn = document.getElementById('login');
    this.logoutBtn = document.querySelector('button.logout-btn');
    this.registerBtn = document.getElementById('register');
    this.startBtn = document.querySelector('button.start-button');
    this.reportEl = document.querySelector('p.report-message');
    this.isNewUser = false;
  }

  init() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    this.logoutBtn.addEventListener('click', Logger.logOut);
    document.addEventListener('userDataChange', Logger.sendUserData);

    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration && tokenExpiration > Date.now()) {
      this.startBtn.classList.add('visible');
    } else {
      this.form.classList.remove('hidden');
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let params;
    if (e.submitter === this.registerBtn) {
      params = 'users';
    } else {
      params = 'signin';
    }

    this.enterApp(params);
  }

  async enterApp(params) {
    try {
      const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/${params}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.emailField.value,
          password: this.passwordField.value,
        }),
      });
      const result = await rawResponse.json();
      this.handleResult(result);
      this.form.reset();
    } catch (e) {
      this.handleResult({ error: e.name });
    }
  }

  async handleResult(result) {
    if (result.error) {
      this.report('Incorrect type of email/password or user already exists!', false);
      return;
    }
    if (result.token) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('tokenExpiration', Date.now() + 14400000);
      setTimeout(() => Logger.logOut, 14400000);

      await Logger.handleUserData(this.isNewUser);

      this.report(`${result.message}!`, true);
      this.startBtn.classList.add('visible');
    } else {
      this.report('Succes! Please, log in now!', true);
      this.isNewUser = true;
    }
  }

  report(message, isSucces) {
    if (isSucces) {
      this.reportEl.classList.add('report-message_succes');
    }
    this.reportEl.textContent = message;
    this.reportEl.classList.remove('report-message_hidden');
    setTimeout(() => {
      this.reportEl.classList.add('report-message_hidden');
      this.reportEl.classList.remove('report-message_succes');
    }, 2500);
  }

  static async handleUserData(isNewUser) {
    let userData;
    if (isNewUser) {
      userData = await Logger.putUserData(userBasicSettings);
    } else {
      userData = await Logger.getUserData();
    }
    Logger.setLocalstorageSettings(userData);
  }

  static setLocalstorageSettings(data) {
    localStorage.setItem('pronounceHelp', data.pronounceHelp);
    localStorage.setItem('autoplayHelp', data.autoplayHelp);
    localStorage.setItem('translateHelp', data.translateHelp);
    localStorage.setItem('visualHelp', data.visualHelp);
    localStorage.setItem('lastRound', data.lastRound);
    localStorage.setItem('rounds', data.rounds);
  }

  static logOut() {
    localStorage.setItem('token', '');
    localStorage.setItem('tokenExpiration', '');
    localStorage.setItem('userId', '');
    localStorage.setItem('pronounceHelp', '');
    localStorage.setItem('autoplayHelp', '');
    localStorage.setItem('translateHelp', '');
    localStorage.setItem('visualHelp', '');
    localStorage.setItem('lastRound', '');
    localStorage.setItem('rounds', '');
    document.location.reload(true);
  }

  static async putUserData(stat) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.getItem('userId')}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stat),
    });
    const content = await rawResponse.json();

    return content.optional;
  }

  static async getUserData() {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${localStorage.getItem('userId')}/statistics`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
      },
    });
    const content = await rawResponse.json();

    return content.optional;
  }

  static sendUserData() {
    const data = Logger.collectUserData();
    Logger.putUserData(data);
  }

  static collectUserData() {
    const data = {
      learnedWords: 0,
      optional: {
        autoplayHelp: localStorage.getItem('autoplayHelp'),
        pronounceHelp: localStorage.getItem('pronounceHelp'),
        translateHelp: localStorage.getItem('translateHelp'),
        visualHelp: localStorage.getItem('visualHelp'),
        lastRound: localStorage.getItem('lastRound'),
        rounds: localStorage.getItem('rounds'),
      },
    };

    return data;
  }
}
