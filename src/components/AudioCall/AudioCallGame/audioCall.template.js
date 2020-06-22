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
    <div class="col">
      <button class="btn btn-sound-off d-flex" type="button" data-event="soundOff">
        <i class="fas fa-music" data-event="soundOff"></i>
        <i class="fas fa-slash d-none" data-event="soundOff"></i>
      </button>
    </div>
    <div class="col-10"></div>
    <div class="col">
      <button class="btn btn-close" type="button" data-event="close">
        <i class="fas fa-times" data-event="close"></i>
      </button>
    </div>
  </div>
  <div class="row" style="margin-top: 5%;">
    <div class="col"></div>
    <div class="col">
      <button class="btn btn-repeat d-block ml-auto mr-auto" type="button" data-event="repeat">
        <i class="fas fa-volume-up p-4" data-event="repeat"></i>
      </button>
    </div>
    <div class="col"></div>
  </div>
  <div class="row group-list-row">
    <div class="col">
      <div class="btn-group w-100" role="group" aria-label="">
        <button type="button" class="btn btn-outline-light mr-5 ml-5">
          <span class="mr-2">1</span> <span class="">коробка</span>
        </button>
        <button type="button" class="btn btn-outline-light mr-5">
          <span class="mr-2">2</span> <span class="">коробка</span>
        </button>
        <button type="button" class="btn btn-outline-light mr-5">
          <span class="mr-2">3</span> <span class="">коробка</span>
        </button>
        <button type="button" class="btn btn-outline-light mr-5">
          <span class="mr-2">4</span> <span class="">коробка</span>
        </button>
        <button type="button" class="btn btn-outline-light mr-5">
          <span class="mr-2">5</span> <span class="">коробка</span>
        </button>
      </div>
    </div>
  </div>
</div>
    `;
}
