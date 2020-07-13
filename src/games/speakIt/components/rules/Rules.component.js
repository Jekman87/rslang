import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createRulesHTML from './rules.template';
import { PRONOUNCE_URL } from '../../constants/constants';

export default class Rules extends Component {
  static className = 'rules';

  constructor($root, options) {
    super($root, {
      name: 'Rules',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$audio = this.$root.find('#audioPronounce');
    this.subscribe('header:rules', () => {
      this.$root.removeClass('none');
      this.$root.removeClass('d-none');
    });
  }

  async onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.data.target === 'rulesreturn') {
      this.$root.addClass('none');
      this.emit('rules:rulesreturn');
    }
    if (clickedElement.hasClass('play-sound')) {
      const { sound } = clickedElement.data;
      playAudio.apply(this, [sound, PRONOUNCE_URL]);
    }
  }

  toHTML() {
    return createRulesHTML().trim();
  }
}

function playAudio(file, url) {
  if (file) {
    this.$audio.attr(
      'src',
      `${url}/${file}.mp3`,
    );
    this.$audio.$el.currentTime = 0;
    this.$audio.$el.play();
  }
}
