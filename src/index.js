import './plugins/bootstrap';
import './plugins/fontawesome';
import MainApp from './components/mainApp';
import Header from './components/header';
import PageContainer from './components/pageContainer';

// проверяем есть ли токен в локалсторадж
// если нету или он не действителен (проверка любым запросом)
// вызываем компонент авторизации
// если с токеном все ок - запускаем главную страницу mainApp

const mainApp = new MainApp('#app', { components: [Header, PageContainer] });
mainApp.render();
