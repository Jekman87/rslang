export default function createMainPageHTML() {
  return `
    <div class="container mt-3">
      <div class="jumbotron">
        <h1 class="display-4">RS Lang</h1>
        <p class="lead">Выучи английский или умри!</p>
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Статистика за сегодня</h5>
                <p class="card-text">Слов на сегодня: 15 из 30</p>
                <p class="card-text">Карточек на сегодня: 30 50</p>
                <a href="#" class="btn btn-primary">Подробнее</a>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Общая статистика</h5>
                <p class="card-text">Всего выучено слов: 550 из 3600</p>
                <p class="card-text">Всего карточек пройдено: 1256</p>
                <a href="#" class="btn btn-primary">Подробнее</a>
              </div>
            </div>
          </div>
        </div>
        <div class="progress bg-secondary mt-3">
          <div class="progress-bar bg-info" role="progressbar" style="width: 15%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <hr class="my-4">
        <p>Тренировка слов - это отличная возможность потренировать слова!)</p>
        <p class="lead">
          <a class="btn btn-primary btn-lg" href="#" role="button">Тренировка <i class="fas fa-long-arrow-alt-right"></i></a>
        </p>
      </div>
    </div>
  `;
}
