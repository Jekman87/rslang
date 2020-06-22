export default class SpeechRecognition {
  constructor() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.captureSpeak = this.captureSpeak.bind(this);
  }

  startWindowSpeechRecognition() {
    return new Promise((resolve) => {
      this.recognition.resolve = resolve;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
      this.recognition.addEventListener('result', this.captureSpeak);
      this.recognition.addEventListener('end', this.recognition.start);
      this.recognition.start();
    });
  }

  stopWindowsSpeachRecognition() {
    this.recognition.stop();
    this.recognition.removeEventListener('result', this.captureSpeak);
    this.recognition.removeEventListener('end', this.recognition.start);
  }

  captureSpeak(e) {
    this.msg = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');
    this.stopWindowsSpeachRecognition();
    this.recognition.resolve(this.msg);
  }
}
