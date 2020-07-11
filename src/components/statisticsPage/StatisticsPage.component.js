import Chart from 'chart.js';
import Component from '../../core/Component';
import createStatisticsHTML from './statisticsPage.template';
import {
  chartOptions, perDayChartData, allDaysChartData, popularityChartData,
} from './chart';

export default class Statistics extends Component {
  static className = 'Statistics';

  constructor($root, options) {
    super($root, {
      name: 'Statistics',
      listeners: [],
      ...options,
    });
  }

  toHTML() {
    return createStatisticsHTML().trim();
  }

  init() {
    super.init();
    this.renderCharts();
  }

  renderCharts() {
    Chart.defaults.global.defaultFontFamily = 'Lato, Roboto, Arial, sans-serif';
    Chart.defaults.global.defaultFontSize = window.innerWidth > 768 ? 15 : 12;

    chartOptions.onResize = () => {
      Chart.defaults.global.defaultFontSize = window.innerWidth > 768 ? 15 : 12;
    };

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
}
