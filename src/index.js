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

// test api
import Api from './api'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjE1NTM0YWEyNDVlMDAxN2E1Nzk0MyIsImlhdCI6MTU5Mjg3NDYzOCwiZXhwIjoxNTkyODg5MDM4fQ.E2YtDIU6aU9bz_Kg588ixfcI5DLWo96mNgCJkOomVLs';
const userId = '5ef15534aa245e0017a57943';

const api = new Api(token, userId);
const user = { email: 'vasia2@mail.ru', password: 'Puzzle123!' };
const word = { difficulty: 'weak', optional: { testFieldString: 'test', testFieldBoolean: true } };

// api.createUserWord('5e9f5ee35eb9e72bc21af716', word).then((d) => console.log(d));
api.getWords().then((d) => console.log(d));

// api.createUser(user).then((d) => console.log(d));
// api.loginUser(user).then((d) => console.log(d, api.token, api.userId));
