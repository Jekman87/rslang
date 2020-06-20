export default function createCardContainerHTML() {
  return `
  <div class="card-container-content d-flex justify-content-center mt-3">
    <div
      class="word-card card mb-3 word-card text-white bg-primary"
      style="max-width: 20rem;"
    >
      <div class="text-center">
        <img
          class="card-img-top img-thumbnail img-fluid word-card__img"
          src="https://raw.githubusercontent.com/vviiiii/rslang-data/master/data/20_0381.jpg"
          alt=""
        />
      </div>
      <div class="card-body text-center p-1">
        <p class="card-text word-card__translation">достижения</p>
        <div class="form-group m-1 d-none">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-microphone" aria-hidden="true"></i>
              </span>
            </div>
            <input
              class="form-control card-text word-card__input"
              type="text"
              readonly=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}
