import './plugins/bootstrap';
import './plugins/fontawesome';
import MainApp from './components/mainApp';
import Header from './components/header';
import PageContainer from './components/pageContainer';

export default function startMainApp() {
  const mainApp = new MainApp('#app', { components: [Header, PageContainer]});
  mainApp.render();
}
