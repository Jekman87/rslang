export default function createSettingsHTML() {
  return `
  <div class="container mt-3">
  <div class="jumbotron mb-0">
    <h1 class="display-4 text-primary mb-3"><i class="fas fa-cog mr-3"></i>Мои настройки</h1>
    <div class="row d-flex flex-column flex-md-row mb-3">
      <div class="col-12 col-md-6 d-flex flex-column justify-content-between px-md-2 px-lg-3">
        <div class="card border-primary mb-2 mb-md-0">
          <div class="card-header">
            <h4 class="card-title text-primary"><i class="fas fa-user-graduate mr-2"></i>Обучение</h4>
          </div>
          <div class="card-body">
            <!-- <h4 class="card-title">Обучение</h4> -->
            <div class="form-group">
              <div class="d-flex flex-column-reverse flex-lg-row align-items-start  align-items-xl-baseline mb-2 mb-lg-1">
                <p class="d-flex justify-content-start align-items-baseline mb-lg-1">
              <input type="text" class="form-control" id="wordsPerDay" style="width: 4rem" value="20">шт</p>
                <label class="col-form-label col-12 col-lg-9" for="wordsPerDay">Количество новых слов в день</label>

              </div>
              <div class="d-flex flex-column-reverse flex-lg-row align-items-start align-items-lg-end  align-items-xl-baseline mb-2">
              <p class="d-flex justify-content-start align-items-baseline">
                <input type="text" class="form-control" id="cardsPerDay" style="width: 4rem" value="50">шт</p>
                <label class="col-form-label col-12 col-lg-9" for="cardsPerDay">Максимальное количество карточек в день</label>

              </div>
              <div class="custom-control custom-radio mb-2 mb-md-3 mb-xl-2">
                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" checked="">
                <label class="custom-control-label" for="customRadio1">Изучать слова вперемешку</label>
              </div>
              <div class="custom-control custom-radio mb-2 mb-md-3 mb-xl-2">
                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="customRadio2">Изучать только новые слова</label>
              </div>
              <div class="custom-control custom-radio mb-2 mb-md-3 mb-xl-2">
                <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="customRadio3">Повторить изучаемые слова</label>
              </div>
              <div class="custom-control custom-radio mb-2 mb-md-3 mb-xl-2">
                <input type="radio" id="customRadio4" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="customRadio4">Повторить сложные слова</label>
              </div>
            </div>
          </div>
        </div>
        <div class="card border-primary mb-2 mb-md-0">
          <div class="card-header">
            <h4 class="card-title text-primary"><i class="fas fa-book mr-2"></i> Словарь</h4>
          </div>
          <div class="card-body">
            <div class="custom-control custom-checkbox mb-2 mb-md-3 mb-xl-2">
              <input type="checkbox" class="custom-control-input" id="customCheck1" checked="">
              <label class="custom-control-label" for="customCheck1">Показывать пояснение слова</label>
            </div>
            <div class="custom-control custom-checkbox mb-2 mb-md-3 mb-xl-2">
              <input type="checkbox" class="custom-control-input" id="customCheck2" checked="">
              <label class="custom-control-label" for="customCheck2">Показывать пример</label>
            </div>
            <div class="custom-control custom-checkbox mb-2 mb-md-3 mb-xl-2">
              <input type="checkbox" class="custom-control-input" id="customCheck3" checked="">
              <label class="custom-control-label" for="customCheck3">Показывать транскрипцию</label>
            </div>
            <div class="custom-control custom-checkbox mb-2 mb-md-3 mb-xl-2">
              <input type="checkbox" class="custom-control-input" id="customCheck4" checked="">
              <label class="custom-control-label" for="customCheck4">Показывать картинку-ассоциацию</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 px-md-2 px-lg-3">
        <div class="card border-primary">
          <div class="card-header">
            <h4 class="card-title text-primary"><i class="fas fa-list-alt mr-2"></i>Карточка</h4>
          </div>
          <div class="card-body">
            <div class="form-group">
              <fieldset>
                <legend><h4><small class="text-muted">Выберите хотя бы 1 из 3 пунктов:</small></h4></legend>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch1" checked="">
                  <label class="custom-control-label" for="customSwitch1">Показывать перевод слова</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch2" checked="">
                  <label class="custom-control-label" for="customSwitch2">Показывать предложение с объяснением
                    слова</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch3" checked="">
                  <label class="custom-control-label" for="customSwitch3">Показывать предложение с примером</label>
                </div>
              </fieldset>
              <hr>
              <fieldset class="p-1">
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch4" checked="">
                  <label class="custom-control-label" for="customSwitch4">Показывать транскрипцию</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch5" checked="">
                  <label class="custom-control-label" for="customSwitch5">Показывать картинку-ассоциацию</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch6" disabled="">
                  <label class="custom-control-label" for="customSwitch6">Показывать перевод слова после
                    ответа</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch7" checked="">
                  <label class="custom-control-label" for="customSwitch7">Показывать перевод предложения с
                    объяснением</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch8" checked="">
                  <label class="custom-control-label" for="customSwitch8">Показывать перевод предложения с
                    примером</label>
                </div>

                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch9">
                  <label class="custom-control-label" for="customSwitch9">Включить автовоспроизведение звука после
                    ответа</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch10" checked="">
                  <label class="custom-control-label" for="customSwitch10">Показывать кнопку "Показать ответ"</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch11" checked="">
                  <label class="custom-control-label" for="customSwitch11">Показывать кнопку "Удалить"</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch12" checked="">
                  <label class="custom-control-label" for="customSwitch12">Показывать кнопку "Добавить в
                    сложные"</label>
                </div>
                <div class="custom-control custom-checkbox mb-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch13" checked="">
                  <label class="custom-control-label" for="customSwitch13">Показывать кнопки оценки сложности
                    карточки</label>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-lg-flex justify-content-lg-between">

    <button class="col-12 col-lg-3 btn btn-primary btn-lg mb-3 mb-lg-0" href="#" role="button">Применить</button>
    <button class="col-12 col-lg-8 btn btn-outline-primary btn-lg" href="#" role="button">Сбросить до стандартных настроек</button>
    </div>
  </div>
    `;
}
