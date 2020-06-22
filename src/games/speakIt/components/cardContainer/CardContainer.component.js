import Component from '../../../../core/Component';
import $$ from '../../../../core/domManipulation';
import createCardContainerHTML from './cardContainer.template';
import { ASSETS_URL } from '../../api/constants';

export default class CardContainer extends Component {
  static className = 'card-container';

  constructor($root, options) {
    super($root, {
      name: 'Card-container',
      listeners: ['click'],
      ...options,
    });
  }

  init() {
    super.init();
    this.$wordCardImg = this.$root.find('.word-card__img');
    this.$wordCardTranslation = this.$root.find('.word-card__translation');
    this.$wordCardFormGroup = this.$root.find('.form-group');
    this.$wordCardInput = this.$root.find('.word-card__input');
    this.subscribe('intro:start', () => {
      this.$root.removeClass('d-none');
    });
    this.subscribe('cardsDesk:clickOnCard', (data) => {
      const { image, wordTranslate } = data;
      // check image loading
      this.$wordCardImg.attr('src', `${ASSETS_URL}${image.replace('files/', '')}`);
      this.$wordCardTranslation.removeClass('d-none').text(wordTranslate);
    });
    this.subscribe('header:speak', (speakMode) => {
      if (speakMode) {
        this.$wordCardImg.attr('src', 'https://vviiiii-speakit.netlify.app/assets/img/blank.jpg');
        this.$wordCardFormGroup.removeClass('d-none');
        this.$wordCardTranslation.addClass('d-none').clear();
      }
    });
    this.subscribe('header:restart', (speakMode) => {
      if (!speakMode) {
        this.$wordCardFormGroup.addClass('d-none');
        this.$wordCardTranslation.removeClass('d-none').clear();
      }
    });
  }

  onClick(event) {
    const clickedElement = $$(event.target);
    console.log(clickedElement);
  }

  toHTML() {
    return createCardContainerHTML().trim();
  }
}
