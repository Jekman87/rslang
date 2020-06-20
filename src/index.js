import './plugins/bootstrap/index';
import './plugins/fontawesome/index';

import './scss/_constants.scss';
import './scss/_mixins.scss';
import './core/Component';
import './core/DomListener';
import './core/domManipulation';
import './core/Observer';
import './core/utils';

import Authorization from './components/Authorization/Authorization.component';

console.log('Help me!');

if (!localStorage.getItem('currentToken')) {
  const authorization = new Authorization();
  authorization.render();
}
