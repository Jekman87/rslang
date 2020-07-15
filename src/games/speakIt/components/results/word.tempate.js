export default function createWordHTML(wordObj, type) {
  const {
    id, word, transcription, wordTranslate,
  } = wordObj;
  return `
  <div data-wordid="${id}" 
   class="card-body p-1 d-flex align-items-center bg-${type} text-white mb-1">
    <i data-type="playword"
     class="fas fa-2x fa-play-circle mr-2 cursor" aria-hidden="true"></i>
    <p class="term card-text m-0 p-1">
    ${word}
    </p>
    <p class="transcription card-text m-0 p-1">
    ${transcription}
    </p>
    <p class="translation m-0 p-1">
    ${wordTranslate}
    </p>
  </div>
  `;
}
