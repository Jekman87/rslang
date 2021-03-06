import { FILE_URL } from '../../constants/constants';
import { getWordSpans } from './mainGame.utils';
import progressConfig from '../../constants/progress-config.constants';
// высчитывать интервалы

export default function createMainGameHTML(dataForApp) {
  const { studiedСardNum } = dataForApp.state;
  const word = dataForApp.userCards[studiedСardNum];
  const settingsOptional = dataForApp.settings.optional;
  let wordProgress = 1;

  if (word.userWord) {
    wordProgress = word.userWord.optional.progress;
  }

  const wordProgressbarBgColor = progressConfig.bgColor[wordProgress - 1];
  const wordProgressbarBarWidth = progressConfig.barWidth[wordProgress - 1];
  const wordProgressText = progressConfig.text[wordProgress - 1];

  const wordSpans = getWordSpans(word.word);
  console.log('Подсказка для проверяющих: ', word.word);

  const maxСards = dataForApp.userCards.length > settingsOptional.cardsPerDay
    ? settingsOptional.cardsPerDay : dataForApp.userCards.length;

  return `
    <div class="container mt-3">
      <div class="jumbotron">
        <h1 class="display-4 mb-3">
          <i class="fas fa-graduation-cap"></i>
          Тренировка
        </h1>
        <div class="row justify-content-center no-gutters mt-sm-2">
          <div class="col-1 left-arrow">
            <div class="navigate-button prev">
              <i class="fas fa-chevron-left ${studiedСardNum === 0 ? 'arrow-disabled' : ''} text-primary" data-name="prev-btn"></i>
            </div>
          </div>
          <div class="col-12 col-sm-10 col-md-8">
            <div class="card card-shadow border-0">
              <div class="card-header d-flex justify-content-between">
                <div>
                  <button type="button" class="btn btn-info my-sm-2 mr-sm-2" data-name="volume-btn">
                    <i class="fas fa-volume-up ${settingsOptional.autoSound ? '' : 'd-none'}"></i>
                    <i class="fas fa-volume-mute ${!settingsOptional.autoSound ? '' : 'd-none'}"></i>
                  </button>
                  <button type="button" class="btn btn-info my-sm-2" data-name="keyboard-btn" id="keyboard-btn">
                    <i class="fas fa-keyboard"></i>
                  </button>
                </div>
                <div class="d-none" id="setting-words-top">
                  <button type="button" class="btn btn-secondary my-sm-2 justify-self-end ${settingsOptional.difficultWordsButton ? '' : 'd-none'}" data-name="difficult-btn" id="difficult-btn">
                    <i class="fas fa-chess"></i><span class="button-text ml-1">Сложное</span></button>
                  <button type="button" class="btn btn-secondary my-sm-2 ml-sm-2 justify-self-end ${settingsOptional.deleteButton ? '' : 'd-none'}" data-name="delete-btn">
                    <i class="fas fa-trash"></i><span class="button-text ml-1">Удалить</span></button>
                </div>
              </div>
              <div class="card-body">
                <div class="progress-wrapper d-flex col-12 mb-3 justify-content-start align-items-center px-0">
                  <div class="progress progress-area d-flex justify-content-between">
                    <div class="progress-bar progress-bar-striped ${wordProgressbarBgColor}" role="progressbar" style="width: ${wordProgressbarBarWidth}%"
                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" id="word-progressbar"></div>
                  </div>
                    <small class="progress-info ml-2" id="word-progresText">${wordProgressText}</small>
                </div>
                <div class="card mb-3">
                  <div class="row no-gutters ${settingsOptional.cardImage ? 'justify-content-lg-between' : 'justify-content-lg-center'}">
                    <div class="col-lg-6 order-lg-2 image-container ${settingsOptional.cardImage ? '' : 'd-none'}">
                      <div class="image-responsive">

                      </div>
                      <img src="${FILE_URL}/${word.image}" class="card-img " id="word-image" alt="img">
                    </div>
                    <div class="order-lg-1 col-lg-6">
                      <div class="card-body px-1 px-sm-3 text-center">
                        <p class="card-text text-info"><i>Введите английское слово:</i></p>
                        <span class="input-container">
                          <span class="background hidden" id="word-background">
                            ${wordSpans}
                          </span>
                          <input class="answer-input form-control" id="word-input" type="text" maxlength="50" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                        </span>
                        <input type="text" class="form-control d-none" autocomplete="off">
                        <div class="row justify-content-center mt-2">
                          <p class="card-text font-weight-bold ${settingsOptional.cardTranslation ? '' : 'd-none'}" id="word-translate"><i>${word.wordTranslate}</i></p>
                        </div>
                        <div class="row justify-content-center mt-2 ${settingsOptional.cardTranscription ? '' : 'd-none'}">
                          <p class="card-text" id="word-transcription">${word.transcription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="${settingsOptional.cardExample || settingsOptional.cardExampleTranslation ? 'd-flex' : 'd-none'} mb-3">
                  <div class="icon-container text-center text-info mr-1 d-none d-sm-block"><i class="fas fa-lightbulb"></i>
                  </div>
                  <div>
                    <div class="card-text text-primary font-weight-bold ${settingsOptional.cardExample ? '' : 'd-none'}" id="word-example">${word.textExample}</div>
                    <div class="card-text ${settingsOptional.cardExampleTranslation ? '' : 'd-none'}" id="word-example-translate"><i>${word.textExampleTranslate}</i></div>
                  </div>
                </div>
                <div class="${settingsOptional.cardExplanation || settingsOptional.cardExplanationTranslation ? 'd-flex' : 'd-none'}">
                  <div class="icon-container text-center text-info mr-1 d-none d-sm-block"><i class="fas fa-graduation-cap d-none d-sm-inline"></i>
                  </div>
                  <div>
                    <div class="card-text text-primary font-weight-bold ${settingsOptional.cardExplanation ? '' : 'd-none'}" id="word-meaning">${word.textMeaning}</div>
                    <div class="card-text ${settingsOptional.cardExplanationTranslation ? '' : 'd-none'}" id="word-meaning-translate"><i>${word.textMeaningTranslate}</i></div>
                  </div>
                </div>
              </div>
              <div class="card-footer" style="position:relative">
                <div class="justify-content-center align-items-center ${settingsOptional.answerButton ? 'd-flex' : 'd-none'} ${settingsOptional.feedbackButtons ? 'show-answer-btn-container' : ''}" id="answer-button">
                  <button type="button" class="btn btn-primary" data-name="show-answer-btn">
                    <i class="fas fa-eye mr-1"></i>
                    Показать ответ
                  </button>
                </div>
                <div class="col-12 px-0 justify-content-between flex-wrap ${settingsOptional.feedbackButtons ? 'd-flex invisible' : 'd-none'}" id="feedback-buttons">
                  <button type="button" class="col-5 feedback-btn btn btn-danger my-2 text-nowrap" data-name="again-btn">Снова</button>
                  <button type="button" class="col-5 feedback-btn btn btn-warning my-2 text-nowrap" data-name="hard-btn">Трудно</button>
                  <button type="button" class="col-5 feedback-btn btn btn-success my-2 text-nowrap" data-name="good-btn">Хорошо</button>
                  <button type="button" class="col-5 feedback-btn btn btn-info my-2 text-nowrap" data-name="easy-btn">Легко</button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-1 right-arrow">
            <div class="navigate-button next">
              <i class="fas fa-chevron-right ${studiedСardNum + 1 === settingsOptional.cardsPerDay ? 'arrow-disabled' : ''}  text-primary" data-name="next-btn" id="next-btn"></i>
            </div>
          </div>
        </div>
        <div class="row justify-content-center align-items-center no-gutters mt-3">
          <div class="col-1 text-center" id="studied-card-num">${studiedСardNum}</div>
          <div class="col-10">
            <div class="progress bg-secondary">
              <div class="progress-bar bg-info" role="progressbar" id="cards-progressbar" style="width: ${((studiedСardNum) / maxСards) * 100}%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col-1 text-center" id="max-studied-cards">${maxСards}</div>
        </div>
      </div>
      <div id="keyboard-wrapper"></div>
    </div>
  `;
}
