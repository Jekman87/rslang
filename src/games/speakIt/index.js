import SpeakIt from './components/speakit/index';
import Intro from './components/intro/index';
import Header from './components/header/index';
import CardContainer from './components/cardContainer/index';
import Score from './components/score/index';
import CardsDesk from './components/cardsDesk/index';
import Results from './components/results/index';

const speakitGame = new SpeakIt('#app', { components: [Intro, Header, CardContainer, Score, CardsDesk, Results] });

export { speakitGame as default };
