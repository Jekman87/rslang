import './plugins/bootstrap';
import './plugins/fontawesome';

// main components
import MainApp from './components/mainApp';
import Header from './components/header';
import PageContainer from './components/pageContainer';

// pages and games
import Authorization from './components/authorization';
import MainPage from './components/mainPage';
import MainGame from './components/mainGame';

import { AudioCall } from './games/audioCall/index';
import Team from './components/teamPage';
import Settings from './components/settingsPage';

import Riddle from './games/riddle/Riddle.render';
import SpeakIt from './games/speakIt/index';
import Puzzle from './games/english-puzzle/index';
import Sprint from './games/sprint/Sprint.render';
import Savannah from './games/savanna/savanna';

import Promo from './components/promoPage';

const pages = {
  Authorization,
  MainPage,
  MainGame,
  Team,
  Settings,
  SpeakIt,
  AudioCall,
  Riddle,
  Puzzle,
  Savannah,
  Sprint,
  Promo,
};

const mainApp = new MainApp('#app', {
  components: [Header, PageContainer],
  pages,
});
mainApp.render();
