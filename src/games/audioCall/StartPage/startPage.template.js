export default function createStartPage() {
  return `
  <div class="container d-flex flex-column">
    <div class="row" style="padding-top: 5%;">
        <div class="col-10 col-sm-11"></div>
        <div class="col">
            <button class="btn btn-close" type="button" data-event="close">
            <i class="fas fa-times" data-event="close"></i>
            </button>
        </div>
    </div>
    <div class="row d-flex flex-wrap" style ="margin-top: 10%;">
        <div class="col"></div>
        <div class="col-12">
            <p class="my-5 text-uppercase text-center text-white display-5 game-title">
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
    <div class="row my-5 d-flex flex-wrap">
        <div class="col-3"></div>
        <div class="col-12">
            <button type="button" 
            class="d-block btn btn-outline-light ml-auto mr-auto text-uppercase btn-start-game"
            data-event="startGame"
            >
            Начать
            </button>
        </div>
        <div class="col"></div>
    </div>
</div>
    `;
}
