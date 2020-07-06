const template = `
 <div id="pzl">
  <div class="start-page">
    <h1 class="h1">Puzzle English</h1>
    <button class="btn btn-primary start-button visible">Старт</button>
    <div class="spinner">
      <div class="lds-hourglass"></div>
    </div>
  </div>
  <p class="report-message report-message_hidden"></p>
  <div class="wrapper">
    <main class="main">
      <section class="controls">
        <div class="selection-group">
          <div class="levels-block">
            <span class="label">Уровень</span>
            <span class="select level-select select_closed">1</span>
            <ul class="levels"></ul>
            <span class="select__control select__control_down">-</span>
            <span class="select__control select__control_up">+</span>
          </div>
          <div class="rounds-block">
            <span class="label">Раунд</span>
            <span class="select round-select select_closed">1</span>
            <ul class="rounds"></ul>
            <span class="select__control select__control_down">-</span>
            <span class="select__control select__control_up">+</span>
          </div>
          <button class="pzl-btn level-pzl-btn">Перейти</button>
        </div>
        <button class="pzl-btn logout-pzl-btn" title="Выйти в главное приложение"></button>
        <div class="help-pzl-btn-group">
          <button class="pzl-btn help-pzl-btn autoplay-pzl-btn" data-type="autoplayHelp" title="Подсказка: Предварительное произношение"></button>
          <button class="pzl-btn help-pzl-btn pronounce-pzl-btn" data-type="pronounceHelp" title="Подсказка: Произношение по клику"></button>
          <button class="pzl-btn help-pzl-btn translate-pzl-btn" data-type="translateHelp" title="Подсказка: Перевод"></button>
          <button class="pzl-btn help-pzl-btn background-pzl-btn" data-type="visualHelp" title="Подсказка: Фон"></button>
        </div>
      </section>
      <section class="game-area">
        <button class="pzl-btn play-pzl-btn" title="play"></button>
        <div class="sentences-list-wrapper">
          <ul class="sentences-list">
            <li class="sentence"></li>
            <li class="sentence"></li>
            <li class="sentence"></li>
            <li class="sentence"></li>
            <li class="sentence"></li>
            <li class="sentence"></li>
            <li class="sentence"></li>
            <li class="sentence"></li>
            <li class="sentence"></li>
            <li class="sentence"></li>
          </ul>
        </div>
        <p class="sentence-translate"></p>
        <div class="sentence-constructor"></div>
        <div class="available-words"></div>
        <div class="answer-pzl-btn-group">
          <button class="pzl-btn answer-pzl-btn check-pzl-btn">Проверить</button>
          <button class="pzl-btn answer-pzl-btn give-up-pzl-btn">Не знаю</button>
        </div>
        <div class="next-round-block hidden">
          <button class="pzl-btn next__pzl-btn next-round__pzl-btn">Далее</button>
          <button class="pzl-btn next__pzl-btn results-pzl-btn">Результаты</button>
          <button class="pzl-btn next__pzl-btn statistics-pzl-btn">Статистика</button>
          <button class="pzl-btn next__pzl-btn gallery-pzl-btn">Галерея</button>
        </div>
        <figure class="painting-block hidden">
          <img class="painting-pic" src="start_page.jpg" alt="default picture">
          <figcaption class="painting-info"></figcaption>
        </figure>
        <div class="pop-up hidden">
          <div class="results-block hidden">
            <figure class="painting-block_small">
              <img class="painting-pic_small" src="start_page.jpg" alt="default picture">
              <figcaption class="painting-info_small">Default Picture</figcaption>
            </figure>
            <div class="scrolled-wrapper">
              <p class="answers-label answers-label_incorrect">Я не знаю<span class="counter counter_incorrect"></span></p>
              <ul class="answers-list answers-list_incorrect"></ul>
              <p class="answers-label answers-label_correct">Я знаю<span class="counter counter_correct"></span></p>
              <ul class="answers-list answers-list_correct"></ul>
            </div>
          </div>
          <div class="statistics-block hidden">
            <table class="statistics-table">
            </table>
          </div>
          <button class="pzl-btn close-pzl-btn">Закрыть</button>
        </div>
        <div id="carouselExampleControls" class="carousel slide pzl-slider hidden" data-interval="false" data-wrap="false">
          <div class="carousel-inner">
          </div>
          <a class="carousel-control-prev pzl-slider-arrow" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next pzl-slider-arrow" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </section>
    </main>
  </div>
 </div>
`;

export default template;
