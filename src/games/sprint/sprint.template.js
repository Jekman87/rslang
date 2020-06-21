export default function createGameField() {
  return `
    <div class="intro">
      <h1>ENGLISH<br><i class="fas fa-running"></i>SPRINT<i class="fas fa-rabbit-fast rabbit"></i></h1>
      <p>True or false?</p>
      <button type="button" class="btn btn-outline-success" data-button="start">Let's start</button>
    </div>

    <div class="main-sp">
      <div class="spinner">
        <div class="circle1"></div>
        <div class="countdown"></div>
        <div class="circle2"></div>
      </div>
    </div>

    <div class="main-container">
      <header>
        <div class="timer">Timer</div>
        <button class="btn btn-outline-danger button">
          <i class="fa fa-times icon-parameters" aria-hidden="true" data-click="return"></i>
        </button>
      </header>

      <div class="sprint-score">
        <div class="score">0</div>
        <span class="mute">
          <i class="fas fa-music icon-parameters note" data-click="mute"></i>
        </span>
        <span class="unmute">
          <i class="fas fa-music icon-parameters crossed-note" data-click="unmute"></i>
          <i class="fas fa-slash icon-parameters cross-line" data-click="unmute"></i>
        </span>
      </div>

      <div class='game-block'>

        <div class="progress-place">
          <div data-score-place="1"></div>
          <div data-score-place="2"></div>
          <div data-score-place="3"></div>
          <span class="audio-icon"><i class="fa fa-volume-down icon-parameters" aria-hidden="true" data-click="audio"></i></span>
        </div>

        <span class="points-progress">+10 points for the correct answer</span>

        <div class="birds">
          <img class="bird-1" src="assets/img/bird-1.png" alt="bird" />
          <span></span>
        </div>
        <div class="language-eng">ENGLISH</div>
        <div class="language-rus">RUSSIAN</div>

        <div class="click-buttons">
          <button class="btn btn-danger" data-button="Wrong">Wrong</button>
          <button class="btn btn-success" data-button="Correct">Correct</button>
        </div>

        <div class="press-buttons">
          <span class="left-arrow"><i class="fas fa-long-arrow-alt-left" data-button="Wrong"></i></span>
          <span class="right-arrow"><i class="fas fa-long-arrow-alt-right" data-button="Correct"></i></span>
        </div>

      </div>
    </div>

    <div class="statistic-screen">
      <div class="statistic-blocks">

        <div class="mistake-container">
          <p>I don't know</p>
          <span class='mistake-answer'>0</span>
        </div>
        <div class='mistake-block'></div>

        <div class="correct-container">
          <p>I know</p>
          <span class='correct-answer'>0</span>
        </div>
        <div class='correct-block'></div>

        <div class='statistic-buttons'>
          <button class="btn btn-success statistic-button" data-click="return">Return</button>
          <button class="btn btn-success statistic-button">Game history</button>
        </div>
      </div>
    </div>

    <audio class="tick-voice" src="assets/voices/bip.mp3"></audio>
    <audio class="start-voice" src="assets/voices/gong.mp3"></audio>
    <audio class="click-voice" crossOrigin="anonymous" src="assets/voices/pew.mp3"></audio>
    <audio class="word-voice" src="assets/voices/pew.mp3"></audio>
    <audio class="wrong-voice" src="assets/voices/wrong.mp3"></audio>
  `;
}
