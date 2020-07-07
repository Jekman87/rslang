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
import Puzzle from './games/english-puzzle/index';

const pages = {
  Authorization, MainPage, MainGame, Team, Puzzle,
};

const mainApp = new MainApp('#app', { components: [Header, PageContainer], pages });
mainApp.render();
