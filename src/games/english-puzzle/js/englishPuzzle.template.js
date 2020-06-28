const template = `
 <div id="pzl">
  <div class="start-page">
    <h1 class="h1">Puzzle English</h1>
    <button class="btn btn-primary start-button">Старт</button>
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
          </div>
          <div class="rounds-block">
            <span class="label">Раунд</span>
            <span class="select round-select select_closed">1</span>
            <ul class="rounds"></ul>
          </div>
        </div>
        <button class="pzl-btn logout-pzl-btn" title="logout"></button>
        <div class="help-pzl-btn-group">
          <button class="pzl-btn help-pzl-btn autoplay-pzl-btn" data-type="autoplayHelp" title="autoplay helper"></button>
          <button class="pzl-btn help-pzl-btn pronounce-pzl-btn" data-type="pronounceHelp" title="play-by-click helper"></button>
          <button class="pzl-btn help-pzl-btn translate-pzl-btn" data-type="translateHelp" title="translate helper"></button>
          <button class="pzl-btn help-pzl-btn background-pzl-btn" data-type="visualHelp" title="image helper"></button>
        </div>
      </section>
      <section class="game-area">
        <button class="pzl-btn play-pzl-btn" title="play"></button>
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
            <p class="answers-label answers-label_incorrect">Я не знаю<span class="counter counter_incorrect"></span></p>
            <ul class="answers-list answers-list_incorrect"></ul>
            <p class="answers-label answers-label_correct">Я знаю<span class="counter counter_correct"></span></p>
            <ul class="answers-list answers-list_correct"></ul>
          </div>
          <table class="statistics-table hidden">
          </table>
          <button class="pzl-btn close-pzl-btn">Закрыть</button>
        </div>
      </section>
    </main>
  </div>
 </div>
`;

export default template;
