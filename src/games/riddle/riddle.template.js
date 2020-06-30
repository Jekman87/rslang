export default function createGameField() {
  return `
    <div class="riddle__intro">
    <div class="riddle__name"><h2>ЗАГАДКА</h2><h2>ОТГАДКА</h2></div>
      <p>Задействуй все свои знания и кругозор<br> для решения лучших загадок со всего мира.</p>
      <button type="button" class="btn btn-outline-success" data-click="start">Приступить</button>
    </div>

    <div class="main-sp">
      <div class="spinner">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
      </div>
    </div>

    <div class="riddle-app">
      <div class="riddle-main-container">
        <header class="riddle-header">

          <div class="difficulty-level">
            <span>Level</span>
            <button type="button" class="btn btn-outline-success button" data-click="minus-level">-</button>
              <input type="number" min="1" max="6" value="1" readonly class="input-level">
            <button type="button" class="btn btn-outline-success button" data-click="plus-level">+</button>
          </div>

          <div class="difficulty-page">
            <span>Page</span>
            <button type="button" class="btn btn-outline-success button" data-click="minus-page">-</button>
              <input type="number" min="1" max="15" value="1" readonly class="input-page">
            <button type="button" class="btn btn-outline-success button" data-click="plus-page">+</button>
          </div>

          <button type="button" class="btn btn-outline-success button" data-click="start-game">Start</button>

          <button class="btn btn-outline-danger button">
            <i class="fa fa-times icon-parameters" aria-hidden="true" data-click="home"></i>
          </button>
        </header>

        <div class="riddle-prompts">
          <button type="button" class="btn btn-outline-success button" data-click="show-options">
            <i class="fas fa-eye" data-click="show-options"></i>
          </button>
          <button type="button" class="btn btn-outline-success button" data-click="remove-wrong">50/50</button>
          <button type="button" class="btn btn-outline-success button" data-click="show-translate">
            <i class="fas fa-language" data-click="show-translate"></i>
          </button>
        </div>

        <div class="riddle-container">
          <div class="riddle-block"></div>
          <div class="translate-block hide-prompt"></div>

          <form class="answer-form">
            <input class="answer-input" type="text" placeholder="Enter your answer here..." name="search-area"
              autocomplete="off">
            <button type="button" class="btn btn-outline-success button" data-click="...">Check</button>
          </form>

          <div class="answer-blocks hide-prompt">
            <div class="answer-block"></div>
            <div class="answer-block"></div>
            <div class="answer-block"></div>
            <div class="answer-block"></div>
          </div>
        </div>


      </div>
    </div>

  `;
}
