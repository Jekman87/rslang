export default class Reporter {
  constructor() {
    this.reportEl = document.querySelector('p.report-message');
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
    }, 3500);
  }
}
