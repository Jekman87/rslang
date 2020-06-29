import SpeakIt from './components/speakit/index';
import Intro from './components/intro/index';
import Header from './components/header/index';
import CardContainer from './components/cardContainer/index';
import Score from './components/score/index';
import CardsDesk from './components/cardsDesk/index';
import Results from './components/results/index';

class Speakit {
  constructor(elem, options) {
    this.app = elem;
    this.options = options;
  }

  render() {
    this.speakitGame = new SpeakIt(this.app, {
      components: [Intro, Header, CardContainer, Score, CardsDesk, Results],
      options: this.options,
    });
    this.speakitGame.render();
  }
}
export { Speakit as default };
