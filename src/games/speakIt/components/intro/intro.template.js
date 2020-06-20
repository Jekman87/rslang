export default function createIntroHTML() {
  return `
  <div class="intro-content h-100 d-flex flex-column text-center justify-content-center align-items-center">
    <h1 class="intro__title">Speakit</h1>
    <p class="intro__subtitle">
      Click on the words to hear them sound.</br>
      Click on the button and speak the words into the microphone.
    </p>
    <button data-action="start" class="btn btn-warning btn-lg">
      Start
    </button>
  </div>
  `;
}
