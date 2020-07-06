import './plugins/bootstrap/index';
import './plugins/fontawesome/index';

// import './scss/_constants.scss';
// import './scss/_mixins.scss';
// import './core/Component';
// import './core/DomListener';
// import './core/domManipulation';
// import './core/Observer';
// import './core/utils';

// import { Authorization } from './components/Authorization/authorization.index';

// console.log('Help me!');

// if (!checkTokenValidity()) {
// const authorization = new Authorization();
// authorization.render();
// }

// import { StartPage } from './games/audioCall/index';

// const startPage = new StartPage();
// startPage.render();

import { AudioCall } from './games/audioCall/index';

const audioCall = new AudioCall();
audioCall.render();
