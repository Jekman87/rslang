import './plugins/bootstrap';
import './plugins/fontawesome';

import checkTokenValidity from './components/authorization/checkTokenValidity';

// main components
import MainApp from './components/mainApp';
import Header from './components/header';
import PageContainer from './components/pageContainer';

// pages and games
import Authorization from './components/authorization';
import MainPage from './components/mainPage';
import MainGame from './components/mainGame';
import SprintGame from './games/sprint/Sprint.render';

let startPage;
if (checkTokenValidity()) {
  startPage = MainPage.className;
} else {
  startPage = Authorization.className;
}

const pages = {
  Authorization, MainPage, MainGame, SprintGame,
};

const mainApp = new MainApp('#app', { components: [Header, PageContainer], pages, startPage });
mainApp.render();
