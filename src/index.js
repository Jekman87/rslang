import './plugins/bootstrap/index.js';

import Authorization from './components/Authorization/Authorization.component.js';

if (!localStorage.getItem('currentToken')) {
  const authorization = new Authorization();
  authorization.render();
}
