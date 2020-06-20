import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createIntroHTML from './intro.template';

export default class Intro extends Component {
  static className = 'intro';

  constructor($root, options) {
    super($root, {
      name: 'Intro',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    if (clickedElement.data.action === 'start') {
      hide.call(this);
      this.emit('intro:start', '');
    }
  }

  toHTML() {
    return createIntroHTML().trim();
  }
}

function hide() {
  this.$root.addClass('d-none');
}
