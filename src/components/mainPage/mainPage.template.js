import { MAIN_MENU_TITLES } from '../../constants/menu.constants';
import gamesCard from './gameCards';

function createGameCard(data) {
  const html = data.map((member) => {
    const {
      dataAttr, title, img, preview,
    } = member;
    return `
    <div class="training-card m-2">
    <div class="training-card-img" style="background-image:url('${img}');">
      <div class="training-card-overlay">
        <div class="overlay-content">
        <a class="btn btn-primary btn-lg text-center" href="#" role="button" data-game="${dataAttr}">
        Играть <i class="fas fa-gamepad"></i>
        </a>
        </div>
      </div>
    </div>
    <div class="training-card-content">
      <h4>${title}</h4>
      <p>${preview}</p>
    </div>
  </div>
    `;
  });
  return html.join('');
}

function defineUserLevel(points) {
  let lvl = 1;
  let pointsBetweenLvls = 0;
  let pointsCounter = 0;
  let pointsCounterInverted = points;
  const leagueCoef = 2;

  while (pointsCounter <= points) {
    pointsBetweenLvls = Math.floor(20 + pointsCounter * 0.2);
    lvl += 1;
    pointsCounter += pointsBetweenLvls;
    pointsCounterInverted -= pointsBetweenLvls;
  }

  const currentLvlProgress = pointsBetweenLvls + pointsCounterInverted;
  const percentProgress = Math.round((currentLvlProgress / pointsBetweenLvls) * 100);
  const league = Math.round((lvl - 1) / leagueCoef) > 15 ? 15 : Math.round((lvl - 1) / leagueCoef);
  const leagues = ['I',
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
    'XI',
    'XII',
    'XIII',
    'XIV',
    'XV'];
  const leagueRome = leagues[league];
  return [lvl - 1, currentLvlProgress, pointsBetweenLvls, percentProgress, league, leagueRome];
}

