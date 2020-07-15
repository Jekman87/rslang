export default function createStartPage() {
  return `
  <div class="container d-flex flex-column">
    <div class="row position-relative justify-content-end" style="padding-top: 5%;">

        <div class="d-flex">
            <button class="btn btn-settings mr-3" type="button" data-event="settings">
                <i class="fas fa-cogs" data-event="settings"></i>
            </button>
            <button class="btn btn-close" type="button" data-event="close">
                <i class="fas fa-times" data-event="close"></i>
            </button>
        </div>
        <div class="audiocall-setting-card card">
      <div class="card-body">
        <h4 class="card-title">Настройки игры</h4>
        <p class="card-text">
        </p><div class="form-group">
          <div class="d-flex align-items-center">
            <select class="form-control col-3 mr-3 mb-3" id="audiocallGameLevel">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </select>
            <label for="audiocall-game-lvl">Сложность игры</label>
          </div>
          <div class="custom-control custom-radio mb-2">
            <input type="radio" id="audiocallisLearnedWords1" name="audiocallisLearnedWords" class="custom-control-input" checked="">
            <label class="custom-control-label" for="audiocallisLearnedWords1">Играть с изучаемыми словами</label>
          </div>
          <div class="custom-control custom-radio mb-3">
            <input type="radio" id="audiocallisLearnedWords2" name="audiocallisLearnedWords" class="custom-control-input">
            <label class="custom-control-label" for="audiocallisLearnedWords2">Играть с новыми словами</label>
          </div>
        </div>
        <p></p>
      </div>
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
    <div class="row mt-5 d-flex flex-wrap">
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
