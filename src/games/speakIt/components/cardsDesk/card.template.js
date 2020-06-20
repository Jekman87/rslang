export default function createCardHTML() {
  return `
  <div class="card btn btn-info p-0">
    <div
      class="card-body p-1 d-flex flex-column justify-content-center align-items-center bg-info text-white"
    >
      <div class="card-audio">
        <i class="fa fa-2x fa-volume-up" aria-hidden="true"></i>
      </div>
      <p class="term card-text m-0 p-1">
        copper
      </p>
      <p class="transcription card-text m-0 p-1">
        [kɑ́pər]
      </p>
      <p class="translation d-none">
        Thisialongercard
      </p>
    </div>
  </div>
  `;
}
