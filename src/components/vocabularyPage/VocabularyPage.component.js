import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createVocabularyHTML from './vocabulary.template';
import './scss/style.scss';
// import { FILE_URL } from '../../constants/constants';

const test = [
  {
    progressColor: 'bg-danger',
    progressWidth: '40%',
    progressText: 'Знакомое слово',
    lastTraining: '07.07.2020',
    nextTraining: '08.08.2020',
    counter: '6',
    word: 'agree',
    wordImage: 'https://raw.githubusercontent.com/jekman87/rslang-data/master/files/01_0002.jpg',
    textMeaning: 'To agree is to have the same opinion or belief as another person',
    textExample: 'The students agree they have too much homework',
    transcription: '[əgríː]',
    wordTranslate: 'согласна',
    textMeaningTranslate: 'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
    textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
  },
  {
    progressColor: 'bg-warning',
    progressWidth: '60%',
    progressText: 'Нужно еще потренироваться!',
    lastTraining: '07.07.2020',
    nextTraining: '08.08.2020',
    counter: '2',
    word: 'agree',
    wordImage: 'https://raw.githubusercontent.com/jekman87/rslang-data/master/files/01_0002.jpg',
    textMeaning: 'To agree is to have the same opinion or belief as another person',
    textExample: 'The students agree they have too much homework',
    transcription: '[əgríː]',
    wordTranslate: 'согласна',
    textMeaningTranslate: 'Согласиться - значит иметь то же мнение или убеждение, что и другой человек',
    textExampleTranslate: 'Студенты согласны, что у них слишком много домашней работы',
  },
];

const activeWordsConfig = {
  wordColor: 'text-success',
  systemBottonColor: 'btn-outline-danger',
  systemBottonIcon: 'fas fa-trash',
};
const difficultWordsConfig = {
  wordColor: 'text-danger',
  systemBottonColor: 'btn-outline-success',
  systemBottonIcon: 'fas fa-file-export',
};
const deletedWordsConfig = {
  wordColor: 'text-secondary',
  systemBottonColor: 'btn-outline-success',
  systemBottonIcon: 'fas fa-trash-restore',
};

export default class Vocabulary extends Component {
  static className = 'Vocabulary';

  constructor($root, options) {
    super($root, {
      name: 'Vocabulary',
      listeners: ['click'],
      ...options,
    });

    this.pages = options.pages;
    this.options = options;
    this.settings = this.options.dataForApp.settings.optional;
  }

