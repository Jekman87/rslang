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

const perDayChartData = {
  labels: ['11.07', '12.07', '13.07', '14.07', '15.07', '16.07'],
  datasets: [{
    label: 'Выучено слов за день',
    data: [12, 15, 7, 9, 0, 13],
    backgroundColor: 'rgba(2, 176, 48, 0.2)',
    borderColor: 'rgba(2, 176, 48, 1)',
    borderWidth: 1,
  }],
};

const allDaysChartData = {
  labels: ['1 день', '2 день', '3 день', '4 день', '5 день', '6 день'],
  datasets: [{
    label: 'Выучено слов всего',
    data: [12, 27, 34, 43, 43, 56],
    backgroundColor: 'rgba(252, 173, 3, 0.2)',
    borderColor: 'rgba(252, 173, 3, 1)',
    borderWidth: 1,
  }],
};

const popularityChartData = {
  labels: ['SpeakIt', 'English Puzzle', 'Саванна', 'Аудиовызов', 'Спринт', 'Riddle'],
  datasets: [{
    label: 'Сыграно раз',
    data: [0, 0, 0, 0, 0, 0],
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

export {
  chartOptions, perDayChartData, allDaysChartData, popularityChartData,
};
