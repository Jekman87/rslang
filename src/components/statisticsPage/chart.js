const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        stacked: true,
        beginAtZero: true,
      },
    }],
  },
};

const perDayChartDataObj = JSON.stringify({
  labels: [],
  datasets: [{
    label: 'Выучено слов за день',
    data: [],
    backgroundColor: 'rgba(2, 176, 48, 0.2)',
    borderColor: 'rgba(2, 176, 48, 1)',
    borderWidth: 1,
  }],
});

const allDaysChartDataObj = JSON.stringify({
  labels: [''],
  datasets: [{
    label: 'Выучено слов всего',
    data: [0],
    backgroundColor: 'rgba(252, 173, 3, 0.2)',
    borderColor: 'rgba(252, 173, 3, 1)',
    borderWidth: 1,
  }],
});

const popularityChartData = {
  labels: ['SpeakIt', 'English Puzzle', 'Саванна', 'Аудиовызов', 'Спринт', 'Riddle'],
  datasets: [{
    label: 'Сыграно раз',
    backgroundColor: [
      'rgba(255, 99, 132, 0.4)',
      'rgba(54, 162, 235, 0.4)',
      'rgba(255, 206, 86, 0.4)',
      'rgba(75, 192, 192, 0.4)',
      'rgba(153, 102, 255, 0.4)',
      'rgba(255, 159, 64, 0.4)',
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
    ],
    borderWidth: 2,
  }],
};

const chartsMarkUpData = [
  {
    id: 'perDay',
    linkText: 'Выучено слов за день',
    type: 'line-chart',

  },
  {
    id: 'allDays',
    linkText: 'Выучено слов всего',
    type: 'line-chart',

  },
  {
    id: 'popularity',
    linkText: 'Популярность мини-игр',
    type: 'bar-chart',

  },
];

const tablesMarkUpData = [
  {
    id: 'speakIt',
    linkText: 'SpeakIt',
  },
  {
    id: 'englishPuzzle',
    linkText: 'English Puzzle',
  },
  {
    id: 'savanna',
    linkText: 'Саванна',
  },
  {
    id: 'audioCall',
    linkText: 'Аудиовызов',
  },
  {
    id: 'sprint',
    linkText: 'Спринт',
  },
  {
    id: 'riddle',
    linkText: 'Riddle',
  },
];

export {
  chartOptions,
  perDayChartDataObj,
  allDaysChartDataObj,
  popularityChartData,
  tablesMarkUpData,
  chartsMarkUpData,
};
