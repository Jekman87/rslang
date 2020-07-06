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
import Speakit from './games/speakIt/index';
import Team from './components/teamPage';

const pages = {
  Authorization, MainPage, MainGame, Team, Speakit,
};

const mainApp = new MainApp('#app', { components: [Header, PageContainer], pages });
mainApp.render();
