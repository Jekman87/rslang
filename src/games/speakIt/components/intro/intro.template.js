export default function createIntroHTML() {
  return `
  <div class="intro-content h-100 d-flex flex-column text-center justify-content-center align-items-center">
    <div class="intro__container rounded p-3">
      <h1 class="intro__title"><i class="fas fa-headset text-danger"></i> Speakit</h1>
      <p class="intro__subtitle mx-3">
        Нажмите на карточку со словом, чтобы услышать, как оно произносится.</br>
        Нажмите на кнопку "Говорить" и произнесите в микрофон по очереди все слова которые видите на карточках.
      </p>
      <button type="button" class="btn btn-warning btn-lg mt-1" data-action="start">
        Начать <i class="fas fa-gamepad" data-action="start"></i>
      </button>
      <button type="button" class="btn btn-secondary btn-lg mt-1" data-action="exit">
        Выход <i class="fas fa-power-off" data-type="exit"></i>
      </button>
    </div>
  </div>
  `;
}