  createCard(dataObj, config, deletedConfig) {
    { /* <li class="list-group-item"></li> */ }
    let additionalInfoOff = false;
    let additionalFieldsOff = false;
    if (this.settings.vocabularyExample === false
      && this.settings.vocabularyExplanation === false) {
      additionalInfoOff = true;
    }
    if (this.settings.vocabularyExample === false
      && this.settings.vocabularyExplanation === false
      && this.settings.vocabularyImage === false) {
      additionalFieldsOff = true;
    }
    // const ul = document.createElement('ul');
    // ul.classList.add('list-group');
    // ul.innerHTML =
    return `<li class="list-group-item">
    <div class="d-flex flex-column-reverse align-items-center justify-content-between flex-sm-row">
    <div class="progress-wrapper d-flex  flex-sm-column flex-lg-row col-12 col-sm-4 ml-md-3 mb-1 justify-content-between align-items-center">
      <div class="progress">
        <div class="progress-bar progress-bar-striped ${dataObj.progressColor}" role="progressbar" style="width: ${dataObj.progressWidth}"
          aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <small class="progress-info text-nowrap text-muted ml-2 ml-sm-0 ml-lg-2">${dataObj.progressText}</small>
    </div>

    <ol class="d-lg-flex col-12 col-sm-7 col-md-5 mb-1 ${deletedConfig ? 'col-lg-5 col-xl-4' : 'col-lg-8 col-xl-7'}">
      <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Последняя тренировка: ${dataObj.lastTraining}</small></li>
      <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Повторов:${dataObj.counter}</small></li>
      <li class="${deletedConfig ? 'd-none' : 'breadcrumb-item'} align-items-lg-center"><small class="text-muted">Следующая тренировка:${dataObj.nextTraining}</small></li>
    </ol>
  </div>

  <div class="d-flex justify-content-between ${additionalFieldsOff ? 'my-3 align-items-center' : 'word-wrapper'}">
  <div class="word-info-wrapper order-2 order-md-1 ${additionalInfoOff ? 'align-self-md-center' : ''} ${additionalFieldsOff ? '' : 'mb-3'}">
    <div class="word-info" style="line-height: 1.5rem;">
      <span class="word h4 ${config.wordColor} m-0">${dataObj.word}</span>
      <span class="">—</span>
      <big class="transcription text-primary ${this.settings.vocabularyTranscription ? '' : 'd-none'}">${dataObj.transcription}<span class="ml-2">—</span></big>
      <big class="translation">${dataObj.wordTranslate}</big>
    </div>

    <div class="additional-info desktop-block d-none d-md-block  ${additionalInfoOff ? '' : 'mt-3'}">
      <div class="description mb-2  ${this.settings.vocabularyExplanation ? 'd-flex' : 'd-none'}">
        <div class="icon-container col-md-2 col-lg-1 text-center text-info"><i class="fas fa-graduation-cap"></i></div>
        <div class="text-container">
          <span class="text-primary"><strong>${dataObj.textMeaning}</strong></span>
          <span class="">—</span>
          <span class="text-gray">${dataObj.textMeaningTranslate}</span>
        </div>
      </div>

      <div class="example ${this.settings.vocabularyExample ? 'd-flex' : 'd-none'}">
        <div class="icon-container col-md-2 col-lg-1 text-center text-info"><i class="fas fa-lightbulb"></i></div>
        <div class="text-container">
          <span class="text-text-primary"><strong>${dataObj.textExample}</strong></span>
          <span class="">—</span>
          <span class="text-gray">${dataObj.textExampleTranslate}</span>
        </div>
      </div>
    </div>
  </div>


  <img class="${this.settings.vocabularyImage ? 'word-image' : 'd-none'} rounded px-0 mr-md-1 order-3 order-md-2 mb-3 mb-md-0" src="${dataObj.wordImage}"
    alt="">


  <div class="buttons-wrapper d-flex order-md-3 my-md-0 ml-md-2 justify-content-around justify-content-md-between ${additionalFieldsOff ? 'order-3' : 'order-1 flex-md-column my-3'}">
    <button type="button" class="btn btn-outline-info px-1  ${additionalFieldsOff ? 'mr-2' : ''}" style="border-color:transparent"><i class="fas fa-volume-up sound-button"></i>
    </button>
    <button type="button" class="btn ${config.systemBottonColor} px-1" style="border-color:transparent"><i class="${config.systemBottonIcon} retrieval-button"></i>
    </button>
  </div>
  
  <div class="additional-info order-4 mobile-block d-md-none px-0 px-md-2 ${additionalFieldsOff ? 'd-none' : 'col-12'}">
    <div class="description ${this.settings.vocabularyExplanation ? 'd-flex' : 'd-none'}">
      <div class="icon-container col-1 text-center text-info p-0 px-md-2"><i class="fas fa-graduation-cap"></i>
      </div>
      <div class="text-container">
        <div>
          <span class="text-primary"><strong>${dataObj.textMeaning}</strong></span>
          <span class="">—</span>
        </div>
        <div class="text-gray">${dataObj.textMeaningTranslate}</div>
      </div>
    </div>
    

    <div class="example  ${this.settings.vocabularyExample ? 'd-flex' : 'd-none'}">
      <div class="icon-container col-1 text-center text-info p-0 px-md-2"><i class="fas fa-lightbulb"></i></div>
      <div class="text-container">
        <div>
          <span class="text-text-primary"><strong>${dataObj.textExample}</strong></span>
          <span class="">—</span>
          <div class="text-gray">${dataObj.textExampleTranslate}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</li>
`.trim();

    // </li>
    // return ul;
  }

  createListOfWords(tabId, decodedDataArr, wordsConfig, isDeletedConfig) {
    const container = document.createElement('ul');
    for (let i = 0; i < decodedDataArr.length; i += 1) {
      container.innerHTML += (this.createCard(decodedDataArr[i], wordsConfig, isDeletedConfig));
    }
    container.classList.add('list-group');
    const parentContainer = document.getElementById(tabId);
    parentContainer.innerHTML = '';
    return parentContainer.append(container);
  }
  // const inputDataTemplate = inputData.map((el, i) => {
  //   return `

  // ${inputData .text}
  // `; }) .... mainTemplate() { return
  // ${inputDataTemplate}
  // ; }
  init() {
    super.init();
    this.createListOfWords('active-words', test, activeWordsConfig, false);
    // подписка на события внутри компонента
  }

  onClick(event) {
    const clickedElement = $$(event.target);

    if (clickedElement.hasClass('nav-link')) {
      // console.log(clickedElement.$el.href);
      const typeOfWordsId = clickedElement.$el.href.slice((clickedElement.$el.href.indexOf('#')) + 1);
      if (this.typeOfWordsId !== typeOfWordsId) {
        // console.log(typeOfWordsId);
        const PrefixOfTypeOfConfig = typeOfWordsId.slice(0, typeOfWordsId.indexOf('-'));
        const isDeleted = PrefixOfTypeOfConfig === 'deleted';
        let typeOfConfig = PrefixOfTypeOfConfig === 'active' ? activeWordsConfig : difficultWordsConfig;
        if (PrefixOfTypeOfConfig === 'deleted') {
          typeOfConfig = deletedWordsConfig;
        }
        this.createListOfWords(typeOfWordsId, test, typeOfConfig, isDeleted);
        this.typeOfWordsId = typeOfWordsId;
      }
      // const pageName = clickedElement.data.name;
      // this.emit('selectPage', pageName);
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
