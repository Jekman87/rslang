export default function showTemplate() {
  return `
<div class="container-fluid savanna-main-container h-100">
<!--
  <div class="savanna-start-page " id="savanna-start-page">
    <div class="btn btn-secondary align-self-end mt-3" data-dismiss="modal">Close</div>
    <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
      <h1 class="display-3">Саванна</h1>
      <p class="lead">Тренировка Саванна развивает словарный запас.
        Чем больше слов ты знаешь, тем легче тебе будет общаться.</p>
      <div class="btn btn-primary btn-lg" id="startSavannaGameButton">Начать</div>
    </div>
    <div class="balasned_element"></div>
  </div> -->


  <div class="savanna-start-page " id="savanna-start-page">
    <div class="d-flex align-self-end mt-3">
      <div class="btn btn-primary mr-2 d-flex justify-content-center align-items-center" id = "savanna-game-settings-button">
        <span class="fas fa-cogs h4 mb-0" id = "savanna-game-settings-button-icon"></span></div>
      <div class="btn btn-secondary  h4 mb-0" id="savanna-go-home">Close</div>
    </div>
    <div class="savanna-setting-card card">
      <div class="card-body">
        <h4 class="card-title">Настройки игры</h4>
        <p class="card-text">
        <div class="form-group">
          <div class="d-flex align-items-center">
            <select class="form-control col-3 mr-3 mb-3" id="game-lvl">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
            <label for="game-lvl col-8">Сложность игры</label>
          </div>
          <div class="custom-control custom-radio mb-2">
            <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" checked="">
            <label class="custom-control-label" for="customRadio1">Играть с изучаемыми словами</label>
          </div>
          <div class="custom-control custom-radio mb-3">
            <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
            <label class="custom-control-label" for="customRadio2">Играть с новыми словами</label>
          </div>
          <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="game1">
            <label class="custom-control-label" for="game1">Игра наоборот</label>
          </div>
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="game2" disabled="">
            <label class="custom-control-label" for="game2">Тренировка неправильных глаголов (доступно с премиум аккаунтом)</label>
          </div>
        </div>
        </p>
      </div>
    </div>
    <div class="jumbotron d-flex flex-column justify-content-center align-items-center"
      style="background-color:transparent;">
      <h1 class="h1 heading text-light">Саванна</h1>
      <p class="lead text-light">Тренировка Саванна развивает словарный запас.
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
    </div>
    <div class="energy-container" id="fallingEnergyContainer">
      <div class="energy-rotate"></div>
    </div>
    <div class="container-fluid main-game-header my-2">
      <div class="row">
        <div class="col-6 d-flex justify-content-start h3 savanna-sound-on-off-container">
          <span class="fas fa-music savanna-soundOn"></span>
          <span class="fas fa-slash savanna-soundOff"></span>
        </div>
        <div class="col-6 d-flex justify-content-end h3">
        <div class="savanna-lives savanna-lives-broken p-1">
          <span class="fas fa-heart"></span>
          <span class="fas fa-heart-broken"></span>
        </div>
        <div class="savanna-lives p-1">
          <span class="fas fa-heart"></span>
          <span class="fas fa-heart-broken"></span>
        </div>
          <div class="savanna-lives p-1">
          <span class="fas fa-heart"></span>
          <span class="fas fa-heart-broken"></span>
        </div>
        <div class="savanna-lives p-1">
          <span class="fas fa-heart"></span>
          <span class="fas fa-heart-broken"></span>
        </div>
        <div class="savanna-lives p-1">
          <span class="fas fa-heart"></span>
          <span class="fas fa-heart-broken"></span>
        </div>
        <div class="savanna-abort-game p-1 ml-3">
          <span class="fas fa-times"></span>
        </div>



        </div>
      </div>

    </div>
    <div class="container main-game">
      <div class="row text-xs-left text-sm-center">
        <div class="col-7 col-sm-6 my-2">
          <div class="btn btn-success w-75 savanna-answer-btn" data-savannaanswerbtn="btn0" id="savanna-answer-btn0">word1</div>
        </div>
        <div class="col-7 col-sm-6 my-2">
          <div class="btn btn-success w-75 savanna-answer-btn" data-savannaanswerbtn="btn1" id="savanna-answer-btn1">word2</div>
        </div>
        <div class="col-7 col-sm-6 my-2">
          <div class="btn btn-success w-75 savanna-answer-btn" data-savannaanswerbtn="btn2" id="savanna-answer-btn2">word3</div>
        </div>
        <div class="col-7 col-sm-6 my-2">
          <div class="btn btn-success w-75 savanna-answer-btn" data-savannaanswerbtn="btn3" id="savanna-answer-btn3">word4</div>
        </div>
      </div>
    </div>
    <div class="main-game-footer d-flex justify-content-center w-100">
      <div class="crystall-container my-2">
        <div class="crystall" id = "savanna-crystall">
        </div>
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


  <audio class="savanna-audioSource" id="SavannaAudioBip" src="./assets/savanna/voices/bip.mp3"></audio>
  <audio class="savanna-audioSource" id="SavannaAudioGong"  src=./assets/savanna/voices/gong.mp3></audio>
  <audio class="savanna-audioSource" id="SavannaAudioCorrect" src="./assets/savanna/voices/correct.mp3"></audio>
  <audio class="savanna-audioSource" id="SavannaAudioWrong" src="./assets/savanna/voices/wrong.mp3"></audio>
  <audio class="savanna-audioSource" id="SavannaAudioResults" src="./assets/savanna/voices/show_result.mp3"></audio>
</div>
  `;
}
