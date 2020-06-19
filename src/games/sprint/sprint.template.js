export default function createGameField() {
  return `
    <div class="intro">
      <h1>ENGLISH<br>SPRINT</h1>
      <p>Simple layout.</p>
      <div class='start-block' data-button="start"->Let's start</div>
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
          <div></div>
          <div></div>
          <div></div>
          <i class="fa fa-volume-down icon-parameters" aria-hidden="true"></i>
        </div>

        <div class="birds">
          <img src="assets/img/bird.png" alt="bird" />
          <img src="assets/img/bird.png" alt="bird" />
          <img src="assets/img/bird.png" alt="bird" />
          <img src="assets/img/bird.png" alt="bird" />
        </div>
        <div class="language-eng">ENGLISH</div>
        <div class="language-rus">RUSSIAN</div>

        <div class="click-buttons">
          <button>Wrong</button>
          <button>Correct</button>
        </div>

        <div class="press-buttons">
          <button>ArrowToLeft</button>
          <button>ArrowToLeft</button>
        </div>

      </div>

    </div>
  `;
}
