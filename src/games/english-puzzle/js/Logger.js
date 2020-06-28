import userBasicSettings from './userBacicSettings';

export default class Logger {
  constructor(storage, api) {
    this.storage = storage;
    this.api = api;
    this.logoutBtn = document.querySelector('button.logout-pzl-btn');
    this.startBtn = document.querySelector('button.start-button');
    this.reportEl = document.querySelector('p.report-message');
  }

  async init() {
    document.addEventListener('userDataChange', this.sendUserData.bind(this));
    this.logoutBtn.addEventListener('click', Logger.logOut);

    await this.handleUserData(this.isNewUser);

    this.startBtn.classList.add('visible');
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

  async handleUserData() {
    const userData = await this.getUserData();
    this.storage.setUserData(userData);
  }

  static logOut() {
    document.location.reload(true);
  }

  async getUserData() {
    try {
      const content = await this.api.getStatistics();
      return content.optional;
    } catch (e) {
      return userBasicSettings.optional;
    }
  }

  sendUserData() {
    const data = this.storage.collectUserData();
    this.api.updateStatistics(data);
  }
}
