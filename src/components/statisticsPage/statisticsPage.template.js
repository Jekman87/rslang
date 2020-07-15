export default function createStatisticsHTML() {
  return `
  <div class="container mt-3">
    <div class="jumbotron mb-0">
      <h1 class="stat-header display-4"><i class="fas fa-user-chart"></i> Статистика:</h1>

      <h4 class="stat-header"><i class="fas fa-calendar-day"></i> Статистика за сегодня:</h3>
      <div class="today-stats-wrapper">
      </div>

      <h4 class="stat-header"><i class="fas fa-calendar-alt"></i> Общая статистика:</h3>
      <div class="all-stats-wrapper">
      </div>

      <h4 class="stat-header"><i class="fas fa-chart-line"></i> Визуальная статистика:</h3>
      <div class="charts-tab-wrapper">
      </div>

      <h4 class="stat-header"><i class="fas fa-gamepad"></i> Статистика мини-игр:</h3>
      <div class="tables-tab-wrapper">
      </div>
    </div>
  </div>
  `;
}
