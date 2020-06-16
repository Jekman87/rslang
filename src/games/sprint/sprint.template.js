export default function createHeaderHTML() {
  return `
    <div class="intro">
      <h1>ENGLISH<br>SPRINT</h1>
      <p>Simple layout.</p>
      <div class='start-block'>Let's start</div>
    </div>

    <div class="main-container">

      <header>
        <div class="timer">Timer</div>
        <div class="middle-block">
          <div class="score">Score</div>
          <div class="speak"><img src="assets/img/sound.png" alt="speaker" /></div>
        </div>
        <div class="cross">Close</div>
      </header>

      <div class='game-block'>

        <div class="progress-place">
          <div></div>
          <div></div>
          <div></div>
          <img src="assets/img/sound.png" alt="speaker" />
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
