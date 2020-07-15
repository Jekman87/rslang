import { MAIN_MENU_TITLES, GAME_MENU_TITLES, AUTH_PAGE_NAME } from '../../constants/menu.constants';

export default function createHeaderHTML() {
  const gameMenu = GAME_MENU_TITLES.map((item) => `
    <a class="dropdown-item" href="#" data-name="${item.data}">${item.title}</a>
  `).join('');

  const menu = MAIN_MENU_TITLES.map((item, index) => {
    let navItem;

    if (item.data !== 'games') {
      navItem = `
        <li class="nav-item ${index === 0 ? 'active' : ''}">
          <a class="nav-link" href="#" data-name="${item.data}">${item.title}</a>
        </li>
      `;
    } else {
      navItem = `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" data-name="${item.data}"
            role="button" aria-haspopup="true" aria-expanded="false">${item.title}</a>
          <div class="dropdown-menu">
            ${gameMenu}
          </div>
        </li>
      `;
    }

    return navItem;
  }).join('');

  const header = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand">RS Lang</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
         aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            ${menu}
          </ul>
          <button class="btn btn-secondary mt-5 my-lg-0" type="button" id="logout" data-name="${AUTH_PAGE_NAME}">
            Выход <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </nav>
    <div class="main-app-sp d-none">
      <div class="spinner">
        <div class="circle-1"></div>
        <div class="countdown">
          <img class="img-fluid" src="/assets/main-page/logo.png" alt="RS Lang">
        </div>
        <div class="circle-2"></div>
      </div>
    </div>
  `;

  return header;
}
