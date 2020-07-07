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
            <select class="form-control col-3 mr-3 mb-3" id="savannaGameLevel">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
            <label for="savanna-game-lvl">Сложность игры</label>
          </div>
          <div class="custom-control custom-radio mb-2">
            <input type="radio" id="savannaisLearnedWords1" name="savannaisLearnedWords" class="custom-control-input" checked="">
            <label class="custom-control-label" for="savannaisLearnedWords1">Играть с изучаемыми словами</label>
          </div>
          <div class="custom-control custom-radio mb-3">
            <input type="radio" id="savannaisLearnedWords2" name="savannaisLearnedWords" class="custom-control-input">
            <label class="custom-control-label" for="savannaisLearnedWords2">Играть с новыми словами</label>
          </div>
          <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="savannaSettingsGameInvert">
            <label class="custom-control-label" for="savannaSettingsGameInvert">Игра наоборот</label>
          </div>
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="savannaSettingsGameIrregularVerbs" disabled="">
            <label class="custom-control-label" for="savannaSettingsGameIrregularVerbs">Тренировка неправильных глаголов (доступно с премиум аккаунтом)</label>
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
    <div class="jumbotron mb-0 container d-flex flex-column justify-content-center align-items-center"
      style="max-width: 900px;">
      <h1 class="statistics-heading" id="savannaStatisticHeadingElement">В этот раз не получилось, но продолжай тренироваться!</h1>
      <div class="statistics-content" id="savannaStatisticContent">
        <ul class="word-list">
          <p class="h5 mb-3">Верно:<span class="badge badge-success  ml-2">10</span></p>
          <li class="statistics-word">
            <div class="text-secondary fas fa-volume-up sound-button h5 mr-2"></div>
            <div>
              <span class="word h5 text-info">agree</span>
              <span>—</span>
              <span>согласна</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">alcohol</span>
              <span>—</span>
              <span>алкоголь</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">arrive</span>
              <span>—</span>
              <span>прибыть</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">August</span>
              <span>—</span>
              <span>август</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">boat</span>
              <span>—</span>
              <span>лодка</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">breakfast</span>
              <span>—</span>
              <span>завтрак</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">camera</span>
              <span>—</span>
              <span>камера</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">capital</span>
              <span>—</span>
              <span>столица</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">catch</span>
              <span>—</span>
              <span>поймать</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">duck</span>
              <span>—</span>
              <span>утка</span>
            </div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <div>
              <span class="word h5 text-info">enjoy</span>
              <span>—</span>
              <span>наслаждаться</span>
            </div>
          </li>
        </ul>
        <hr>
        <ul class="word-list">
          <p class="h5">Неверно:<span class="badge badge-danger  ml-2">10</span></p>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">invite</span>
            <span>—</span>
            <span>пригласить</span></li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">love</span>
            <span>—</span>
            <span>любовь</span></li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">month</span>
            <span>—</span>
            <span>месяц</span></li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">travel</span>
            <span>—</span>
            <span>путешествовать</span></li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">typical</span>
            <span>—</span>
            <span>типичный</span></li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">visit</span>
            <span>—</span>
            <span>посещение</span></li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">weather</span>
            <span>—</span>
            <span>погода</span></li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">week</span>
            <span>—</span>
            <span>неделя</span></li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">wine</span>
            <span>—</span>
            <span>вино</span></li>
          <li class="statistics-word">
            <div class="text-secondary fas fa-volume-up sound-button h5 mr-2"></div>
            <div>
              <span class="word h5 text-info">adventure</span>
              <span>—</span>
              <span>приключение</span>
              <div>
          </li>
          <li class="statistics-word">
            <span class="text-secondary fas fa-volume-up sound-button h5 mr-2"></span>
            <span class="word h5 text-info">approach</span>
            <span>—</span>
            <span>подходить</span></li>
        </ul>
      </div>
      <div class="btn btn-primary btn-lg" id="savanna-to-game-start-page">В начало</div>
    </div>
  </div>

  <audio class="savanna-audioSource" id="SavannaAudioBip" src="./assets/savanna/voices/bip.mp3"></audio>
  <audio class="savanna-audioSource" id="SavannaAudioGong"  src=./assets/savanna/voices/gong.mp3></audio>
  <audio class="savanna-audioSource" id="SavannaAudioCorrect" src="./assets/savanna/voices/correct.mp3"></audio>
  <audio class="savanna-audioSource" id="SavannaAudioWrong" src="./assets/savanna/voices/wrong.mp3"></audio>
  <audio class="savanna-audioSource" id="SavannaAudioResults" src="./assets/savanna/voices/show_result.mp3"></audio>
</div>
  `;
}