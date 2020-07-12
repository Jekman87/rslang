import Chart from 'chart.js';
import Component from '../../core/Component';
import createStatisticsHTML from './statisticsPage.template';
import { tablesMarkUpData, monthNames } from './table';
import {
  chartOptions, perDayChartData, allDaysChartData, popularityChartData, chartsMarkUpData,
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
    this.renderTables();
    this.renderCharts();
  }

  setStatistics() {
    this.miniGames = [
      JSON.parse(this.statistics.SpeakItLong || '[]'),
      JSON.parse(this.statistics.PuzzleLong || '[]'),
      JSON.parse(this.statistics.SavannahLong || '[]'),
      JSON.parse(this.statistics.AudioCallLong || '[]'),
      JSON.parse(this.statistics.SprintLong || '[]'),
      JSON.parse(this.statistics.RiddleLong || '[]'),
    ];
  }

  renderTables() {
    this.tablesContainer = document.querySelector('div.tables-tab-wrapper');
    this.renderTablesMarkup();
    this.fillTables();
  }

  renderCharts() {
    this.chartsContainer = document.querySelector('div.charts-tab-wrapper');
    this.renderChartsMarkup();
    this.setFontSettings();
    this.drawCharts();
  }

  renderTablesMarkup() {
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
              <th scope="col">Дата</th>
              <th scope="col">Время</th>
              <th scope="col">Уровень</th>
              <th scope="col">Раунд</th>
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

    this.putInDom(this.tablesContainer, liElems, divElems, true);
  }

  fillTables() {
    const tableBodies = this.tablesContainer.querySelectorAll('tbody');
    tableBodies.forEach((tbody, i) => {
      const tableBody = tbody;
      const rows = [];
      this.miniGames[i].forEach((mark) => {
        const [level, round] = mark.round.split('-');
        const date = new Date(mark.date);
        const [correct, incorrect] = mark.result.split('-');
        const tr = `
        <tr class="tr">
          <td class="td">${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}</td>
          <td class="td">${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}</td>
          <td class="td">${level}</td>
          <td class="td">${round}</td>
          <td class="td">${correct} из ${Number(correct) + Number(incorrect)}</td>
        </tr>`;
        rows.push(tr);
      });

      if (rows.length) {
        rows.reverse();
        tableBody.innerHTML = rows.join('');
      }
    });
  }

  renderChartsMarkup() {
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

    this.putInDom(this.chartsContainer, liElems, divElems);
  }

  setFontSettings() {
    Chart.defaults.global.defaultFontFamily = 'Lato, Roboto, Arial, sans-serif';
    Chart.defaults.global.defaultFontSize = window.innerWidth > 768 ? 15 : 12;
    chartOptions.onResize = () => {
      Chart.defaults.global.defaultFontSize = window.innerWidth > 768 ? 15 : 12;
    };
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
    this.defineScaleStep();

    popularityChartData.datasets[0].data = this.collectPopularityData();
    Chart.Bar('popularityChart', {
      options: chartOptions,
      data: popularityChartData,
    });
  }

  collectPopularityData() {
    return this.miniGames.map((resultArr) => resultArr.length);
  }

  defineScaleStep() {
    const maxValue = this.miniGames.map((item) => item.length).sort((a, b) => b - a)[0];
    if (maxValue < 6) {
      chartOptions.scales.yAxes[0].ticks.stepSize = 1;
    }
  }

  putInDom(target, liElems, divElems, isScrollNeed) {
    const container = target;
    const tabs = liElems.join('');
    const content = divElems.join('');

    container.innerHTML = `
    <ul class="nav nav-tabs justify-content-center">${tabs}</ul>
    <div class="tab-content ${isScrollNeed ? 'table-wrapper-scroll-y my-custom-scrollbar' : ''}">${content}</div>
    `;
  }
}
