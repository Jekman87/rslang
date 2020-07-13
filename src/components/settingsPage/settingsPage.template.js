export default function createSettingsHTML() {
  return `
  <div class="container mt-3">
  <div class="jumbotron mb-0">
    <h1 class="display-4 mb-3"><i class="fas fa-cog mr-2"></i>Мои настройки</h1>
    <div class="row d-flex flex-column flex-md-row mb-3">
      <div class="col-12 col-md-6 d-flex flex-column justify-content-between px-md-2 px-lg-3">
        <div class="card border-primary mb-2 mb-md-0">
          <div class="card-header bg-info">
            <h4 class="card-title"><i class="fas fa-user-graduate mr-2"></i>Обучение</h4>
          </div>
          <div class="card-body">
            <div class="form-group">
              <div class="d-flex flex-column-reverse flex-lg-row align-items-start  align-items-xl-baseline mb-2 mb-lg-1">
                <p class="d-flex justify-content-start align-items-baseline mb-lg-1">
              <input type="text" class="form-control mr-1 text-primary" id="settingsPageWordsPerDay" title="Карточек должно быть минимум в 2,5 раза больше чем новых слов" style="width: 4rem" value="" autocomplete="off" maxlength="3">шт</p>
                <label class="col-form-label col-12 col-lg-9" for="settingsPageWordsPerDay">Количество новых слов в день<span class="text-muted"> (от 1 до 200)</span></label>

              </div>
              <div class="d-flex flex-column-reverse flex-lg-row align-items-start align-items-lg-end  align-items-xl-baseline mb-2">
              <p class="d-flex justify-content-start align-items-baseline">
                <input type="text" class="form-control mr-1 text-primary" id="settingsPageCardsPerDay" title="Карточек должно быть минимум в 2,5 раза больше чем новых слов" style="width: 4rem" value="" autocomplete="off" maxlength="3">шт</p>
                <label class="col-form-label col-12 col-lg-9" for="settingsPageCardsPerDay">Максимальное количество карточек в день<span class="text-muted"> (от 3 до 500)</span></label>

              </div>
              <div class="custom-control custom-radio mb-2 mb-md-3 mb-lg-2">
                <input type="radio" id="settingsPageMixedTraining" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="settingsPageMixedTraining">Изучать слова вперемешку</label>
              </div>
              <div class="custom-control custom-radio mb-2 mb-md-3 mb-lg-2">
                <input type="radio" id="settingsPageOnlyNewWordsTraining" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="settingsPageOnlyNewWordsTraining">Изучать только новые слова</label>
              </div>
              <div class="custom-control custom-radio mb-2 mb-md-3 mb-lg-2">
                <input type="radio" id="settingsPageOnlyOldWordsTraining" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="settingsPageOnlyOldWordsTraining">Повторить изучаемые слова</label>
              </div>
              <div class="custom-control custom-radio mb-2 mb-md-3 mb-lg-2">
                <input type="radio" id="settingsPageOnlyDifficultWordsTraining" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="settingsPageOnlyDifficultWordsTraining">Повторить сложные слова</label>
              </div>
            </div>
          </div>
        </div>
        <div class="card border-primary mb-2 mb-md-0">
          <div class="card-header bg-success">
            <h4 class="card-title"><i class="fas fa-book mr-2"></i> Словарь</h4>
          </div>
          <div class="card-body">
            <div class="custom-control custom-checkbox mb-2 mb-md-3 mb-xl-2">
              <input type="checkbox" class="custom-control-input" id="settingsPageVocabularyExplanation">
              <label class="custom-control-label" for="settingsPageVocabularyExplanation">Показывать пояснение слова</label>
            </div>
            <div class="custom-control custom-checkbox mb-2 mb-md-3 mb-xl-2">
              <input type="checkbox" class="custom-control-input" id="settingsPageVocabularyExample">
              <label class="custom-control-label" for="settingsPageVocabularyExample">Показывать пример</label>
            </div>
            <div class="custom-control custom-checkbox mb-2 mb-md-3 mb-xl-2">
              <input type="checkbox" class="custom-control-input" id="settingsPageVocabularyTranscription">
              <label class="custom-control-label" for="settingsPageVocabularyTranscription">Показывать транскрипцию</label>
            </div>
            <div class="custom-control custom-checkbox mb-2 mb-md-3 mb-xl-2">
              <input type="checkbox" class="custom-control-input" id="settingsPageVocabularyImage">
              <label class="custom-control-label" for="settingsPageVocabularyImage">Показывать картинку-ассоциацию</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 px-md-2 px-lg-3">
        <div class="card border-primary">
          <div class="card-header bg-warning">
            <h4 class="card-title"><i class="fas fa-list-alt mr-2"></i><span>Карточка</span></h4>
          </div>
          <div class="card-body">
            <div class="form-group">
              <fieldset>
                <legend><h4><small class="text-muted" id="warning-heading">Выберите хотя бы 1 из 3 пунктов:</small></h4></legend>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardTranslation">
                  <label class="custom-control-label" for="settingsPageCardTranslation">Показывать перевод слова</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardExplanation">
                  <label class="custom-control-label" for="settingsPageCardExplanation">Показывать предложение с объяснением
                    слова</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardExample">
                  <label class="custom-control-label" for="settingsPageCardExample">Показывать предложение с примером</label>
                </div>
              </fieldset>
              <hr>
              <fieldset class="p-1">
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardTranscription">
                  <label class="custom-control-label" for="settingsPageCardTranscription">Показывать транскрипцию</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardImage">
                  <label class="custom-control-label" for="settingsPageCardImage">Показывать картинку-ассоциацию</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardTranslationAfterSuccess">
                  <label class="custom-control-label" for="settingsPageCardTranslationAfterSuccess">Показывать перевод слова после
                    ответа</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardExplanationTranslation">
                  <label class="custom-control-label" for="settingsPageCardExplanationTranslation">Показывать перевод предложения с
                    объяснением</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardExampleTranslation">
                  <label class="custom-control-label" for="settingsPageCardExampleTranslation">Показывать перевод предложения с
                    примером</label>
                </div>

                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardAutoSound">
                  <label class="custom-control-label" for="settingsPageCardAutoSound">Включить автовоспроизведение звука после
                    ответа</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardAnswerButton">
                  <label class="custom-control-label" for="settingsPageCardAnswerButton">Показывать кнопку "Показать ответ"</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardDeleteButton">
                  <label class="custom-control-label" for="settingsPageCardDeleteButton">Показывать кнопку "Удалить"</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardDifficultWordsButton">
                  <label class="custom-control-label" for="settingsPageCardDifficultWordsButton">Показывать кнопку "Добавить в
                    сложные"</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="settingsPageCardFeedbackButtons">
                  <label class="custom-control-label" for="settingsPageCardFeedbackButtons">Показывать кнопки оценки сложности
                    карточки</label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-lg-flex justify-content-lg-end">

    <div class="col-lg-6"><button class="col-12 btn btn-danger btn-lg mb-3 mb-lg-0" href="#" role="button" id="settingsPageResetButton">Сбросить до стандартных настроек</button></div>
    <div class="col-lg-6"><button class="col-12 btn btn-primary btn-lg" href="#" role="button" id="settingsPageApplyButton">Применить</button></div>
    </div>
  </div>
    `;
}
