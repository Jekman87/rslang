export default function createCardHTML(data) {
  const {
    id, _id, term, transcription, translation,
  } = data;
  return `
  <div class="desk-word card bg-primary border" data-wordid="${id || _id}">
    <div
    class="card-body p-1 d-flex flex-column justify-content-center align-items-center bg-primary text-white"
    >
      <i class="fab fa-2x fa-itunes-note" aria-hidden="true"></i>
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
