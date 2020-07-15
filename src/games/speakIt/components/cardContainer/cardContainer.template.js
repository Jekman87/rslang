export default function createCardContainerHTML() {
  return `
  <div class="card-container-content d-flex justify-content-center mt-3">
    <div
      class="word-card card mb-3 word-card text-white bg-primary"
      style="max-width: 290px;"
    >
      <div class="text-center">
        <img
          class="card-img-top img-thumbnail img-fluid word-card__img"
          src="/assets/speakit/img/blank.jpg"
          alt="word image"
        />
      </div>
      <div class="card-body text-center p-1">
        <p class="card-text word-card__translation d-none">достижения</p>
        <div class="form-group m-1 d-none">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fa fa-microphone" aria-hidden="true"></i>
              </span>
            </div>
            <input
            class="form-control card-text word-card__input text-center font-weight-bold text-success"
            type="text"
            readonly=""
            />
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="fa fa-microphone" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}
