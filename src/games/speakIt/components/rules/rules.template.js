import { vowels, consonants } from './rules';

function createListItemHTML(data, type) {
  const color = type === 'vowels' ? 'warning' : 'info';

  const html = data.map((item) => {
    const { title, id } = item;
    return `
    <li class="list__item">
    <i data-type="playsound"
     class="fas fa-file-audio mr-2 text-${color}" aria-hidden="true"></i>
      <a class="play-sound" href="javascript:void(0);" title="${title}" data-sound="${id}">
        ${title}
      </a>
    </li>
    `;
  });
  return html.join('');
}

export default function createRulesHTML() {
  return `
  <div class="rules-content h-100 p-0 mt-2 rounded bg-light">
    <div class="modal-dialog modal-dialog-scrollable rules-modal m-0" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Английское произношение <i class="fas fa-info-circle"></i></h5>
        </div>
        <div class="modal-body">
          <ul class="sounds-list p-0">
            <li class="list__folder">
              <strong class="text-warning">Гласные</strong>
              <hr class="m-0">
              <ul class="list p-0" data-soundgroup="vowels">
                ${createListItemHTML(vowels, 'vowels')}
              </ul>
            </li>
            <li class="list__folder">
              <strong class="text-info">Согласные</strong>
              <hr class="m-0">
              <ul class="list p-0" data-soundsgroup="consonants">
              ${createListItemHTML(consonants, 'consonants')}
              </ul>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
        <button class="btn btn-outline-primary" data-target="rulesreturn">
          <i class="fas fa-undo" data-target="rulesreturn"></i> Назад
        </button>
        </div>
      </div>
    </div>
    <div class="audio-container d-none">
     <audio class="audio" id="audioPronounce" src=""></audio>
    </div>
 </div>
  `;
}
