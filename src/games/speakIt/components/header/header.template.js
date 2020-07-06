function createOptions(count) {
  let container = '';
  for (let i = 0; i < count; i += 1) {
    container += `<option value="${i}">${i + 1}</option>`;
  }
  return container;
}

function createOptionsRound(count) {
  let container = '';
  for (let i = 0; i < count; i += 1) {
    container += `
    <option value="${i}-0">${i + i + 1}</option>
    <option value="${i}-1">${i + i + 2}</option>
    `;
  }
  return container.trim();
}

export default function createHeaderHTML() {
  return `
  <div class="header-content d-flex flex-column justify-content-center align-items-center mt-3">
    <nav class="nav flex-column">
    <div class="row justify-content-center">
    <div class="form-group mr-2">
      <h5><label for="gameLevel" class="text-primary"><i class="fas fa-layer-group"></i><strong> Уровень(1-6)</strong></label></h5>
      <select class="form-control" id="gameLevel">
        ${createOptions(6)}
      </select>
    </div>
    <div class="form-group mr-2">
      <h5><label for="gameRound" class="text-primary"><i class="fas fa-object-group"></i><strong> Раунд(1-60)</strong></label></h5>
      <select class="form-control" id="gameRound">
      ${createOptionsRound(30)}
      </select>
    </div>
    </div> 
    </nav>
    <div class="buttons-container d-flex justify-content-center mt-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary main-btn" data-type="results">
          <i class="fas fa-poll-h" data-type="results" data-type="results"></i> Результат
        </button>
        <button type="button" class="btn btn-secondary main-btn" data-type="history">
          <i class="fas fa-history" aria-hidden="true" data-type="history"></i> История игр
        </button>
        <button type="button" class="btn btn-secondary main-btn" data-type="exit">
        <i class="fas fa-power-off" data-type="exit"></i> Выход
        </button>
      </div>
    </div>
    <div class="buttons-container d-flex justify-content-center mt-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-warning" data-type="restart">
        <i class="fas fa-retweet" data-type="restart"></i> Рестарт
        </button>
        <button type="button" class="btn btn-warning" data-type="speak">
          <i class="fas fa-microphone" aria-hidden="true" data-type="speak"></i> Говорить
        </button>
        <button type="button" class="btn btn-warning d-none" data-type="finish">
         <i class="fas fa-ban" aria-hidden="true" data-type="finish"></i> Завершить раунд
        </button>
      </div>
    </div>
  </div>
  `;
}
