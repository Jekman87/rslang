export default function createHistoryHTML(data) {
  const {
    date, round, result,
  } = data;
  const [correct, errors] = result.split('-');
  // const [level, round, group] = game.split('-');
  const dateToLocal = new Date(date).toLocaleString().split(',').join(' ');
  return `
  <div data-date="${date}" class="card-body p-1 d-flex align-items-center  mb-1">
    <i class="fa fa-history mr-2 text-info" aria-hidden="true"></i>
    <div class="date card-text d-flex flex-column text-center m-0 p-0">
     <p class="text-primary m-0"><strong>Дата:</strong></p>
     <p class="text-primary m-0">${dateToLocal}</p>
    </div>
    <div class="round card-text text-center m-0 p-1 mr-2">
     <p class="text-primary m-0"><strong>Уровень:</strong></p>
     <p class="text-info m-0">${round}</p>
    </div>
    <div class="game card-text text-center m-0 p-1 mr-2">
     <p class="text-primary m-0"><strong>Счет:</strong></p>
     <div>
      <span class="text-success">${correct}
       <span class="text-primary">/</span>
      </span>
      <span class="text-danger">${errors}</span>
     </div>
    </div>
  </div>
  `;
}
