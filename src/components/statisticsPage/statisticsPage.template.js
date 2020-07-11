export default function createStatisticsHTML() {
  return `
  <div class="container mt-3">
    <h3 class="stat-header">Статистика главного приложения:</h3>
    <p>Пока непонятно, что тут будет</p>
    <h3 class="stat-header">Статистика мини-игр:</h3>
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <a class="nav-link  active" data-toggle="tab" href="#speakIt">SpeakIt</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#englishPuzzle">English Puzzle</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#savanna">Саванна</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#audioCall">Аудиовызов</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#sprint">Спринт</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#riddle">Riddle</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade active show" id="speakIt">
        <table class="table table-striped table-responsive-sm">
          <thead>
            <tr class="table-primary">
              <th scope="col">Уровень</th>
              <th scope="col">Раунд</th>
              <th scope="col">Время</th>
              <th scope="col">Результат</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
            <tr>
              <td>1</td>
              <td>3</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
            <tr>
              <td>1</td>
              <td>4</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tab-pane fade" id="englishPuzzle">
        <p>Статистики пока нет</p>
      </div>
      <div class="tab-pane fade" id="savanna">
        <p>Статистики пока нет</p>
      </div>
      <div class="tab-pane fade" id="audioCall">
        <p>Статистики пока нет</p>
      </div>
      <div class="tab-pane fade" id="sprint">
        <p>Статистики пока нет</p>
      </div>
      <div class="tab-pane fade" id="riddle">
        <p>Статистики пока нет</p>
      </div>
    </div>
    <h3 class="stat-header">Визуальная статистика:</h3>
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <a class="nav-link  active" data-toggle="tab" href="#perDay">Выучено слов за день:</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#allDays">Выучено слов всего:</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#popularity">Популярность мини-игр:</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade active show" id="perDay">
        <div class="chart-container line-chart">
          <canvas id="perDayChart" width="100" height="100"></canvas>
        </div>
      </div>
      <div class="tab-pane fade" id="allDays">
        <div class="chart-container line-chart">
          <canvas id="allDaysChart" width="100" height="100"></canvas>
        </div>
      </div>
      <div class="tab-pane fade" id="popularity">
        <div class="chart-container bar-chart">
          <canvas id="popularityChart" width="100" height="100"></canvas>
        </div>
      </div>
    </div>
  </div>
  `;
}
