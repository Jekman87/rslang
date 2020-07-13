import { FILE_URL } from '../../constants/constants';
// высчитывать интервалы

export default function createMainGameHTML(dataForApp) {
  const { studiedСardNum } = dataForApp.state;
  const word = dataForApp.userCards[studiedСardNum];
  const settingsOptional = dataForApp.settings.optional;
  let progress = 1;

  if (word.userWord) {
    progress = word.userWord.optional.progress;
  }

  return `
    <div class="container mt-3">
      <div class="jumbotron pt-4">
        <h1 class="text-primary text-center mb-3">
          <i class="fas fa-graduation-cap"></i>
          Тренировка
        </h1>
        <div class="row justify-content-center no-gutters mt-5">
          <div class="col-1">
            <div class="navigate-button prev">
              <i class="fas fa-chevron-left ${studiedСardNum === 0 ? 'arrow-disabled' : ''}" data-name="prev-btn"></i>
            </div>
          </div>
          <div class="col-10 col-md-8">
            <div class="card">
              <div class="card-header">
                <button type="button" class="btn btn-info m-2" data-name="volume-btn">
                  <i class="fas fa-volume-up ${settingsOptional.autoSound ? '' : 'd-none'}"></i>
                  <i class="fas fa-volume-mute ${!settingsOptional.autoSound ? '' : 'd-none'}"></i>
                </button>
                <button type="button" class="btn btn-secondary m-2 ${settingsOptional.deleteButton ? '' : 'd-none'}" data-name="delete-btn">Удалить</button>
                <button type="button" class="btn btn-secondary m-2 ${settingsOptional.difficultWordsButton ? '' : 'd-none'}" data-name="difficult-btn">Сложное</button>
                <button type="button" class="btn btn-secondary m-2 float-right ${settingsOptional.answerButton ? '' : 'd-none'}" data-name="show-answer-btn">Показать ответ</button>
              </div>
              <div class="card-header">
                <span>Прогресс слова: <span id="word-progress">${progress}</span></span>
              </div>
              <div class="card-body">
                <div class="card mb-3">
                  <div class="row no-gutters">
                    <div class="col-md-4 image-container">
                      <img src="${FILE_URL}/${word.image}" class="card-img ${settingsOptional.cardImage ? '' : 'd-none'}" id="word-image" alt="img">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <p class="card-text">Введите слово на англ</p>
                        <p class="card-text" id="word-en">${word.word}</p>
                        <input type="text" class="form-control" id="word-input" autocomplete="off">
                        <div class="row">
                          <div class="col-6">
                            <p class="card-text font-weight-bold ${settingsOptional.cardTranslation ? '' : 'd-none'}" id="word-translate">${word.wordTranslate}</p>
                          </div>
                          <div class="col-6">
                            <p class="card-text ${settingsOptional.cardTranscription ? '' : 'd-none'}" id="word-transcription">${word.transcription}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="card-text ${settingsOptional.cardExample ? '' : 'd-none'}" id="word-example">${word.textExample}</p>
                <p class="card-text font-weight-light ${settingsOptional.cardExampleTranslation ? '' : 'd-none'}" id="word-example-translate">${word.textExampleTranslate}</p>
                <p class="card-text ${settingsOptional.cardExplanation ? '' : 'd-none'}" id="word-meaning">${word.textMeaning}</p>
                <p class="card-text font-weight-light ${settingsOptional.cardExplanationTranslation ? '' : 'd-none'}" id="word-meaning-translate">${word.textMeaningTranslate}</p>
              </div>
              <div class="card-footer d-flex justify-content-center invisible">
                <button type="button" class="btn btn-danger m-2 text-nowrap" data-name="again-btn">Снова (1 мин)</button>
                <button type="button" class="btn btn-warning m-2 text-nowrap" data-name="hard-btn">Трудно (10 мин)</button>
                <button type="button" class="btn btn-success m-2 text-nowrap" data-name="good-btn">Хорошо (1 день)</button>
                <button type="button" class="btn btn-info m-2 text-nowrap" data-name="easy-btn">Легко (4 дня)</button>
              </div>
            </div>
          </div>
          <div class="col-1">
            <div class="navigate-button next">
              <i class="fas fa-chevron-right ${studiedСardNum + 1 === settingsOptional.cardsPerDay ? 'arrow-disabled' : ''}" data-name="next-btn"></i>
            </div>
          </div>
        </div>
        <div class="row justify-content-center align-items-center no-gutters mt-3">
          <div class="col-1 text-center" id="studied-card-num">${studiedСardNum}</div>
          <div class="col-10">
            <div class="progress bg-secondary">
              <div class="progress-bar bg-info" role="progressbar" style="width: ${((studiedСardNum) / settingsOptional.cardsPerDay) * 100}%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col-1 text-center" id="max-studied-cards">${dataForApp.userCards.length}</div>
        </div>
      </div>
    </div>
  `;
}
