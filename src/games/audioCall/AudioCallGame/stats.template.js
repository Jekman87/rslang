export default function createAudioCallStats() {
  return `
    <div class="container bg-light py-4 stat-container">
      <h5 class="d-flex justify-content-center mb-5">Результат раунда</h5>
      <div class="container mistake-container">
        <p class="font-weight-bolder">Ошибся <span class="badge badge-danger ml-1 span-mistakes"></span></p>
      </div>
      <div class="container correct-container mt-3 mb-4">
        <p class="font-weight-bolder">Ответил верно <span class="badge badge-success ml-1 span-correct"></span></p>
      </div>
      <div class="container statistic-buttons d-flex justify-content-around">
        <button class="btn btn-primary statistic-button" type="button" data-event="new-game">
          Новая игра
        </button>
        <button class="btn btn-primary statistic-button" type="button" data-event="long-time-statistic">
          История игр
        </button>
        <button class="btn btn-primary statistic-button" type="button" data-event="close">
          На главную
        </button>
      </div>
    </div>
    <div class="container bg-light py-4 long-stat-container d-none">
      <h5 class="d-flex justify-content-center mb-4">История игр</h5>
      <div class="long-stat-results"></div>
      <div class="container statistic-buttons d-flex justify-content-around">
        <button class="btn btn-primary statistic-button" type="button" data-event="back-to-short-stat">
          Вернуться
        </button>
      </div>
    </div>
    `;
}
