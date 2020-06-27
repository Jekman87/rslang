export default function createMainGameHTML() {
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
                    <img src="https://raw.githubusercontent.com/irinainina/rslang-data/master/files/01_0009.jpg" class="card-img" alt="img">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <p class="card-text">Введите слово на англ</p>
                      <p class="card-text">Скрытый спан со словом</p>
                      <input type="text" class="form-control">
                      <div class="row">
                        <div class="col-6">
                          <p class="card-text">Перевод слова</p>
                        </div>
                        <div class="col-6">
                          <p class="card-text">Тренскрипция слова</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="card-text">Предложение с примером длинное. Предложение с примером длинное.</p>
              <p class="card-text">Перевод редложения с примером длинное. Перевод редложения с примером длинное.</p>
              <p class="card-text">Предложение с определением длинное. Предложение с определением длинное.</p>
              <p class="card-text">Перевод редложения с определением длинное. Перевод редложения с определением длинное.</p>
            </div>
            <div class="card-footer">
              <i class="fas fa-volume-mute"></i>
              <button type="button" class="btn btn-primary">Удалить</button>
              <button type="button" class="btn btn-secondary">Снова</button>
              <button type="button" class="btn btn-success">Трудно</button>
              <button type="button" class="btn btn-info">Хорошо</button>
              <button type="button" class="btn btn-warning">Легко</button>
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
        <div class="col-1 text-center">50</div>
      </div>
    </div>
  `;
}
