import SpeakIt from './components/speakit/index';
import Intro from './components/intro/index';
import Header from './components/header/index';
import CardContainer from './components/cardContainer/index';
import Score from './components/score/index';
import CardsDesk from './components/cardsDesk/index';
import Results from './components/results/index';
import Rules from './components/rules/index';

class Speakit {
  constructor(elem, options) {
    this.app = elem;
    this.options = options;
  }

  render() {
    this.speakitGame = new SpeakIt(this.app, {
      components: [Intro, Header, CardContainer, Score, CardsDesk, Results, Rules],
      options: this.options,
    });
    this.speakitGame.render();
  }

  destroy() {
    this.speakitGame.destroy();
  }
}
export { Speakit as default };
