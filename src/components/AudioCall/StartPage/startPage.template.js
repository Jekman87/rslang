export default function createStartPage() {
  return `
  <div class="container d-flex flex-column">
    <div class="row pt-3">
        <div class="col-11"></div>
        <div class="col">
            <button class="btn" type="submit">
            <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
    <div class="row mt-5 mt-auto">
        <div class="col"></div>
        <div class="col">
            <p class="my-5 text-uppercase text-center text-white display-4 game-title">
            Аудиовызов
            </p>
        </div>
        <div class="col"></div>
    </div>
    <div class="row">
        <div class="col">
            <p class="text-center text-white display-5 game-desc">
            Тренировка улучшает восприятие английской речи на слух.
            </p>
        </div>
    </div>
    <div class="row my-5 mb-auto">
        <div class="col"></div>
        <div class="col">
            <button type="button" class="d-block btn btn-outline-light ml-auto mr-auto text-uppercase btn-start-game">
            Начать
            </button>
        </div>
        <div class="col"></div>
    </div>
</div>
    `;
}
