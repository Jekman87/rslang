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
        <div class="row justify-content-center no-gutters mt-3">
          <div class="col-10 col-md-8">
            <div class="my_video">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/l0dWFPbf28A" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        </div>

        <span>
          Рады приветствовать всех, кто заглянул в RSLang - добро пожаловать на маленький островок во вселенной лингвистики. Наше приложение направлено на изучение английского языка, улучшения навыков произношения и восприятия на слух, обновления существующих знаний и развития кругозора. В базовой основе нашего приложения лежит методика интервального повторения.<br>
          Не смотря на всю серьёзность научного подхода изучения языка по этому принципу, в арсенале нашего приложения имеются мини-игры, которые дадут возможность провести время с пользой, закрепить и обновить ваши лингвистические навыки, а также не дадут заскучать и сохранить мотивацию к изучению языка.<br>
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
