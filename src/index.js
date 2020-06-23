
/* import './plugins/bootstrap/index';
import './plugins/fontawesome/index';

import './scss/_constants.scss';
import './scss/_mixins.scss';
import './core/Component';
import './core/DomListener';
import './core/domManipulation';
import './core/Observer';
import './core/utils';

import SprintRender from './games/sprint/Sprint.render';
import Sprint from './games/sprint/Sprint.component';

const sprint = new SprintRender('#app', { components: [Sprint] });

sprint.render(); */

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

let startPage;
if (checkTokenValidity()) {
  startPage = MainPage.className;
} else {
  startPage = Authorization.className;
}

const pages = { Authorization, MainPage, MainGame };

const mainApp = new MainApp('#app', { components: [Header, PageContainer], pages, startPage });
mainApp.render();
