import Chart from 'chart.js';
import Component from '../../core/Component';
import createStatisticsHTML from './statisticsPage.template';
import {
  feildsAllMap, fieldsAll, feildsTodayMap, feildsToday,
} from './stat';
import { tablesMarkUpData, monthNames } from './table';
import {
  chartOptions, perDayChartDataObj, allDaysChartDataObj, popularityChartData, chartsMarkUpData,
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
    this.mainAppShortStat = options.dataForApp.shortTermStats;
    this.mainAppLongStat = options.dataForApp.longTermStats || [];
  }

  toHTML() {
    return createStatisticsHTML().trim();
  }

  init() {
    super.init();
    this.setStatistics();
    this.renderTodayStat();
    this.renderAllStat();
    this.renderTables();
    this.renderCharts();
  }

  setStatistics() {
    this.setTodayStat();
    this.setAllStat();
    this.setMiniGamesStat();
  }

  setTodayStat() {
    this.todayStat = [...feildsToday];
    if (!this.mainAppShortStat) return;

    this.todayStat[feildsTodayMap.wordsToday].data = this.mainAppShortStat.newWordsCount;
    this.todayStat[feildsTodayMap.cardsToday].data = this.mainAppShortStat.cardsCount;
    this.todayStat[feildsTodayMap.cardsToday].progressValue = this.calcProgress();
    this.todayStat[feildsTodayMap.cardsLeftToday].data = this.mainAppShortStat.cardsLeft;
    this.todayStat[feildsTodayMap.cardsLeftToday].progressValue = 100 - this.calcProgress();
    this.todayStat[feildsTodayMap.answerRatio].data = this.calcRatio();
    this.todayStat[feildsTodayMap.longestSeries].data = this.mainAppShortStat.bestSeries;
  }

  setAllStat() {
    this.allStat = [...fieldsAll];
    if (!this.mainAppLongStat[0]) return;

    this.allStat[feildsAllMap.words].data = `${this.mainAppLongStat[this.mainAppLongStat.length - 1].learnedWords} из 3600`;
    this.allStat[feildsAllMap.cards].data = `${this.mainAppLongStat[this.mainAppLongStat.length - 1].learnedCards}`;
  }

  setMiniGamesStat() {
    this.miniGames = [
      JSON.parse(this.statistics.SpeakItLong || '[]'),
      JSON.parse(this.statistics.PuzzleLong || '[]'),
      JSON.parse(this.statistics.SavannahLong || '[]'),
      JSON.parse(this.statistics.AudioCallLong || '[]'),
      JSON.parse(this.statistics.SprintLong || '[]'),
      JSON.parse(this.statistics.RiddleLong || '[]'),
    ];
  }

  calcRatio() {
    const correct = this.mainAppShortStat.correctAnswers;
    const incorrect = this.mainAppShortStat.errorAnswers;
    return `${Math.round((correct / (correct + incorrect)) * 100)}%`;
  }

  calcProgress() {
    const learned = this.mainAppShortStat.cardsCount;
    const left = this.mainAppShortStat.cardsLeft;
    return Math.round((learned / (learned + left)) * 100);
  }

  renderAllStat() {
    const statContainer = document.querySelector('div.all-stats-wrapper');
    const liElems = [];
    this.allStat.forEach((item) => {
      const li = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.text}<span class="badge badge-info badge-pill">${item.data}</span>
      </li>
      `;
      liElems.push(li);
    });
    statContainer.innerHTML = `<ul class="list-group">${liElems.join('')}</ul>`;
  }

  renderTodayStat() {
    const statContainer = document.querySelector('div.today-stats-wrapper');
    const liElems = [];
    this.todayStat.forEach((item) => {
      const li = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.text}${item.progress ? `<div class="progress">
          <div class="progress-bar progress-bar-striped ${item.progress}" role="progressbar" style="width: ${item.progressValue}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          </div></div>` : ''}
        <span class="badge badge-info badge-pill">${item.data}</span>
      </li>
      `;
      liElems.push(li);
    });
    statContainer.innerHTML = `<ul class="list-group">${liElems.join('')}</ul>`;
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
    const [perDayChartData, allDaysChartData] = this.collectWordsData();

    this.defineScaleStep(perDayChartData.datasets[0].data);
    Chart.Line('perDayChart', {
      options: chartOptions,
      data: perDayChartData,
    });

    this.defineScaleStep(allDaysChartData.datasets[0].data);
    Chart.Line('allDaysChart', {
      options: chartOptions,
      data: allDaysChartData,
    });

    this.defineScaleStep(this.miniGames);
    popularityChartData.datasets[0].data = this.collectPopularityData();
    Chart.Bar('popularityChart', {
      options: chartOptions,
      data: popularityChartData,
    });
  }

  collectWordsData() {
    const data = this.mainAppLongStat;
    const perDay = JSON.parse(perDayChartDataObj);
    const allDays = JSON.parse(allDaysChartDataObj);

    let previousDaysWordsCounter = 0;
    data.forEach((mark) => {
      const date = new Date(mark.date);
      let day = date.getDate();
      day = day < 10 ? `0${day}` : day;
      let month = date.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;

      perDay.labels.push(`${day}.${month}`);
      perDay.datasets[0].data.push(mark.learnedWords - previousDaysWordsCounter);
      previousDaysWordsCounter = mark.learnedWords;

      allDays.labels.push(`${day}.${month}`);
      allDays.datasets[0].data.push(mark.learnedWords);
    });

    return [perDay, allDays];
  }

  collectPopularityData() {
    return this.miniGames.map((resultArr) => resultArr.length);
  }

  defineScaleStep(data) {
    let maxValue = 0;
    if (data[0] && Array.isArray(data[0])) {
      [maxValue] = data.map((item) => item.length).sort((a, b) => b - a);
    } else if (data[0]) {
      [maxValue] = [...data].sort((a, b) => b - a);
    }

    if (maxValue < 6) {
      chartOptions.scales.yAxes[0].ticks.stepSize = 1;
    } else {
      delete chartOptions.scales.yAxes[0].ticks.stepSize;
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
