import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createVocabularyHTML from './vocabulary.template';
import './scss/style.scss';

export default class Vocabulary extends Component {
  static className = 'Vocabulary';

  constructor($root, options) {
    super($root, {
      name: 'Vocabulary',
      listeners: ['click'],
      ...options,
    });

    this.pages = options.pages;
  }

  init() {
    super.init();
    // подписка на события внутри компонента
  }

  onClick(event) {
    const clickedElement = $$(event.target);

    if (clickedElement.hasClass('btn')) {
      const pageName = clickedElement.data.name;
      this.emit('selectPage', pageName);
    }
  }

  toHTML() {
    return createVocabularyHTML().trim();
  }
}

// import './scss/style.scss';
// import showTemplate from './js/vocabulary.template';

// export default class Vocubulary {
//   static className = 'vocabulary';

//   constructor(tag) {
//     document.querySelector(tag).innerHTML = showTemplate();
//     console.log('constructor');
//   }

//   render() {
//     console.log('start application');
//   }
// }
