export default function createAudioCall() {
  return `
  <div class="row">
  <div class="col px-0">
    <div class="progress bg-transparent" style="height: 5px;">
      <div
        class="progress-bar"
        role="progressbar"
        style="width: 0%;"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="10"
      ></div>
    </div>
  </div>
</div>
<div class="container">
  <div class="row mt-5">
    <div class="col-2 d-flex">
      <button class="btn btn-tip d-flex mr-3" type="button" data-event="tip">
        <i class="fas fa-lightbulb" data-event="tip"></i>
      </button>
      <button class="btn btn-sound-off d-flex" type="button" data-event="soundOff">
        <i class="fas fa-music" data-event="soundOff"></i>
        <i class="fas fa-slash d-none" data-event="soundOff"></i>
      </button>
    </div>
    <div class="col-6 col-sm-9"></div>
    <div class="col">
      <button class="btn btn-close" type="button" data-event="close">
        <i class="fas fa-times" data-event="close"></i>
      </button>
    </div>
  </div>
  <div class="row" style="">
    <div class="col"></div>
    <div class="col question-col">
        <button class="btn btn-repeat d-block ml-auto mr-auto" type="button" data-event="repeat">
          <i class="fas fa-volume-up" data-event="repeat"></i>
        </button>
    </div>
    <div class="col d-none answer-col">
      <button class="btn btn-repeat d-block ml-auto mr-auto on-answer" type="button" data-event="repeat">
        <i class="fas fa-volume-up" data-event="repeat"></i>
      </button>
      <div class ="answer">
        <img class= "answer-pic" src="">
        <p class="text-white answer-word"></p>
      </div>
    </div>
    <div class="col"></div>
  </div>
  <div class="row group-list-row">
    <div class="col buttons-col">
      <div class="btn-group w-100 d-flex flex-wrap flex-lg-nowrap" role="group" aria-label="">
        <button type="button" class="btn btn-outline-light mr-lg-5 ml-lg-5 btn-word">
          <span class="mr-2 round-word-number"></span> <span class="round-word"></span>
        </button>
        <button type="button" class="btn btn-outline-light mr-lg-5 btn-word">
          <span class="mr-2 round-word-number"></span> <span class="round-word"></span>
        </button>
        <button type="button" class="btn btn-outline-light mr-lg-5 btn-word">
          <span class="mr-2 round-word-number"></span> <span class="round-word"></span>
        </button>
        <button type="button" class="btn btn-outline-light mr-lg-5 btn-word">
          <span class="mr-2 round-word-number"></span> <span class="round-word"></span>
        </button>
        <button type="button" class="btn btn-outline-light mr-lg-5 btn-word">
          <span class="mr-2 round-word-number"></span> <span class="round-word"></span>
        </button>
      </div>
    </div>
  </div>
  <div class="row my-5">
        <div class="col-4 col-sm-4 col-lg-4"></div>
        <div class="col-sm-4 col-md">
            <button type="button"
            class="btn btn-outline-light ml-auto mr-auto text-uppercase btn-dont-know"
            data-event="dontKnow"
            >
            <span class="px-2" data-event="dontKnow">не знаю</span>
            </button>
            <button type="button"
            class="d-none btn btn-outline-light ml-auto mr-auto text-uppercase btn-next"
            data-event="next"
            >
            <i class="fas fa-long-arrow-alt-right px-5" data-event="next"></i>
            </button>
        </div>
        <div class="col"></div>
    </div>
</div>
    `;
}
