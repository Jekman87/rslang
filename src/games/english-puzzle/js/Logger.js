import { statisticsPattern } from './variables';

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
    this.logoutBtn.addEventListener('click', this.logOut.bind(this));

    await this.handleUserData();

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
    try {
      const userData = await this.api.getStatistics();
      this.storage.setUserData(userData);
    } catch (e) {
      if (e.message === '404') {
        this.storage.setUserData(statisticsPattern);
      }
    }
  }

  logOut() {
    document.location.reload(true);
  }

  sendUserData() {
    const data = this.storage.collectUserData();
    this.api.updateStatistics(data);
  }
}
