import './plugins/bootstrap';
import './plugins/fontawesome';

// main components
import MainApp from './components/mainApp';
import Header from './components/header';
import PageContainer from './components/pageContainer';

// pages
import Authorization from './components/authorization';
import MainPage from './components/mainPage';
import MainGame from './components/mainGame';
import Settings from './components/settingsPage';
import Promo from './components/promoPage';
import Team from './components/teamPage';
import Statistics from './components/statisticsPage';

// games
import AudioCall from './games/audioCall/index';
import Puzzle from './games/english-puzzle/index';
import Riddle from './games/riddle/Riddle.render';
import Savannah from './games/savanna/savanna';
import SpeakIt from './games/speakIt/index';
import Sprint from './games/sprint/Sprint.render';

const pages = {
  Authorization,
  MainPage,
  MainGame,
  Settings,
  Promo,
  Team,
  AudioCall,
  Puzzle,
  Riddle,
  Savannah,
  SpeakIt,
  Sprint,
  Statistics,
};

const mainApp = new MainApp('#app', {
  components: [Header, PageContainer],
  pages,
});
mainApp.render();
