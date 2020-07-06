export default function createAudioCallStats() {
  return `
  
    <div class="container bg-light py-4 stat-container">
      <h5 class="d-flex justify-content-center mb-4">Результат раунда</h5>
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

    `;
}

/*
<div class="container word-container pl-0">
          <p class="">
            <i class="fas fa-play text-dark"></i>
            <span class="ml-2">Amount</span>
            <span class="text-muted ml-1">- Количество</span>
          </p>
        </div>

        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
          </div>
*/
