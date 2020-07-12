export default function createVocabularyHTML() {
  return `
  <div class="container mt-3">
    <div class="jumbotron vocabulary-wrapper">
      <h1 class="display-4 mb-4"><i class="fas fa-book mr-3"></i>Мой словарь
      </h1>
      <ul class="nav nav-tabs justify-content-center">
        <li class="nav-item col-4 p-0 justify-content-center">
          <a class="nav-link text-center text-info active" data-toggle="tab" href="#active-words">Изучаемые слова</a>
        </li>
        <li class="nav-item col-4 p-0 justify-content-center">
          <a class="nav-link text-center text-info" data-toggle="tab" href="#difficult-words">Сложные слова</a>
        </li>
        <li class="nav-item col-4 p-0 justify-content-center">
          <a class="nav-link text-center text-info" data-toggle="tab" href="#deleted-words">Удалённые слова</a>
        </li>
      </ul>

      <div id="myTabContent" class="tab-content">

        <div class="tab-pane fade show active" id="active-words">
        </div>

        <div class="tab-pane fade" id="difficult-words">
        </div>

        <div class="tab-pane fade" id="deleted-words">
        </div>
      </div>
    </div>
  </div>  
    `;
}
