import Chart from 'chart.js';
import Component from '../../core/Component';
import createStatisticsHTML from './statisticsPage.template';
import {
  chartOptions,
  perDayChartData,
  allDaysChartData,
  popularityChartData,
  tablesMarkUpData,
  chartsMarkUpData,
} from './chart';

export default class Statistics extends Component {
  static className = 'Statistics';

  constructor($root, options) {
    super($root, {
      name: 'Statistics',
      listeners: [],
      ...options,
    });
    this.statistics = options.dataForApp.statistics.optional;
  }

  toHTML() {
    return createStatisticsHTML().trim();
  }

  init() {
    super.init();
    this.setStatistics();
    this.renderCharts();
  }

  setStatistics() {
    this.miniGames = {
      SpeakIt: JSON.parse(this.statistics.SpeakLong || '[]'),
      Puzzle: JSON.parse(this.statistics.PuzzleLong || '[]'),
      Savannah: JSON.parse(this.statistics.SavannahLong || '[]'),
      AudioCall: JSON.parse(this.statistics.AudioCallLong || '[]'),
      Sprint: JSON.parse(this.statistics.SprintLong || '[]'),
      Riddle: JSON.parse(this.statistics.RiddleLong || '[]'),
    };
  }

  renderCharts() {
    Chart.defaults.global.defaultFontFamily = 'Lato, Roboto, Arial, sans-serif';
    Chart.defaults.global.defaultFontSize = window.innerWidth > 768 ? 15 : 12;
    chartOptions.onResize = () => {
      Chart.defaults.global.defaultFontSize = window.innerWidth > 768 ? 15 : 12;
    };

    this.renderTablesMarkup();
    this.renderChartsMarkup();
    this.drawCharts();
  }

  drawCharts() {
    Chart.Line('perDayChart', {
      options: chartOptions,
      data: perDayChartData,
    });
    Chart.Line('allDaysChart', {
      options: chartOptions,
      data: allDaysChartData,
    });
    Chart.Bar('popularityChart', {
      options: chartOptions,
      data: popularityChartData,
    });
  }

  renderTablesMarkup() {
    const tablesContainer = document.querySelector('div.tables-tab-wrapper');
    const liElems = [];
    const divElems = [];

    tablesMarkUpData.forEach((table, i) => {
      const li = `
      <li class="nav-item">
        <a class="nav-link  ${i === 0 ? 'active' : ''}" data-toggle="tab" href="#${table.id}">${table.linkText}</a>
      </li>
      `;

      const div = `
      <div class="tab-pane fade ${i === 0 ? 'active show' : ''}" id="${table.id}">
        <table class="table table-striped table-responsive-sm">
          <thead>
            <tr class="table-primary">
              <th scope="col">Уровень</th>
              <th scope="col">Раунд</th>
              <th scope="col">Дата</th>
              <th scope="col">Время</th>
              <th scope="col">Результат</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td colspan="5">Вы ещё не играли в ${table.linkText}</td>
            </tr>
          </tbody>
        </table>
      </div>
      `;
      liElems.push(li);
      divElems.push(div);
    });

    this.putInDom(tablesContainer, liElems, divElems);
  }

  renderChartsMarkup() {
    const chartsContainer = document.querySelector('div.charts-tab-wrapper');
    const liElems = [];
    const divElems = [];

    chartsMarkUpData.forEach((chart, i) => {
      const li = `
      <li class="nav-item">
        <a class="nav-link  ${i === 0 ? 'active' : ''}" data-toggle="tab" href="#${chart.id}">${chart.linkText}</a>
      </li>
      `;

      const div = `
      <div class="tab-pane fade  ${i === 0 ? 'active show' : ''}" id="${chart.id}">
        <div class="chart-container ${chart.type}">
          <canvas id="${chart.id}Chart" width="100" height="100"></canvas>
        </div>
      </div>
      `;

      liElems.push(li);
      divElems.push(div);
    });

    this.putInDom(chartsContainer, liElems, divElems);
  }

  putInDom(target, liElems, divElems) {
    const container = target;
    const tabs = liElems.join('');
    const content = divElems.join('');

    container.innerHTML = `
    <ul class="nav nav-tabs justify-content-center">${tabs}</ul>
    <div class="tab-content">${content}</div>
    `;
  }
}
