import './plugins/bootstrap';
import './plugins/fontawesome';
import MainApp from './components/mainApp';
import Header from './components/header';
import PageContainer from './components/pageContainer';

import { Authorization, checkTokenValidity } from './components/Authorization/authorization.index';

if (!checkTokenValidity()) {
  const authorization = new Authorization();
  authorization.render();
} else {
  const mainApp = new MainApp('#app', { components: [Header, PageContainer] });
  mainApp.render();
}

// проверяем есть ли токен в локалсторадж
// если нету или он не действителен (проверка любым запросом)
// вызываем компонент авторизации
// если с токеном все ок - запускаем главную страницу mainApp
