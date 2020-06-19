import './plugins/bootstrap/index';
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

sprint.render();
