export default function createHistoryHTML(data) {
  const {
    d: date, r: right,
  } = data;
  const errors = 10 - +(right);
  const dateToLocal = new Date(date).toLocaleString().split(',').join(' ');
  return `
  <div data-date="${date}" class="card-body p-1 d-flex align-items-center  mb-1">
    <i class="fa fa-history mr-2 text-info" aria-hidden="true"></i>
    <p class="date card-text text-center m-0 p-1">
     <span class="text-primary">Дата: ${dateToLocal}</span>
    </p>
    <p class="right card-text text-center m-0 p-1">
     <span class="text-success">Правильно: ${right}</span>
    </p>
    <p class="errors text-center m-0 p-1">
     <span class="text-danger"> Ошибок: ${errors}</span>
    </p>
  </div>
  `;
}
