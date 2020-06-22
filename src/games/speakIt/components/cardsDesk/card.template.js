export default function createCardHTML(data) {
  const {
    id, term, transcription, translation,
  } = data;
  return `
  <div class="desk-word card" data-wordid="${id}">
    <div
      class="card-body p-1 d-flex flex-column justify-content-center align-items-center bg-info text-white"
    >
      <i class="fa fa-2x fa-volume-up" aria-hidden="true"></i>
      <p class="term card-text m-0 p-1">
        ${term}
      </p>
      <p class="transcription card-text m-0 p-1">
        ${transcription}
      </p>
      <p class="translation d-none">
        ${translation}
      </p>
    </div>
  </div>
  `;
}
