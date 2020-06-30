import { FILE_URL } from '../../constants/constants';

export default function createMainGameHTML(data) {
  const cardOptions = data.settings.optional;
  const word = data.dataForApp.userWords[0];

  return `
    <div class="container mt-3">
      <div class="row justify-content-center no-gutters mt-5">
        <div class="col-1">
          <div class="navigate-button prev">
            <i class="fas fa-chevron-left" data-name="prev-btn"></i>
          </div>
        </div>
        <div class="col-10 col-md-8">
          <div class="card">
            <div class="card-header">
              Уровень сложности слова (или другая инфа)
            </div>
            <div class="card-body">
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4 image-container">
                    <img src="${FILE_URL}/${word.image}" class="card-img ${cardOptions.isCardImage ? '' : 'd-none'}" id="word-image" alt="img">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <p class="card-text">Введите слово на англ</p>
                      <p class="card-text" id="word-en">Скрытый спан со словом: ${word.word}</p>
                      <input type="text" class="form-control" id="word-input">
                      <div class="row">
                        <div class="col-6">
                          <p class="card-text font-weight-bold ${cardOptions.isCardTranslation ? '' : 'd-none'}" id="word-translate">${word.wordTranslate}</p>
                        </div>
                        <div class="col-6">
                          <p class="card-text ${cardOptions.isCardTranscription ? '' : 'd-none'}" id="word-transcription">${word.transcription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="card-text ${cardOptions.isCardExample ? '' : 'd-none'}" id="word-example">${word.textExample}</p>
              <p class="card-text font-weight-light ${cardOptions.cardExampleTranslation ? '' : 'd-none'}" id="word-example-translate">${word.textExampleTranslate}</p>
              <p class="card-text ${cardOptions.isCardExplanation ? '' : 'd-none'}" id="word-meaning">${word.textMeaning}</p>
              <p class="card-text font-weight-light ${cardOptions.cardExplanationTranslation ? '' : 'd-none'}" id="word-meaning-translate">${word.textMeaningTranslate}</p>
            </div>
            <div class="card-footer d-flex justify-content-center ${cardOptions.areFeedbackButtons ? '' : 'd-none'}">
              <button type="button" class="btn btn-secondary m-2" data-name="again-btn">Снова</button>
              <button type="button" class="btn btn-success m-2" data-name="hard-btn">Трудно</button>
              <button type="button" class="btn btn-info m-2" data-name="good-btn">Хорошо</button>
              <button type="button" class="btn btn-warning m-2" data-name="easy-btn">Легко</button>
            </div>
            <div class="card-footer">
              <i class="fas fa-volume-mute" data-name="volume-btn"></i>
              <button type="button" class="btn btn-primary m-2 ${cardOptions.isDeleteButton ? '' : 'd-none'}" data-name="delete-btn">Удалить</button>
              <button type="button" class="btn btn-primary m-2 ${cardOptions.isDifficultWordsButton ? '' : 'd-none'}" data-name="difficult-btn">Сложные</button>
              <button type="button" class="btn btn-danger m-2 float-right ${cardOptions.isAnswerButton ? '' : 'd-none'}" data-name="show-answer-btn">Показать ответ</button>
            </div>
          </div>
        </div>
        <div class="col-1">
          <div class="navigate-button next">
            <i class="fas fa-chevron-right" data-name="next-btn"></i>
          </div>
        </div>
      </div>
      <div class="row justify-content-center align-items-center no-gutters mt-3">
        <div class="col-1 text-center">7</div>
        <div class="col-10">
          <div class="progress bg-secondary">
            <div class="progress-bar bg-info" role="progressbar" style="width: 15%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div class="col-1 text-center">${cardOptions.CardsPerDay}</div>
      </div>
    </div>
  `;
}
