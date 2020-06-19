import './plugins/bootstrap/index.js';

import SprintRender from './games/sprint/Sprint.render.js';
import Sprint from './games/sprint/Sprint.component.js';

const sprint = new SprintRender('#app', { components: [Sprint] });

sprint.render();
