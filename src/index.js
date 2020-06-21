import { Authorization, checkTokenValidity } from './components/Authorization/authorization.index';
import startMainApp from './main';

if (!checkTokenValidity()) {
  const authorization = new Authorization();
  authorization.render();
} else {
  startMainApp();
}
