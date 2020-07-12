export default function createStatisticsHTML() {
  return `
  <div class="container mt-3">
    <div class="jumbotron mb-0">
      <h3 class="stat-header">Статистика за сегодня:</h3>
      <div class="today-stats-wrapper">
      </div>

      <h3 class="stat-header">Визуальная статистика:</h3>
      <div class="charts-tab-wrapper">
      </div>

      <h3 class="stat-header">Статистика мини-игр:</h3>
      <div class="tables-tab-wrapper">
      </div>
    </div>
  </div>
  `;
}
