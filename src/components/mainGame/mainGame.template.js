export default function createMainGameHTML(settings) {
  const options = settings.optional;
  console.log(options);
  return `
    <div class="container mt-3">
      <div class="row justify-content-center no-gutters mt-5">
        <div class="col-1">
          <div class="navigate-button prev">
            <i class="fas fa-chevron-left"></i>
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
                    <img src="https://raw.githubusercontent.com/irinainina/rslang-data/master/files/01_0009.jpg" class="card-img ${options.isCardImage ? '' : 'd-none'}" alt="img">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <p class="card-text">Введите слово на англ</p>
                      <p class="card-text">Скрытый спан со словом</p>
                      <input type="text" class="form-control">
                      <div class="row">
                        <div class="col-6">
                          <p class="card-text font-weight-bold ${options.isCardTranslation ? '' : 'd-none'}">Перевод слова</p>
                        </div>
                        <div class="col-6">
                          <p class="card-text ${options.isCardTranscription ? '' : 'd-none'}">Тренскрипция слова</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="card-text ${options.isCardExample ? '' : 'd-none'}">Предложение с примером длинное. Предложение с примером длинное.</p>
              <p class="card-text font-weight-light ${options.cardExampleTranslation ? '' : 'd-none'}">Перевод редложения с примером длинное. Перевод редложения с примером длинное.</p>
              <p class="card-text ${options.isCardExplanation ? '' : 'd-none'}">Предложение с определением длинное. Предложение с определением длинное.</p>
              <p class="card-text font-weight-light ${options.cardExplanationTranslation ? '' : 'd-none'}">Перевод редложения с определением длинное. Перевод редложения с определением длинное.</p>
            </div>
            <div class="card-footer d-flex justify-content-center ${options.areFeedbackButtons ? '' : 'd-none'}">
              <button type="button" class="btn btn-secondary m-2">Снова</button>
              <button type="button" class="btn btn-success m-2">Трудно</button>
              <button type="button" class="btn btn-info m-2">Хорошо</button>
              <button type="button" class="btn btn-warning m-2">Легко</button>
            </div>
            <div class="card-footer">
              <i class="fas fa-volume-mute"></i>
              <button type="button" class="btn btn-primary m-2 ${options.isDeleteButton ? '' : 'd-none'}">Удалить</button>
              <button type="button" class="btn btn-primary m-2 ${options.isDifficultWordsButton ? '' : 'd-none'}">Сложные</button>
              <button type="button" class="btn btn-danger m-2 float-right ${options.isAnswerButton ? '' : 'd-none'}">Показать ответ</button>
            </div>
          </div>
        </div>
        <div class="col-1">
          <div class="navigate-button next">
            <i class="fas fa-chevron-right"></i>
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
        <div class="col-1 text-center">${options.CardsPerDay}</div>
      </div>
    </div>
  `;
}
