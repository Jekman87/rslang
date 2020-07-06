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
import Team from './components/teamPage';
import SpeakIt from './games/speakIt/index';

const pages = {
  Authorization, MainPage, MainGame, Team, SpeakIt,
};

const mainApp = new MainApp('#app', { components: [Header, PageContainer], pages });
mainApp.render();
