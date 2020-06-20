export default function createResultsHTML() {
  return `
  <div class="results-content h-100 d-flex justify-content-center align-items-center">
    <div class="results-container w-75 d-flex flex-column justify-content-center  m-auto p-5 border border-primary">
      <p class="errors">Ошибок <span class="errors-num text-danger">3</span></p>
      <div class="errors-item mb-3">
      </div>
      <p class="succes">Знаю <span class="succes-num text-success">7</span></p>
      <div class="succes-item mb-3">
      </div>
      <div class="buttons-container d-flex justify-content-center">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-outline-primary">
          <i class="fas fa-undo"></i> Return
          </button>
          <button type="button" class="btn btn-outline-primary">
          <i class="fas fa-gamepad"></i> New Game
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}
