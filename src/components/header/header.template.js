export default function createHeaderHTML() {
  return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">RS Lang</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Главная</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Тренировка</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Игры</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">SpeakIt</a>
                <a class="dropdown-item" href="#">English puzzle</a>
                <a class="dropdown-item" href="#">Саванна</a>
                <a class="dropdown-item" href="#">Аудиовызов</a>
                <a class="dropdown-item" href="#">Спринт</a>
                <a class="dropdown-item" href="#">Своя игра</a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Словарь</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Статистика</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Настройки</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Промо</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">О команде</a>
            </li>
          </ul>
          <button class="btn btn-secondary mt-5 my-lg-0" type="submit">Выход <i class="fas fa-sign-out-alt"></i></button>
        </div>
      </div>
    </nav>
  `;
}
