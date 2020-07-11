export default function createGameField() {
  return `
    <div class="intro__sprint">
      <h1><i class="fas fa-running"></i>СПРИНТ<i class="fas fa-rabbit-fast rabbit"></i></h1>
      <p>Истинная гонка на проверку знаний.<br> Укажите верно ли указан перевод слова?</p>

      <div class="sprint-difficulty-level">
        <span>Уровень</span>
        <div>
          <span data-click="minus-level">-</span>
            <input type="number" min="1" max="6" value="1" readonly class="input-level">
          <span data-click="plus-level">+</span>
        </div>
      </div>

      <button type="button" class="btn btn-outline-success" data-button="start">Начать забег</button>
    </div>

    <div class="main-sp">
      <div class="spinner">
        <div class="circle-1"></div>
        <div class="countdown"></div>
        <div class="circle-2"></div>
      </div>
    </div>

    <div class="sprint-app">
    <div class="sprint-main-container">
      <header class="sprint-header">
        <div class="timer">Время</div>
        <button class="btn btn-outline-danger button" data-click="home">
          <i class="fa fa-times sprint-icon-parameters" aria-hidden="true" data-click="home"></i>
        </button>
      </header>

      <div class="sprint-score">
        <div class="score">0</div>
        <span class="sprint-mute">
          <i class="fas fa-music sprint-icon-parameters note" data-click="mute"></i>
        </span>
        <span class="sprint-unmute">
          <i class="fas fa-music sprint-icon-parameters crossed-note" data-click="unmute"></i>
          <i class="fas fa-slash sprint-icon-parameters cross-line" data-click="unmute"></i>
        </span>
      </div>

      <div class='sprint-game-block'>

        <div class="sprint-progress-place">
          <div data-score-place="1"></div>
          <div data-score-place="2"></div>
          <div data-score-place="3"></div>
          <span class="audio-icon"><i class="fa fa-volume-down sprint-icon-parameters" aria-hidden="true" data-click="audio"></i></span>
        </div>

        <span class="points-progress">+10 очков за слово.</span>

        <div class="birds">
          <img class="bird-1" src="assets/img/bird-1.png" alt="bird" />
          <span></span>
        </div>
        <div class="language-eng"></div>
        <div class="language-rus"></div>

        <div class="click-buttons">
          <button class="btn btn-danger sprint-wrong" data-button="Wrong">Неверно</button>
          <button class="btn btn-success sprint-correct" data-button="Correct">Верно</button>
        </div>

        <div class="press-buttons">
          <span class="sprint-left-arrow"><i class="fas fa-long-arrow-alt-left" data-button="Wrong"></i></span>
          <span class="sprint-right-arrow"><i class="fas fa-long-arrow-alt-right" data-button="Correct"></i></span>
        </div>

      </div>
    </div>
    </div>

    <div class="sprint-statistic-screen">
      <div class="sprint-statistic-blocks">

        <div class="sprint-points-result"></div>

        <div class="mistake-container">
          <span>Ошибся:</span>
          <span class='sprint-mistake-answer'>0</span>
        </div>
        <div class='mistake-block'></div>

        <div class="correct-container">
          <span>Ответил верно:</span>
          <span class='sprint-correct-answer'>0</span>
        </div>
        <div class='correct-block'></div>

        <div class='sprint-statistic-buttons'>
          <button class="btn btn-success statistic-button" data-click="return">Новая игра</button>
          <button class="btn btn-success statistic-button" data-click="long-time-statistic">История игр</button>
          <button class="btn btn-success statistic-button" data-click="home">На главную</button>
        </div>
      </div>

      <div class="sprint-game-history">

        <div class="sprint-history">История игр:</div>

        <div class='sprint-games'></div>

        <div class='sprint-statistic-buttons'>
          <button class="btn btn-success statistic-button" data-click="destroy">Очистить историю</button>
          <button class="btn btn-success statistic-button" data-click="round-statistic">Вернуться</button>
        </div>

      </div>

    </div>

    <audio class="tick-voice" src="assets/voices/bip.mp3"></audio>
    <audio class="gong-voice" src="assets/voices/gong.mp3"></audio>
    <audio class="click-voice" crossOrigin="anonymous" src="assets/voices/pew.mp3"></audio>
    <audio class="word-voice" src="assets/voices/pew.mp3"></audio>
    <audio class="wrong-voice" src="assets/voices/wrong.mp3"></audio>
    <audio class="whistle-voice" src="assets/voices/whistle.mp3"></audio>
  `;
}
