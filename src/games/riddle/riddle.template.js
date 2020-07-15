export default function createGameField() {
  return `
    <div class="riddle__intro">
    <div class="riddle__name"><h2>RIDDLE</h2><h2>RIDDLE</h2></div>
      <p>Задействуй знания английского языка и кругозор<br> для решения лучших загадок со всего мира.</p>
      <button type="button" class="btn btn-outline-secondary" data-click="start">Начать</button>
    </div>

    <div class="riddle-main-sp">
      <div class="riddle-spinner">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
      </div>
    </div>

    <div class="riddle-app">
      <div class="riddle-main-container">
        <header class="riddle-header">

          <div class="difficulty-level">
            <span>Уровень</span>
            <div>
              <button type="button" class="btn btn-outline-secondary riddle-button" data-click="minus-level">-</button>
                <input type="number" min="1" max="6" value="1" readonly class="input-level">
              <button type="button" class="btn btn-outline-secondary riddle-button" data-click="plus-level">+</button>
            </div>
          </div>

          <div class="difficulty-page">
            <span>Раунд</span>
            <div>
              <button type="button" class="btn btn-outline-secondary riddle-button" data-click="minus-page">-</button>
                <input type="number" min="1" max="15" value="1" readonly class="input-page">
              <button type="button" class="btn btn-outline-secondary riddle-button" data-click="plus-page">+</button>
            </div>
          </div>

          <button type="button" class="btn btn-outline-secondary riddle-button" data-click="start-game">Запустить игру</button>

          <button class="btn btn-outline-danger riddle-button" title="Вернуться на главную страницу" data-click="home">
            <i class="fa fa-times riddle-icon-parameters" aria-hidden="true" data-click="home"></i>
          </button>
        </header>

        <div class="riddle-prompts">
          <div>
            <button type="button" class="btn btn-outline-secondary riddle-button" title="Подсказка: показать ответы" data-click="show-options">
              <i class="fas fa-eye" data-click="show-options"></i>
            </button>
            <button type="button" class="btn btn-outline-secondary riddle-button" title="Подсказка: убрать два неправильных ответа" data-click="remove-wrong">50/50</button>
            <button type="button" class="btn btn-outline-secondary riddle-button" title="Подсказка: перевод предложения" data-click="show-translate">
              <i class="fas fa-language" data-click="show-translate"></i>
            </button>
          </div>
          <button type="button" class="btn btn-outline-secondary riddle-button riddle-mute" title="Отключить системные звуки" data-click="riddle-mute">
            <i class="fas fa-music sprint-icon-parameters riddle-mute" data-click="riddle-mute"></i>
          </button>
          <button type="button" class="btn btn-outline-secondary riddle-button riddle-unmute" title="Включить системные звуки" data-click="riddle-unmute">
            <i class="fas fa-music sprint-icon-parameters" data-click="riddle-unmute"></i>
            <i class="fas fa-slash sprint-icon-parameters riddle-line" data-click="riddle-unmute"></i>
          </button>

          <button type="button" class="btn btn-outline-secondary riddle-button riddle-stats" data-click="statistic">Статистика</button>
        </div>

        <div class="riddle-container">
          <div class="riddle-block">Выберите уровень/раунд игры и нажмите кнопку "Запустить игру"</div>
          <div class="riddle-translate-block riddle-hide-prompt"></div>

          <form class="riddle-answer-form">
            <input class="riddle-answer-input" type="text" placeholder="Введите ваш вариант ответа здесь..." name="search-area"
              autocomplete="off">
            <button type="button" class="btn btn-outline-secondary riddle-button" data-click="check">Проверить ответ</button>
            <button type="button" class="btn btn-outline-secondary riddle-button" data-click="pass">Не знаю</button>
          </form>

          <div class="riddle-answer-blocks riddle-hide-prompt">
            <div class="answer-block"></div>
            <div class="answer-block"></div>
            <div class="answer-block"></div>
            <div class="answer-block"></div>
          </div>
        </div>
        
      </div>
    </div>

    <div class="riddle-statistic-screen">
      <div class="riddle-statistic-blocks">

        <div class="riddle-points-result">Общая статистика</div>

        <div class="progress riddle-progress">
          <div class="progress-bar lvl-1" role="progressbar"></div>
          <div class="progress-bar lvl-2" role="progressbar"></div>
          <div class="progress-bar lvl-3" role="progressbar"></div>
          <div class="progress-bar lvl-4" role="progressbar"></div>
          <div class="progress-bar lvl-5" role="progressbar"></div>
          <div class="progress-bar lvl-6" role="progressbar"></div>
        </div>

        <div class="riddle-level-info riddle-level-1">
          <span>Уровень - 1:</span>
          <span class="riddle-answers-progress points-1">0/15</span>
          <span class="riddle-answers-progress percent-1">(0%)</span>
        </div>

        <div class="riddle-level-info riddle-level-2">
          <span>Уровень - 2:</span>
          <span class="riddle-answers-progress points-2">0/15</span>
          <span class="riddle-answers-progress percent-2">(0%)</span>
        </div>

        <div class="riddle-level-info riddle-level-3">
          <span>Уровень - 3:</span>
          <span class="riddle-answers-progress points-3">0/15</span>
          <span class="riddle-answers-progress percent-3">(0%)</span>
        </div>

        <div class="riddle-level-info riddle-level-4">
          <span>Уровень - 4:</span>
          <span class="riddle-answers-progress points-4">0/15</span>
          <span class="riddle-answers-progress percent-4">(0%)</span>
        </div>

        <div class="riddle-level-info riddle-level-5">
          <span>Уровень - 5:</span>
          <span class="riddle-answers-progress points-5">0/15</span>
          <span class="riddle-answers-progress percent-5">(0%)</span>
        </div>

        <div class="riddle-level-info riddle-level-6">
          <span>Уровень - 6:</span>
          <span class="riddle-answers-progress points-6">0/15</span>
          <span class="riddle-answers-progress percent-6">(0%)</span>
        </div>

        <div class='riddle-statistic-buttons'>
          <button class="btn btn-outline-secondary riddle-statistic-button" data-click="return">Вернуться к игре</button>
          <button class="btn btn-outline-secondary riddle-statistic-button" data-click="correct-answers">Отгадано</button>
          <button class="btn btn-outline-secondary riddle-statistic-button" data-click="wrong-answers">Не отгадано</button>
          <button class="btn btn-danger riddle-statistic-button" data-click="remove-statistic">Очистить статистику</button>
        </div>
      </div>

      <div class="riddle-statistic-blocks-correct">
        <div class="riddle-correct-container">
          <span>Уровень - 1:</span>
          <span class='riddle-correct-answer correct-a-1'>0</span>
        </div>
        <div class='correct-block correct-1'>
          <div class="riddle-statistic-block riddle-correct">
            <span>I've whiskers, I'm frisky. Whisk, little mice, lest I should catch you! Please stroke my back, Ill purr and won't scratch you.</span>
            <span>- Cat</span>
          </div>
        </div>

        <div class="riddle-correct-container">
          <span>Уровень - 2:</span>
          <span class='riddle-correct-answer correct-a-2'>0</span>
        </div>
        <div class='correct-block correct-2'></div>

        <div class="riddle-correct-container">
          <span>Уровень - 3:</span>
          <span class='riddle-correct-answer correct-a-3'>0</span>
        </div>
        <div class='correct-block correct-3'></div>

        <div class="riddle-correct-container">
          <span>Уровень - 4:</span>
          <span class='riddle-correct-answer correct-a-4'>0</span>
        </div>
        <div class='correct-block correct-4'></div>

        <div class="riddle-correct-container">
          <span>Уровень - 5:</span>
          <span class='riddle-correct-answer correct-a-5'>0</span>
        </div>
        <div class='correct-block correct-5'></div>

        <div class="riddle-correct-container">
          <span>Уровень - 6:</span>
          <span class='riddle-correct-answer correct-a-6'>0</span>
        </div>
        <div class='correct-block correct-6'></div>

        <div class='riddle-statistic-buttons'>
          <button class="btn btn-outline-secondary riddle-statistic-button" data-click="return-statistic">Вернуться к статистике</button>
        </div>
      </div>

      <div class="riddle-statistic-blocks-wrong">
        <div class="riddle-mistake-container">
          <span>Уровень - 1:</span>
          <span class='riddle-mistake-answer mistake-a-1'>0</span>
        </div>
        <div class='mistake-block mistake-1'>
          <div class="riddle-statistic-block riddle-wrong">
            <span>I've whiskers, I'm frisky. Whisk, little mice, lest I should catch you! Please stroke my back, Ill purr and won't scratch you.</span>
            <span>- Cat</span>
          </div>
        </div>

        <div class="riddle-mistake-container">
          <span>Уровень - 2:</span>
          <span class='riddle-mistake-answer mistake-a-2'>0</span>
        </div>
        <div class='mistake-block mistake-2'></div>

        <div class="riddle-mistake-container">
          <span>Уровень - 3:</span>
          <span class='riddle-mistake-answer mistake-a-3'>0</span>
        </div>
        <div class='mistake-block mistake-3'></div>

        <div class="riddle-mistake-container">
          <span>Уровень - 4:</span>
          <span class='riddle-mistake-answer mistake-a-4'>0</span>
        </div>
        <div class='mistake-block mistake-4'></div>

        <div class="riddle-mistake-container">
          <span>Уровень - 5:</span>
          <span class='riddle-mistake-answer mistake-a-5'>0</span>
        </div>
        <div class='mistake-block mistake-5'></div>

        <div class="riddle-mistake-container">
          <span>Уровень - 6:</span>
          <span class='riddle-mistake-answer mistake-a-6'>0</span>
        </div>
        <div class='mistake-block mistake-6'></div>

        <div class='riddle-statistic-buttons'>
          <button class="btn btn-outline-secondary riddle-statistic-button" data-click="return-statistic">Вернуться к статистике</button>
        </div>

      </div>

    </div>

    <audio class="riddle-correct-voice" src="assets/voices/pew.mp3"></audio>
    <audio class="riddle-wrong-voice" src="assets/voices/wrong.mp3"></audio>
    <audio class="riddle-pass-voice" src="assets/voices/pass.mp3"></audio>
  `;
}
