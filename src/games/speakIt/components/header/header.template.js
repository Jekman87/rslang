export default function createHeaderHTML() {
  return `
  <div class="header-content d-flex flex-column justify-content-center align-items-center mt-3">
    <nav class="nav">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-info p-2" data-group="1">
          <input
            type="radio"
            name="options"
            id="option1"
            autocomplete="off"
            checked=""
          />
          <span class="fa-stack">
            <i class="fa fa-circle-o fa-stack-2x"></i>
            <strong class="fa-stack-1x">
              1
            </strong>
          </span>
        </label>
        <label class="btn btn-info p-2" data-group="2">
          <input
            type="radio"
            name="options"
            id="option2"
            autocomplete="off"
          />
          <span class="fa-stack">
            <i class="fas fa-circle-o fa-stack-2x"></i>
            <strong class="fa-stack-1x">
              2
            </strong>
          </span>
        </label>
        <label class="btn btn-info p-2" data-group="3">
          <input
            type="radio"
            name="options"
            id="option3"
            autocomplete="off"
          />
          <span class="fa-stack">
            <i class="fas fa-circle-o fa-stack-2x"></i>
            <strong class="fa-stack-1x">
              3
            </strong>
          </span>
        </label>
        <label class="btn btn-info p-2" data-group="4">
          <input
            type="radio"
            name="options"
            id="option4"
            autocomplete="off"
          />
          <span class="fa-stack">
            <i class="fas fa-circle-o fa-stack-1x"></i>
            <strong class="fa-stack-1x">
              4
            </strong>
          </span>
        </label>
        <label class="btn btn-info p-2" data-group="5">
          <input
            type="radio"
            name="options"
            id="option5"
            autocomplete="off"
          />
          <span class="fa-stack">
            <i class="fas fa-circle-o fa-stack-1x"></i>
            <strong class="fa-stack-1x">
              5
            </strong>
          </span>
        </label>
        <label class="btn btn-info p-2" data-group="6">
          <input
            type="radio"
            name="options"
            id="option6"
            autocomplete="off"
          />
          <span class="fa-stack">
            <i class="fas fa-circle-o fa-stack-2x"></i>
            <strong class="fa-stack-1x">
              6
            </strong>
          </span>
        </label>
      </div>
    </nav>
    <div class="buttons-container d-flex justify-content-center mt-3">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-warning">
        <i class="fas fa-retweet"></i> Restart
        </button>
        <button type="button" class="btn btn-warning">
          <i class="fas fa-microphone" aria-hidden="true"></i> Speak please
        </button>
        <button type="button" class="btn btn-warning">
        <i class="fas fa-poll-h"></i> Results
        </button>
        <button type="button" class="btn btn-warning">
        <i class="fas fa-power-off"></i> Exit
        </button>
      </div>
    </div>
  </div>
  `;
}
