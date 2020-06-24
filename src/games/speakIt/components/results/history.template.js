export default function createHistoryHTML(data) {
  const {
    d: date, c: correct, r: game,
  } = data;
  const errors = 10 - +(correct);
  // const [level, round, group] = game.split('-');
  const dateToLocal = new Date(date).toLocaleString().split(',').join(' ');
  return `
  <div data-date="${date}" class="card-body p-1 d-flex align-items-center  mb-1">
    <i class="fa fa-history mr-2 text-info" aria-hidden="true"></i>
    <p class="date card-text text-center m-0 p-1">
     <span class="text-primary">Дата: ${dateToLocal}</span>
    </p>
    <p class="round card-text text-center m-0 p-1">
     <span class="text-primary">Уровень: 
      <span class="text-info">${game}</span> 
     </span>
    </p>
    <p class="game card-text text-center m-0 p-1">
      Счет:
     <span class="text-success">${correct}</span>
     <span class="text-primary">/</span>
     <span class="text-danger">${errors}</span>
    </p>
  </div>
  `;
}
