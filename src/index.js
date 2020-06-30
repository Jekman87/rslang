import './plugins/bootstrap';
import './plugins/fontawesome';

// main components
import Api from './api';
import MainApp from './components/mainApp';
import Header from './components/header';
import PageContainer from './components/pageContainer';

// pages and games
import Authorization from './components/authorization';
import MainPage from './components/mainPage';
import MainGame from './components/mainGame';

const pages = { Authorization, MainPage, MainGame };
const userLog = Authorization.checkTokenValidity();
let api;
let startPage;

if (userLog) {
  const { userId, currentToken } = userLog;
  api = new Api(userId, currentToken);
  startPage = MainPage.className;
} else {
  api = new Api();
  startPage = Authorization.className;
}

// startPage = 'MainGame';

const mainApp = new MainApp('#app', {
  components: [Header, PageContainer], pages, startPage, api,
});
mainApp.render();
