export default function createResultsHTML() {
  return `
  <dialog id="resultsDialog" class="p-0 m-auto" style="max-width: 600px; min-width: 320px">
    <div class="modal-dialog modal-dialog-scrollable m-0" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Результат</h5>
        </div>
        <div class="modal-body">
          <p class="errors">Ошибок: <span class="errors-num text-danger">0</span></p>
          <div class="error-items mb-3">

          </div>
          <p class="success">Правильно: <span class="success-num text-success">0</span></p>
          <div class="success-items mb-3">

          </div>
        </div>
        <div class="modal-footer">
        <button class="btn btn-outline-primary" data-target="resultsreturn">
          <i class="fas fa-undo" data-target="resultsreturn"></i> Назад
        </button>
        <button class="btn btn-success" data-target="continue">
          <i class="fas fa-arrow-circle-right" data-target="continue"></i> Следующий раунд
        </button>
        </div>
      </div>
    </div>
  </dialog>
  <dialog id="historyDialog" class="p-0 m-auto" style="max-width: 600px; min-width: 320px">
    <div class="modal-dialog modal-dialog-scrollable m-0" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">История игр</h5>
        </div>
        <div class="modal-body p-1">
          <div class="history-items mb-3">

          </div>
        </div>
        <div class="modal-footer">
        <button class="btn btn-outline-primary" data-target="historyreturn">
          <i class="fas fa-undo" data-target="historyreturn"></i> Назад
        </button>
        </div>
      </div>
    </div>
  </dialog>
  `;
}
