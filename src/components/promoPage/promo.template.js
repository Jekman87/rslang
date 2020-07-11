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
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleControls_${id}" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
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
    <div class="promo__main-container">
      <div class="promo__training-description">

        <h2>RSLang</h2>

        <div class="my_video">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/PEKN8NtBDQ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, aliquam, sapiente cumque architecto excepturi quae cum officiis illo similique maxime quis aspernatur molestiae non sint ipsa libero cupiditate necessitatibus quod sequi! Rem reprehenderit nisi obcaecati ex eum possimus inventore quibusdam at, magnam recusandae provident, eaque similique, omnis iure accusantium aliquid deserunt vitae? Reprehenderit, aliquid? Ducimus culpa animi explicabo atque harum amet, perferendis laudantium mollitia odit rerum quasi, sint quo aspernatur ab placeat vitae itaque consequuntur. A dolorum, neque incidunt id omnis pariatur obcaecati sapiente aperiam maxime quas aspernatur quo laudantium, perspiciatis porro facere voluptatum tenetur at debitis nam perferendis? Perferendis illum quos est. Repudiandae beatae modi atque corporis asperiores repellendus sunt voluptas delectus dolore. Laudantium earum ipsum rem perferendis quae placeat quisquam, ipsa eos libero, cumque reprehenderit? Pariatur ea molestias quod, odit in voluptatibus, neque, numquam nam dicta voluptatum eligendi voluptatem et eum accusamus minima consequatur. Neque tenetur veritatis illo temporibus et debitis nemo eius accusamus assumenda aliquam fugit, animi nesciunt beatae enim maxime ipsum cum impedit corrupti? Impedit cumque eos deserunt molestias? Cum eaque maxime, deleniti harum culpa quam. Unde ex, fuga, fugiat facilis assumenda rem nisi doloribus hic similique ratione excepturi amet dolore exercitationem eius, in odit totam.
        </span>

      </div>
      ${createMembersHTML(promoGames)}

    </div>
  `;
}
