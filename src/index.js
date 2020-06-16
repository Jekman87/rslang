import './plugins/bootstrap/index.js';

import Wrapper from './games/sprint/index.js';
import Sprint from './games/sprint/Sprint.component.js';

const sprint = new Wrapper('#app', { components: [Sprint] });

sprint.render();
