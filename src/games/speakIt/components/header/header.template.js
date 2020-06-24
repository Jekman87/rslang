function createOptions(count) {
  let container = '';
  for (let i = 0; i < count; i += 1) {
    container += `<option value="${i}">${i + 1}</option>`;
  }
  return container;
}

export default function createHeaderHTML() {
  return `
  <div class="header-content d-flex flex-column justify-content-center align-items-center mt-3">
    <nav class="nav flex-column">
    <div class="row justify-content-center">
    <div class="form-group mr-2">
      <h5><label for="gameLevel" class="text-primary"><i class="fas fa-layer-group"></i><strong> Level</strong></label></h5>
      <select class="form-control" id="gameLevel">
        ${createOptions(6)}
      </select>
    </div>
    <div class="form-group mr-2">
      <h5><label for="gameRound" class="text-primary"><i class="fas fa-object-group"></i><strong> Round</strong></label></h5>
      <select class="form-control" id="gameRound">
      ${createOptions(30)}
      </select>
    </div>
    <div class="form-group">
      <h5><label for="gameRoundGroup" class="text-primary"><i class="fas fa-object-ungroup"></i><strong> Group</strong></label></h5>
      <select class="form-control" id="gameRoundGroup">
      ${createOptions(2)}
      </select>
    </div>
    </div> 
    </nav>
    <div class="buttons-container d-flex justify-content-center mt-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-warning" data-type="restart">
        <i class="fas fa-retweet"></i> Restart
        </button>
        <button type="button" class="btn btn-warning" data-type="speak">
          <i class="fas fa-microphone" aria-hidden="true"></i> Speak please
        </button>
        <button type="button" class="btn btn-warning" data-type="results">
        <i class="fas fa-poll-h"></i> Results
        </button>
        <button type="button" class="btn btn-warning" data-type="exit">
        <i class="fas fa-power-off"></i> Exit
        </button>
      </div>
    </div>
  </div>
  `;
}
