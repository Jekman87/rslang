import './plugins/bootstrap';
import './plugins/fontawesome';
import { storage } from './core/utils';

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

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjE1NTM0YWEyNDVlMDAxN2E1Nzk0MyIsImlhdCI6MTU5Mjg3NDYzOCwiZXhwIjoxNTkyODg5MDM4fQ.E2YtDIU6aU9bz_Kg588ixfcI5DLWo96mNgCJkOomVLs';
// const userId = '5ef15534aa245e0017a57943';
// idword 5e9f5ee35eb9e72bc21af716 5e9f5ee35eb9e72bc21af4a0 5e9f5ee35eb9e72bc21af4a4 5e9f5ee35eb9e72bc21af4a6 5e9f5ee35eb9e72bc21af4af

const token = storage('currentToken');
const userId = storage('userId');

const api = new Api(token, userId);
const user = { email: 'vasia2@mail.ru', password: 'Puzzle123!' };
const word = { difficulty: 'hard', optional: { myKey: 'value1234', testFieldBoolean: false } };
const filter = '{"$and":[{"userWord.difficulty":"hard", "userWord.optional.myKey":"value123"}]}';

// api.getWords().then((d) => console.log(d));
// api.createUserWord('5e9f5ee35eb9e72bc21af4af', word).then((d) => console.log(d));
// api.getUserWordById('5e9f5ee35eb9e72bc21af4a4').then((d) => console.log(d));
// api.deleteUserWord('5e9f5ee35eb9e72bc21af4a2').then((d) => console.log(d));
// api.getAllUserAggregatedWords(0, 10, filter).then((d) => console.log(d));
// encodeURIComponent('привет')

const stats = {
  learnedWords: 15,
  optional: {
    isTrye: 'nope',
    helloRS: 'hi',
  },
};
// api.updateStatistics(stats).then((d) => console.log(d));
// api.getStatistics().then((d) => console.log(d));
const settings = {
  wordsPerDay: 15,
  optional: {
    isTrye: 'nope232',
    helloRS: 'hi2323',
  },
};
// api.updateSettings(settings).then((d) => console.log(d));
api.getSettings().then((d) => console.log(d));
