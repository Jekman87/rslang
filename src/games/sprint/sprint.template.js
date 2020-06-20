export default function createGameField() {
  return `
    <div class="intro">
      <h1>ENGLISH<br>SPRINT</h1>
      <p>Simple layout.</p>
      <div class='start-block' data-button="start">Let's start</div>
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
        <button class="btn btn-outline-secondary button"><i class="fa fa-times icon-parameters" aria-hidden="true"></i></button>
      </header>

      <div class="sprint-score">
        <div class="score">0</div>
        <button class="btn btn-outline-secondary button mute"><i class="fa fa-music icon-parameters"></i></button>
      </div>

      <div class='game-block'>

        <div class="progress-place">
          <div data-score-place="1"></div>
          <div data-score-place="2"></div>
          <div data-score-place="3"></div>
          <span class="audio-icon"><i class="fa fa-volume-down icon-parameters" aria-hidden="true" data-click="audio"></i></span>
        </div>

        <div class="birds">
          <img src="assets/img/bird.png" alt="bird" />
          <span></span>
        </div>
        <div class="language-eng">ENGLISH</div>
        <div class="language-rus">RUSSIAN</div>

        <div class="click-buttons">
          <button data-button="Wrong">Wrong</button>
          <button data-button="Correct">Correct</button>
        </div>

        <div class="press-buttons">
          <button><i class="fas fa-long-arrow-alt-left"></i></button>
          <button><i class="fas fa-long-arrow-alt-right"></i></button>
        </div>

        <audio class="tick-voice" src="assets/voices/bip.mp3"></audio>
        <audio class="start-voice" src="assets/voices/gong.mp3"></audio>
        <audio class="click-voice" src="assets/voices/pew.mp3"></audio>
        <audio class="word-voice" src="assets/voices/pew.mp3"></audio>

      </div>

    </div>
  `;
}
