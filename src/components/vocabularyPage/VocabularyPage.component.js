/* eslint-disable no-underscore-dangle */
import Component from '../../core/Component';
import $$ from '../../core/domManipulation';
import createVocabularyHTML from './vocabulary.template';
import './scss/style.scss';
import { FILE_URL } from '../../constants/constants';
import progressConfig from '../../constants/progress-config.constants';

const activeWordsConfig = {
  name: 'active',
  wordColor: 'text-success',
  systemBottonColor: 'btn-outline-danger',
  systemBottonIcon: 'fas fa-trash',
};
const difficultWordsConfig = {
  name: 'difficult',
  wordColor: 'text-danger',
  systemBottonColor: 'btn-outline-success',
  systemBottonIcon: 'fas fa-file-export',
};
const deletedWordsConfig = {
  name: 'deleted',
  wordColor: 'text-dark',
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
    this.words = this.options.dataForApp.userWords;
  }

  selectAndDecodeDataFromBackend(criterionOfSelection, dataArr) {
    const decodedArr = [];
    for (let i = 0; i < dataArr.length; i += 1) {
      if (dataArr[i].userWord.optional.status === criterionOfSelection) {
        decodedArr.push(this.decodeDataFromBackend(dataArr[i], i));
      }
    }
    return decodedArr;
  }

  decodeDataFromBackend(obj, i) {
    return {
      progressColor: this.defineProgressBarBgColor(obj.userWord.optional.progress),
      progressWidth: `${this.defineProgressBarWidth(obj.userWord.optional.progress)}%`,
      progressText: this.defineProgressText(obj.userWord.optional.progress),
      lastTraining: this.defineTraining(obj.userWord.optional.lastRepeat),
      nextTraining: this.defineTraining(obj.userWord.optional.nextRepeat),
      counter: obj.userWord.optional.counter,
      word: obj.word,
      wordImage: `${FILE_URL}/${obj.image}`,
      textMeaning: obj.textMeaning,
      textExample: obj.textExample,
      transcription: obj.transcription,
      wordTranslate: obj.wordTranslate,
      textMeaningTranslate: obj.textMeaningTranslate,
      textExampleTranslate: obj.textExampleTranslate,
      audioTagId: `${obj.word}Audio`,
      audioButtonId: `${obj.word}AudioButton`,
      audioSrc: `${FILE_URL}/${obj.audio}`,
      id: obj._id,
      arrPosition: i,
    };
  }

  defineTraining(timestamp) {
    const TrainingData = new Date(timestamp);
    return TrainingData.toLocaleDateString();
  }

  defineProgressBarBgColor(userWordProgress) {
    return progressConfig.bgColor[userWordProgress - 1];
  }

  defineProgressBarWidth(userWordProgress) {
    return progressConfig.barWidth[userWordProgress - 1];
  }

  defineProgressText(userWordProgress) {
    return progressConfig.text[userWordProgress - 1];
  }

  createCard(dataObj, config) {
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
    return `<li class="list-group-item" data-arrposition=${dataObj.arrPosition} id="${dataObj.id}">
    <div class="list-group-error-window d-none"><button type="button" class="accept-error-btn btn btn-danger">Что-то пошло не так... Попробуйте еще раз.</button></div>
    <div class="d-flex flex-column-reverse align-items-center justify-content-between flex-sm-row">
    <div class="progress-wrapper d-flex  flex-sm-column flex-lg-row col-12 col-sm-4 ml-md-3 mb-1 justify-content-between align-items-center">
      <div class="progress">
        <div class="progress-bar progress-bar-striped ${dataObj.progressColor}" role="progressbar" style="width: ${dataObj.progressWidth}"
          aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <small class="progress-info ml-2 ml-sm-0 ml-lg-2">${dataObj.progressText}</small>
    </div>

    <ol class="d-lg-flex col-12 col-sm-7 col-md-5 mb-1 ${config.name === 'deleted' ? 'col-lg-5 col-xl-4' : 'col-lg-8 col-xl-7'}">
      <li class="breadcrumb-item align-items-lg-center"><small>Последняя тренировка:&nbsp;&nbsp;${dataObj.lastTraining}</small></li>
      <li class="breadcrumb-item align-items-lg-center"><small>Повторов:&nbsp;&nbsp;${dataObj.counter}</small></li>
      <li class="${config.name === 'deleted' ? 'd-none' : 'breadcrumb-item'} align-items-lg-center"><small>Следующая тренировка:&nbsp;&nbsp;${dataObj.nextTraining}</small></li>
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
    <button type="button" class="audio-btn btn btn-outline-info px-1  ${additionalFieldsOff ? 'mr-2' : ''}" style="border-color:transparent" id="${dataObj.audioButtonId}"><i class="fas fa-volume-up sound-button"></i>
    </button>
    <audio id="${dataObj.audioTagId}" src="${dataObj.audioSrc}"></audio>
    <button type="button" class="btn ${config.systemBottonColor} px-1" data-systembutton="${config.name}"  style="border-color:transparent"><i class="${config.systemBottonIcon} retrieval-button"></i>
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
  }

  createNoWordsWindow(inputId) {
    const parentContainer = document.getElementById(inputId);
    const emptyList = document.createElement('div');
    emptyList.classList.add('no-words-yet', 'display-3', 'text-muted');
    emptyList.append('Здесь нет слов');
    return parentContainer.append(emptyList);
  }

  createListOfWords(tabId, decodedDataArr, wordsConfig) {
    const parentContainer = document.getElementById(tabId);
    parentContainer.innerHTML = '';
    if (decodedDataArr.length === 0) {
      this.createNoWordsWindow(tabId);
    }
    const container = document.createElement('ul');
    for (let i = 0; i < decodedDataArr.length; i += 1) {
      container.innerHTML += (this.createCard(decodedDataArr[i], wordsConfig));
    }
    container.classList.add('list-group');
    return parentContainer.append(container);
  }

  init() {
    super.init();
    this.createListOfWords('active-words', this.selectAndDecodeDataFromBackend('active', this.words), activeWordsConfig);
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.hasClass('nav-link')) {
      const typeOfWordsId = clickedElement.$el.href.slice((clickedElement.$el.href.indexOf('#')) + 1);
      if (this.typeOfWordsId !== typeOfWordsId) {
        const PrefixOfTypeOfConfig = typeOfWordsId.slice(0, typeOfWordsId.indexOf('-'));
        let typeOfConfig = PrefixOfTypeOfConfig === 'active' ? activeWordsConfig : difficultWordsConfig;
        if (PrefixOfTypeOfConfig === 'deleted') {
          typeOfConfig = deletedWordsConfig;
        }
        this.createListOfWords(typeOfWordsId,
          this.selectAndDecodeDataFromBackend(PrefixOfTypeOfConfig, this.words),
          typeOfConfig);
        this.typeOfWordsId = typeOfWordsId;
      }
    }

    if (clickedElement.hasClass('audio-btn')) {
      const audioTagId = clickedElement.$el.id.slice(0, clickedElement.$el.id.indexOf('Button'));
      document.getElementById(audioTagId).play().catch(() => true);
    }

    if (event.target.dataset.systembutton) {
      const currentCard = event.target.closest('.list-group-item');
      const el = this.words[currentCard.dataset.arrposition];
      if (event.target.dataset.systembutton === 'active') {
        el.userWord.optional.status = 'deleted';
      } else {
        el.userWord.optional.status = 'active';
      }
      this.options.api.updateUserWord(el._id, el.userWord)
        .then(() => {
          currentCard.classList.add('d-none');
          currentCard.classList.remove('list-group-item');
          // вставка окна "нет слов"
          const currentParentContainer = event.target.closest('.tab-pane');
          const allLiShown = currentParentContainer.querySelectorAll('.list-group-item');
          if (allLiShown.length === 0) {
            this.createNoWordsWindow(currentParentContainer.id);
          }
        })
        .catch(() => {
          currentCard.classList.add('p-0');
          currentCard.firstChild.nextElementSibling.classList.remove('d-none');
        });
    }

    if (clickedElement.hasClass('accept-error-btn')) {
      clickedElement.closest('.list-group-error-window').classList.add('d-none');
      clickedElement.closest('.list-group-item').classList.remove('p-0');
    }
  }

  toHTML() {
    return createVocabularyHTML().trim();
  }
}
