import promoGames from './games-info';

function createMembersHTML(data) {
  const html = data.map((info) => {
    const {
      id, name, img, preview, description,
    } = info;
    return `
      <div class="promo__game-description promo__developer-${id}">
        <h3>${name}</h3>
        <span class="promo__preview">${preview}</span>
        <div class="promo__slider">
          <div id="carouselExampleControls_${id}" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100 h-800px" src="${img[0]}" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100 h-800px" src="${img[1]}" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100 h-800px" src="${img[2]}" alt="Third slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100 h-800px" src="${img[3]}" alt="Fourth slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls_${id}" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon control-color-left-${id}" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls_${id}" role="button" data-slide="next">
              <span class="carousel-control-next-icon control-color-right-${id}" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        <span class="promo__description">${description}</span>

      </div>
    `;
  });
  return html.join('');
}

export default function createPromoPageLayout() {
  return `
    <div class="promo__container container mt-3">
      <div class="jumbotron mb-0">

      <div class="promo__training-description">

        <h2> <i class="fas fa-chart-pie"></i> RSLang</h2>

        <span class="promo__greetings">Рады приветствовать всех, кто заглянул в RSLang - добро пожаловать на маленький островок во вселенной лингвистики.</span>

        <div class="row justify-content-center no-gutters mt-3">
          <div class="col-10 col-md-8">
            <div class="my_video">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/l0dWFPbf28A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        </div>

        <span>
          Приложение RSLang направлено на изучение английского языка, улучшения навыков произношения и восприятия на слух, обновления существующих знаний и развития кругозора.<br>
          В базовой основе нашего приложения лежит методика интервальных повторении (англ. spaced repetition) - техника удержания в памяти, заключающаяся в повторении запомненного учебного материала по определённым, постоянно возрастающим интервалам. Этот принцип находит применение для запоминания любой информации, но наиболее широко он используется для изучении иностранных языков <br>
          В нашем приложении вам не нужно вычислять сложные алгоритмы и интервалы - всё уже сделано за вас. Вам лишь необходимо выбрать карточки со словами, которые вы хотели бы запомнить, затем каждый день проходить тренировки - приложение определяет интервалы повторения, основываясь на вашей оценке предложенных карточек. Если вы оцениваете предложенную карточку, как легкую, то в следующий раз это слово будет предложено вам не скоро. Все остальные уровни оценки сложности пропорциональны интервалам повторения слов.<br>
          Не смотря на всю серьёзность научного подхода изучения языка по этому принципу, в арсенале нашего приложения имеются мини-игры, которые дадут возможность провести время с пользой, закрепить и обновить ваши лингвистические навыки, а также не дадут заскучать и сохранить мотивацию к изучению языка.<br>
          А чтобы процесс проходил как игра, мы ввели систему уровней и лиг! При регистрации вы получаете уровень 1 и прокачиваете свой аккаунт, получая очки опыта во время тренировки, а также играя в мини-игры. Через каждые 2 уровня, уровень лиги повышается. Каждой лиге соответствует своя эмблема.<br>
          В режиме тренировки каждое угаданное слово равно 1-му очку опыта. За каждый раунд в мини-игре можно получить до 10 очков опыта в зависимости от результатов раунда. Исключение составляет игра Riddle, в которой за каждую отгаданную загадку дается 1 очко опыта.
          Необходимый прогресс для каждого следующего уровня рассчитывается как 20 очков опыта + 20% от полученных очков на предыдущих уровнях. Полученная сумма округляется в меньшую сторону. Например:<br>
          <ul class="promo__list">
            <li>1-й уровень: 0 очков опыта (пользователь получает при регистрации).</li>
            <li>2-й уровень: 20 + 0 * 0,2 = 20 очков опыта.</li>
            <li>3-й уровень: 20 + (0 + 20) * 0,2 = 24 очка опыта.</li>
            <li>4-й уровень: 20 + (0 + 20 + 24) * 0,2 = 28,8 (округление до 28).</li>
            <li>и так далее...</li>
          </ul>
          Для каждого уровня очки считаются с 0, но и общее количество очков набранное за все уровни посмотреть также можно. Вся информация об уровне аккаунта находится на главной странице приложения.<br>
          Далее по тексту вы можете ознакомиться со всеми дополнительными составляющими нашего приложения, также как и с исходным кодом приложения, который вы сможете найти в нашем репозитории по ссылке ниже.
        </span>

        <span>
          <i class="fab fa-github"></i>
          <a href="https://github.com/Jekman87/rslang" target="_blank">RSLang repository</a>
        </span>

      </div>
      ${createMembersHTML(promoGames)}
      </div>
    </div>
  `;
}
