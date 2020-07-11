import { MAIN_MENU_TITLES } from "../../constants/menu.constants";

export default function createMainPageHTML(data) {
  const { username } = data;
  return `
    <div class="container mt-3">
      <div class="jumbotron pt-4">
        <div class="logo-head bg-primary border border-secondary  mb-4 mx-auto rounded text-center text-light">
          <h1 class="display-4 mb-0">RS Lang <img class="logo img-fluid" src="/assets/main-page/logo.png" alt="RS Lang"></h1>
          <p class="lead">Изучай английский язык - время не ждет!</p>
        </div>
        <div class="greeting mb-3">
          <h5 class="greeting-text">Добро пожаловать, <i class="fas fa-user-graduate"></i> ${username}!</h5>
        </div>
        <div class="statistics bg-white p-2 rounded">
          <h5 class="region-title"><i class="fas fa-user-chart"></i> Статистика</h5>
          <div class="row">
            <div class="col-sm-6 mb-1">
              <div class="card bg-light">
                <div class="stats-card-body card-body">
                  <h5 class="card-title">Сегодня</h5>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Слов на сегодня
                        <div class="progress-container rounded">
                          <div class="progress-tiny bg-info" style="width:50%"></div>
                        </div>
                      <span class="stats badge badge-info badge-pill">15 из 30</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Карточек на сегодня
                      <div class="progress-container rounded">
                        <div class="progress-tiny bg-info" style="width:60%"></div>
                      </div>
                      <span class="stats badge badge-info badge-pill">30 из 50</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-6 mb-1">
              <div class="card bg-light">
                <div class="stats-card-body card-body">
                  <h5 class="card-title">Общая</h5>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Всего выучено слов
                      <div class="progress-container rounded">
                        <div class="progress-tiny bg-info" style="width:10%"></div>
                      </div>
                      <span class="stats badge badge-info badge-pill">550 из 3600</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                       Всего карточек пройдено
                       <div class="progress-container rounded">
                        <div class="progress-tiny bg-info" style="width:20%"></div>
                      </div>
                      <span class="stats badge badge-info badge-pill">1256</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="progress bg-secondary my-3">
            <div class="progress-bar bg-info" role="progressbar" style="width: 15%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <a href="#" class="btn btn-light" data-name="${MAIN_MENU_TITLES[4].data}">Подробнее...</a>
        </div>
        <hr class="my-4">
        <div class="bg-white p-2 rounded">
          <h5 class="region-title"><i class="fas fa-graduation-cap"></i> Тренировка</h5>
          <div class="d-flex justify-content-center">
          <div class="training-card my-2">
            <div class="training-card-img" style="background-image:url(https://www.bitgab.com/assets-dashboard/img/Learn-English.jpg);">
                <div class="training-card-overlay">
                  <div class="overlay-content">
                  <a class="btn btn-primary btn-lg text-center" href="#" role="button" data-name="${MAIN_MENU_TITLES[1].data}">Тренировать <i class="fas fa-graduation-cap"></i></a>
                  </div>
                </div>
              </div>        
              <div class="training-card-content">
                <p>Этот тренажёр создан специально, для тех, кто хочет пополнить свой словарный запас английского языка в удобной игровой форме.</p>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <div class="bg-white p-2 rounded">
          <h5 class="region-title"><i class="fas fa-dice"></i> Игры</h5>
          <div class="d-flex flex-wrap justify-content-center">
            <div class="training-card m-2">
              <div class="training-card-img" style="background-image:url('/assets/games-img/puzzle/1.png');">
                <div class="training-card-overlay">
                  <div class="overlay-content">
                  <a class="btn btn-primary btn-lg text-center" href="#" role="button" data-name="${MAIN_MENU_TITLES[1].data}">Играть <i class="fas fa-gamepad"></i></a>
                  </div>
                </div>
              </div>        
              <div class="training-card-content">
                <p>Этот тренажёр создан специально, для тех, кто хочет пополнить свой словарный запас английского языка в удобной игровой форме.</p>
              </div>
            </div>
                <div class="training-card m-2">
                <div class="training-card-img" style="background-image:url('/assets/games-img/audiocall/1.png');">
                  <div class="training-card-overlay">
                    <div class="overlay-content">
                    <a class="btn btn-primary btn-lg text-center" href="#" role="button" data-name="${MAIN_MENU_TITLES[1].data}">Играть <i class="fas fa-gamepad"></i></a>
                    </div>
                  </div>
                </div>        
                <div class="training-card-content">
                  <p>Этот тренажёр создан специально, для тех, кто хочет пополнить свой словарный запас английского языка в удобной игровой форме.</p>
                </div>
              </div>
              <div class="training-card m-2">
              <div class="training-card-img" style="background-image:url('/assets/games-img/savanna/1.png');">
                <div class="training-card-overlay">
                  <div class="overlay-content">
                  <a class="btn btn-primary btn-lg text-center" href="#" role="button" data-name="${MAIN_MENU_TITLES[1].data}">Играть <i class="fas fa-gamepad"></i></a>
                  </div>
                </div>
              </div>        
              <div class="training-card-content">
                <p>Этот тренажёр создан специально, для тех, кто хочет пополнить свой словарный запас английского языка в удобной игровой форме.</p>
              </div>
            </div>
            <div class="training-card m-2">
            <div class="training-card-img" style="background-image:url('/assets/games-img/sprint/1.png');">
              <div class="training-card-overlay">
                <div class="overlay-content">
                <a class="btn btn-primary btn-lg text-center" href="#" role="button" data-name="${MAIN_MENU_TITLES[1].data}">Играть <i class="fas fa-gamepad"></i></a>
                </div>
              </div>
            </div>        
            <div class="training-card-content">
              <p>Этот тренажёр создан специально, для тех, кто хочет пополнить свой словарный запас английского языка в удобной игровой форме.</p>
            </div>
          </div>
          <div class="training-card m-2">
          <div class="training-card-img" style="background-image:url('/assets/games-img/speakit/1.jpg');">
            <div class="training-card-overlay">
              <div class="overlay-content">
              <a class="btn btn-primary btn-lg text-center" href="#" role="button" data-name="${MAIN_MENU_TITLES[1].data}">Играть <i class="fas fa-gamepad"></i></a>
              </div>
            </div>
          </div>        
          <div class="training-card-content">
            <p>Этот тренажёр создан специально, для тех, кто хочет пополнить свой словарный запас английского языка в удобной игровой форме.</p>
          </div>
        </div>
        <div class="training-card m-2">
        <div class="training-card-img" style="background-image:url('/assets/games-img/riddle/1.png');">
          <div class="training-card-overlay">
            <div class="overlay-content">
            <a class="btn btn-primary btn-lg text-center" href="#" role="button" data-name="${MAIN_MENU_TITLES[1].data}">Играть <i class="fas fa-gamepad"></i></a>
            </div>
          </div>
        </div>        
        <div class="training-card-content">
          <p>Этот тренажёр создан специально, для тех, кто хочет пополнить свой словарный запас английского языка в удобной игровой форме.</p>
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
