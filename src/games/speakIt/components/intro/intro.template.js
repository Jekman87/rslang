import {
  GAME_MODE, PER_GAME_WORDS,
} from '../../constants/constants';

export default function createIntroHTML(data) {
  const { userWords } = data;

  const disabledClass = userWords.length >= PER_GAME_WORDS ? '' : 'disabled';
  const disabledAttr = userWords.length >= PER_GAME_WORDS ? '' : 'disabled=""';
  const checkedAttr = userWords.length >= PER_GAME_WORDS ? '' : 'checked=""';
  const checkedAttrInverse = userWords.length <= PER_GAME_WORDS ? '' : 'checked=""';
  const text = userWords.length >= PER_GAME_WORDS ? '' : '(Недостаточно слов в словаре)';
  const settingsRadio = `
    <fieldset class="form-group">
    <div class="form-check ${disabledClass}">
    <label class="form-check-label">
      <input type="radio"
      class="form-check-input" 
      name="settings" 
      id="settings1" 
      value="${GAME_MODE[0]}" ${checkedAttrInverse} ${disabledAttr}>
      Играть со словами из словаря <small class="text-muted">${text}</small>
    </label>
    </div>
    <div class="form-check">
    <label class="form-check-label">
      <input type="radio" 
      class="form-check-input" 
      name="settings" 
      id="settings2" 
      value="${GAME_MODE[1]}" ${checkedAttr}>
      Играть по раундам
    </label>
    </div>
  </fieldset>
  `;
  return `
  <div class="intro-content h-100 d-flex flex-column text-center justify-content-center align-items-center">
    <div class="intro__container rounded p-3">
      <h1 class="intro__title"><i class="fas fa-headset text-danger"></i> Speakit</h1>
      <p class="intro__subtitle mx-3">
        Для изучения произношения новой лексики нажмите на карточку со словом.</br>
        Для старта игры нажмите на кнопку "Говорить" и произнесите в микрофон по очереди все слова, которые видите на карточках.
      </p>
      <div class="text-left m-auto" style="width:230px">
       ${settingsRadio}
      </div>
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