export default function createMainPageHTML(data) {
  const {
    username,
    wordsToday,
    wordsPerDay,
    cardsToday,
    cardsPerDay,
    learnedWords,
    allWords,
    learnedCards,
    commonProgress,
  } = data;

  const [userLvl,
    userPoints,
    lvlFullPoints,
    lvlProgress,
    league,
    leagueRome] = defineUserLevel(commonProgress);

  const rang = league >= 11 ? league - 1 : `0${league - 1}`;
  let wordsTodayPercent = Math.ceil((wordsToday / wordsPerDay) * 100);
  wordsTodayPercent = Number.isNaN(wordsTodayPercent) ? 0 : wordsTodayPercent;
  let cardsTodayPercent = Math.ceil((cardsToday / cardsPerDay) * 100);
  cardsTodayPercent = Number.isNaN(cardsTodayPercent) ? 0 : cardsTodayPercent;
  let learnedWordsPercent = Math.ceil((learnedWords / allWords) * 100);
  learnedWordsPercent = Number.isNaN(learnedWordsPercent)
    ? 0
    : learnedWordsPercent;

  return `
    <div class="container mt-3">
      <div class="jumbotron pt-4">
        <div class="logo-head bg-primary border border-secondary mb-4 mx-auto rounded text-center text-light">
          <h1 class="display-4 mb-0 mt-4">RS Lang
          <img class="logo img-fluid" src="/assets/main-page/logo.png" alt="RS Lang"></h1>
          <p class="lead">Изучай английский язык - время не ждет!</p>
        </div>
        <div class="greeting mb-3">
          <h5 class="greeting-text">Добро пожаловать, <i class="fas fa-user-graduate"></i>
            <span class="text-warning">${username}</span>!
          </h5>
        </div>
        <hr class="my-4">
        <div class="achievement bg-light rounded">
          <h5 class="region-title"><i class="fas fa-trophy-alt"></i> Ваши достижения</h5>
          <div class="row">
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <!-- Card body -->
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Уровень</h5>
                      <span class="h2 font-weight-bold mb-0 text-gradient-orange">${userLvl}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                        <i class="fas fa-smile-plus"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                    <span class="text-gradient-orange mr-2" title="следующий уровень"><i class="fa fa-arrow-up"></i> ${userLvl + 1}</span>
                    <div class="progress-container rounded">
                        <div class="progress-tiny bg-gradient-orange" title="до следующего уровня нужно набрать ${lvlFullPoints} очков"
                        style="width:${lvlProgress}%"></div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <!-- Card body -->
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Очки уровня</h5>
                      <span class="h2 font-weight-bold mb-0 text-gradient-green">${Math.round(userPoints)}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                        <i class="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                    <small class="text-nowrap">очков на уровне <span class="text-gradient-green">${lvlFullPoints}</span></small>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <!-- Card body -->
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Всего очков</h5>
                      <span class="h2 font-weight-bold mb-0 text-gradient-info">${Math.round(commonProgress)}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                        <i class="fas fa-star-exclamation"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                    <small class="text-nowrap">набери как можно больше!</small>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                <!-- Card body -->
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">лига</h5>
                      <span class="h2 font-weight-bold mb-0 text-gradient-orange">${leagueRome}</span>
                      <img src="/assets/main-page/Ranks0${rang}.png" class="position-absolute rounded rounded-circle"
                      style="top: 40px;left: 55%;width: 80px;height: auto;">
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                        <i class="fas fa-trophy-alt"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-sm">
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <div class="statistics bg-white p-2 rounded">
          <h5 class="region-title"><i class="fas fa-user-chart"></i> Статистика</h5>
          <div class="row">
            <div class="col-sm-6 mb-1">
              <div class="card bg-light">
                <div class="stats-card-body card-body">
                  <h5 class="card-title"><i class="fas fa-calendar-day"></i> Сегодня</h5>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        Слов на сегодня
                        <div class="progress-container rounded">
                          <div class="progress-tiny bg-info"
                          style="width:${wordsTodayPercent}%"></div>
                        </div>
                      <span class="stats badge badge-info badge-pill">${wordsToday} из ${wordsPerDay}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Карточек на сегодня
                      <div class="progress-container rounded">
                        <div class="progress-tiny bg-info"
                        style="width:${cardsTodayPercent}%"></div>
                      </div>
                      <span class="stats badge badge-info badge-pill">${cardsToday} из ${cardsPerDay}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-6 mb-1">
              <div class="card bg-light">
                <div class="stats-card-body card-body">
                  <h5 class="card-title"><i class="fas fa-calendar-alt"></i> Общая</h5>
                  <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                      Всего выучено слов
                      <div class="progress-container rounded">
                        <div class="progress-tiny bg-info"
                        style="width:${learnedWordsPercent}%"></div>
                      </div>
                      <span class="stats badge badge-info badge-pill">${learnedWords} из ${allWords}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                       Всего карточек пройдено
                      <span class="stats badge badge-info badge-pill">${learnedCards}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="progress bg-secondary my-3">
            <div class="progress-bar bg-info" role="progressbar"
              style="width: 15%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
            </div>
          </div> -->
          <a href="#" class="btn btn-light"
          data-name="${MAIN_MENU_TITLES[4].data}">Подробнее...</a>
        </div>
        <hr class="my-4">
        <div class="bg-white p-2 rounded">
          <h5 class="region-title"><i class="fas fa-graduation-cap"></i> Тренировка</h5>
          <div class="d-flex justify-content-center">
          <div class="training-card my-2 w-100">
            <div class="training-card-img" style="background-size: contain;
                    background-image: url('/assets/main-page/training.jpg');">
                <div class="training-card-overlay">
                  <div class="overlay-content">
                  <a class="btn btn-primary btn-lg text-center" href="#" role="button"
                  data-name="${
  MAIN_MENU_TITLES[1].data
}">Тренировать <i class="fas fa-graduation-cap"></i></a>
                  </div>
                </div>
              </div>
              <div class="training-card-content">
                <p>Этот тренажёр создан специально для тех, кто хочет пополнить свой словарный запас английского языка в удобной игровой форме.</p>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <div class="bg-white p-2 rounded">
          <h5 class="region-title"><i class="fas fa-dice"></i> Игры</h5>
          <div class="d-flex flex-wrap justify-content-center">
          ${createGameCard(gamesCard)}
          </div>
        </div>
      </div>
    </div>
  `;
}
