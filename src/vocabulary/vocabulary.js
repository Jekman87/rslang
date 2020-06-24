import './scss/style.scss';
import showTemplate from './js/vocabulary.template';

export default class Vocubulary {
  static className = 'vocabulary';

  constructor(tag) {
    document.querySelector(tag).innerHTML = showTemplate();
    console.log('constructor');
  }

  render() {
    console.log('start application');
  }
}
