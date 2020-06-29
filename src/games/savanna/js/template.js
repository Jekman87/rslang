export default function showTemplate() {
  return `
<div class="container-fluid savanna-main-container h-100">
  <div class="savanna-start-page " id="savanna-start-page">
    <!--  /* d-flex flex-column justify-content-between w-100 */ -->
    <div class="btn btn-secondary align-self-end" data-dismiss="modal">Close</div>
    <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
      <h1 class="display-3">Саванна</h1>
      <p class="lead">Тренировка Саванна развивает словарный запас.
        Чем больше слов ты знаешь, тем легче тебе будет общаться.</p>
      <div class="btn btn-primary btn-lg" id="startSavannaGameButton">Начать</div>
    </div>
    <div class="balasned_element"></div>
  </div>

  <div class="savanna-main-spinner savanna-display-none" id="savanna-main-spinner">
    <div class="savanna-preloader">
      <div class="savanna-preloader-internal"></div>
      <div class="savanna-preloader-countdown" id="savanna-preloader-countdown"></div>
      <div class="savanna-preloader-external"></div>
    </div>
  </div>

  <div class="savanna-game-page d-flex flex-column justify-content-between w-100 savanna-display-none" id="savanna-game-page">
    <div class="word-container" id="fallingWordContainer">
      <div class="gaming-word-guess" id="savanna-question-word">Word1</div>
      <div class="word-rotate"></div>

    </div>
    <div class="container-fluid main-game-header my-2">
      <div class="row">
        <div class="col-6 d-flex justify-content-start h3 ">
          <span class="fas fa-volume-up soundOnOff"></span>
          <span class="fas fa-volume-mute soundOnOff"></span>
        </div>
        <div class="col-6 d-flex justify-content-end h3">
          <i class="fas fa-heart"></i>
          <i class="fas fa-heart"></i>
          <i class="fas fa-heart"></i>
          <i class="fas fa-heart"></i>
          <i class="fas fa-heart"></i>
        </div>
      </div>

    </div>
    <div class="container main-game">
      <div class="row text-xs-left text-sm-center">
        <div class="col-7 col-sm-6 my-2">
          <div class="btn btn-success w-75 savanna-answer-btn" data-savannaanswerbtn="btn0" id="savanna-answer-btn1">word1</div>
        </div>
        <div class="col-7 col-sm-6 my-2">
          <div class="btn btn-success w-75 savanna-answer-btn" data-savannaanswerbtn="btn1" id="savanna-answer-btn2">word2</div>
        </div>
        <div class="col-7 col-sm-6 my-2">
          <div class="btn btn-success w-75 savanna-answer-btn" data-savannaanswerbtn="btn2" id="savanna-answer-btn3">word3</div>
        </div>
        <div class="col-7 col-sm-6 my-2">
          <div class="btn btn-success w-75 savanna-answer-btn" data-savannaanswerbtn="btn3" id="savanna-answer-btn4">word4</div>
        </div>
      </div>
    </div>
    <div class="main-game-footer d-flex justify-content-center w-100">
      <div class="crystall my-2">
        <!-- <i class="fas fa-acorn"></i> -->
      </div>
    </div>
  </div>

  <div class="savanna-game-statistic savanna-display-none" id="savanna-game-statistic">
    <div class="btn btn-secondary align-self-end" data-dismiss="modal">Close</div>
    <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
      <h1 class="display-3">Статистика</h1>
      <p class="lead">Пока не понятно, что и как тут отображать</p>
      <div class="btn btn-primary btn-lg" id="savanna-to-game-start-page">В начало</div>
    </div>
    <div class="balasned_element"></div>
  </div>


  <audio class="audioSource" id="SavannaAudioBip" src="./assets/savanna/voices/bip.mp3"></audio>
  <audio class="audioSource" id="SavannaAudioGong"  src=./assets/savanna/voices/gong.mp3></audio>
  <audio class="audioSource" id="SavannaAudioCorrect" src="./assets/savanna/voices/correct.mp3"></audio>
  <audio class="audioSource" id="SavannaAudioWrong" src="./assets/savanna/voices/wrong.mp3"></audio>
  <audio class="audioSource" id="SavannaAudioResults" src="./assets/savanna/voices/show_result.mp3"></audio>
</div>
  `;
}
