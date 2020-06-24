export default function createResultsHTML() {
  return `
  <!-- The Modal -->
  <div class="modal" id="results">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
  
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Results</h4>
        </div>
  
        <!-- Modal body -->
        <div class="modal-body">
          <p class="errors">Ошибок <span class="errors-num text-danger">3</span></p>
          <div class="errors-item mb-3">
          </div>
          <p class="succes">Знаю <span class="succes-num text-success">7</span></p>
          <div class="succes-item mb-3">
          </div>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-primary" data-target="return">
          <i class="fas fa-undo"></i> Return
          </button>
          <button type="button" class="btn btn-success" data-target="newgame">
          <i class="fas fa-gamepad"></i> New Game
          </button>
        </div>
  
      </div>
    </div>
  `;
}
