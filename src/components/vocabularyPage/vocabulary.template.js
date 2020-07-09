export default function createVocabularyHTML() {
  return `
    <div class="container mt-3">
    <div class="jumbotron vocabulary-wrapper">
    <h1 class="display-4 text-primary mb-4"><i class="fas fa-book mr-3"></i>Мой словарь</h1>
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
        <ul class="list-group">
          <li class="list-group-item">

            <div class="d-flex flex-column-reverse align-items-center justify-content-between flex-sm-row">
              <div class="progress-wrapper d-flex  flex-sm-column flex-lg-row col-12 col-sm-4 ml-md-3 mb-1 justify-content-between align-items-center">
                <div class="progress">
                  <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 35%"
                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="progress-info text-nowrap text-muted ml-2 ml-sm-0 ml-lg-2">Где-то уже слышал!</small>
              </div>
              <ol class="d-lg-flex col-12 col-sm-7 col-md-5 col-lg-8 col-xl-7 mb-1">
                <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Последняя тренировка: 7дн назад</small></li>
                <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Повторов:8</small></li>
                <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Следующая тренировка:через 4 часа</small></li>
              </ol>
            </div>

            
            
              <div class="column d-flex my-2 align-items-center">
                <div class="mr-3"><i class="fas fa-volume-up sound-button text-info"></i></div>
                <div>
                  <span class="word h4 text-success">agree</span>
                  <span class="">—</span>
                  <big class="transcription text-primary">[əgríː]<span class="ml-2">—</span></big>
                  <big class="translation">согласна</big>
                </div> 
              </div>

              
             
            <div class="d-flex flex-column flex-md-row justify-content-md-between mt-3">
              <img class="col-12 col-md-5 col-lg-4 col-xl-3 bg-secondary rounded px-0 mb-2" src="https://raw.githubusercontent.com/jekman87/rslang-data/master/files/01_0002.jpg" alt="">
              <div class="col-12 col-md-7  col-lg-8 px-0 px-md-2">
                <div class="additional-info">
                  <div class="description d-flex">
                    <div class="icon-container col-1 text-center text-info p-0 px-md-2"><i class="fas fa-graduation-cap"></i></div>
                      <div class="text-container">
                        <div>
                        <span class="text-primary"><strong>To agree is to have the same opinion or belief as another
                            person</strong></span>
                        <span class="">—</span>
                        </div>
                        <div class="text-gray">Согласиться - значит иметь то же мнение или убеждение, что и другой
                          человек</div>
                      </div>
                    </div>
                  </div>

                  <div class="example d-flex">
                    <div class="icon-container col-1 text-center text-info p-0 px-md-2"><i class="fas fa-lightbulb"></i></div>
                    <div class="text-container">
                      <div>
                        <span class="text-text-primary"><strong>The students agree they have too much homework</strong></span>
                        <span class="">—</span>
                      <div class="text-gray">Студенты согласны, что у них слишком много домашней работы</div>
                      </div>
                    </div>
                </div>
              </div> 
            </div>   
            
          </li>

        <li class="list-group-item">

          <div class="d-flex flex-column-reverse align-items-center justify-content-between flex-sm-row">
            <div class="progress-wrapper d-flex  flex-sm-column flex-lg-row col-12 col-sm-4 ml-md-3 mb-1 justify-content-between align-items-center">
              <div class="progress">
                <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 75%"
                  aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <small class="progress-info text-nowrap text-muted ml-2 ml-sm-0 ml-lg-2">Нужно еще потренироваться!</small>
            </div>
            <ol class="d-lg-flex col-12 col-sm-7 col-md-5 col-lg-8 col-xl-7 mb-1">
              <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Последняя тренировка: 2дн назад</small></li>
              <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Повторов:2</small></li>
              <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Следующая тренировка:через 2 часа</small></li>
            </ol>
          </div>

            <div class="word-wrapper d-flex justify-content-between">
              <div class="column" style="line-height: 1.5rem;">
                <span class="word h4 text-success m-2">alcohol</span>
                <span class="">—</span>
                <big class="transcription text-primary">[ǽlkəhɔ̀ːl]<span class="ml-2">—</span></big>
                <big class="translation">алкоголь</big>
              </div>
              <div class="column col-2 d-flex justify-content-end">
                <img class="rounded px-0 mr-1 col-8" src="https://raw.githubusercontent.com/jekman87/rslang-data/master/files/01_0002.jpg" alt="">
                <button type="button" class="btn btn-outline-primary px-1"><i
                    class="fas fa-volume-up sound-button"></i></button>

              </div>
            </div>
            <div class="additional-info">

              <div class="description d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-graduation-cap"></i></div>
                <div class="text-container">
                  <span class="text-primary"><strong>Alcohol is a type of drink that can make people
                      drunk</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Алкоголь - это тип напитка, который может сделать людей пьяными</span>
                </div>
              </div>

              <div class="example d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-lightbulb"></i></div>
                <div class="text-container">
                  <span class="text-text-primary"><strong>A person should not drive a car after he or she has been
                      drinking alcohol</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Человек не должен водить машину после того, как он выпил алкоголь</span>
                </div>
              </div>
            </div>
          </li>

    <li class="list-group-item">

          <div class="d-flex flex-column-reverse align-items-center justify-content-between flex-sm-row">
          <div class="progress-wrapper d-flex  flex-sm-column flex-lg-row col-12 col-sm-4 ml-md-3 mb-1 justify-content-between align-items-center">
            <div class="progress">
              <div class="progress-bar progress-bar-striped bg-dark" role="progressbar" style="width: 20%"
                aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <small class="progress-info text-nowrap text-muted ml-2 ml-sm-0 ml-lg-2">Я это точно учил?</small>
          </div>
          <ol class="d-lg-flex col-12 col-sm-7 col-md-5 col-lg-8 col-xl-7 mb-1">
            <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Последняя тренировка: 1дн назад</small></li>
            <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Повторов:1</small></li>
            <li class="breadcrumb-item align-items-lg-center"><small class="text-muted">Следующая тренировка:через 4 часа</small></li>
          </ol>
        </div>

        <div class="word-wrapper d-flex justify-content-between">
        <div class="word-info-wrapper order-2 mb-3 order-md-1">
          <div class="word-info" style="line-height: 1.5rem;">
            <span class="word h4 text-success m-0">arrive</span>
            <span class="">—</span>
            <big class="transcription text-primary">[əráiv]<span class="ml-2">—</span></big>
            <big class="translation">прибыть</big>
          </div>
    
          <div class="additional-info mt-3 desktop-block d-none d-md-block">
            <div class="description d-flex mb-2">
              <div class="icon-container col-md-2 text-center text-info"><i class="fas fa-graduation-cap"></i></div>
              <div class="text-container">
                <span class="text-primary"><strong>To arrive is to get somewhere</strong></span>
                <span class="">—</span>
                <span class="text-gray">Приехать значит попасть куда-то</span>
              </div>
            </div>
    
            <div class="example d-flex">
              <div class="icon-container col-md-2 text-center text-info"><i class="fas fa-lightbulb"></i></div>
              <div class="text-container">
                <span class="text-text-primary"><strong>They arrived at school at 7 a.m</strong></span>
                <span class="">—</span>
                <span class="text-gray">Они прибыли в школу в 7 часов утра</span>
              </div>
            </div>
          </div>
        </div>
    
    
        <img class="word-image rounded px-0 mr-md-1 order-3 order-md-2 mb-3 mb-md-0" src="https://raw.githubusercontent.com/jekman87/rslang-data/master/files/01_0002.jpg"
          alt="">
    
    
        <div class="buttons-wrapper d-flex order-1 order-md-3 my-3 my-md-0 ml-md-2 flex-md-column justify-content-around justify-content-md-between">
          <button type="button" class="btn btn-outline-primary px-1"><i class="fas fa-volume-up sound-button"></i>
          </button>
          <button type="button" class="btn btn-outline-danger px-1"><i class="fas fa-trash retrieval-button"></i>
          </button>
        </div>
        
        <div class="additional-info order-4 mobile-block col-12 d-md-none px-0 px-md-2">
          <div class="description d-flex">
            <div class="icon-container col-1 text-center text-info p-0 px-md-2"><i class="fas fa-graduation-cap"></i>
            </div>
            <div class="text-container">
              <div>
                <span class="text-primary"><strong>To arrive is to get somewhere</strong></span>
                <span class="">—</span>
              </div>
              <div class="text-gray">Приехать значит попасть куда-то</div>
            </div>
          </div>
          
    
          <div class="example d-flex">
            <div class="icon-container col-1 text-center text-info p-0 px-md-2"><i class="fas fa-lightbulb"></i></div>
            <div class="text-container">
              <div>
                <span class="text-text-primary"><strong>They arrived at school at 7 a.m</strong></span>
                <span class="">—</span>
                <div class="text-gray">Они прибыли в школу в 7 часов утра</div>
              </div>
            </div>
          </div>
        </div>
      </div>
            
    </li>





        </ul>
      </div>
      <div class="tab-pane fade" id="difficult-words">
        <div class="col-12 d-flex justify-content-between">
          <p class="col-4 h3 text-primary">Всего слов: 3</p>
          <div class="form-group col-4">
            <label for="exampleSelect1">Сортировать:</label>
            <select class="form-control" id="exampleSelect1">
              <option>от A до Z</option>
              <option>от Z до A</option>
              <option>по возрастанию прогресса</option>
              <option>по убыванию прогресса</option>
            </select>
          </div>
        </div>
        <ul class="list-group">
          <li class="list-group-item">
            <div class="d-flex justify-content-between">

              <div class="progress-wrapper d-flex col-4 ml-3 align-items-center">
                <div class="progress">
                  <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 35%"
                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="progress-info text-nowrap text-muted ml-2">Где-то уже слышал!</small>
              </div>
              <ol class="d-flex col-7">
                <small class="text-muted"></small>
                <li class="breadcrumb-item"><small class="text-muted">Последняя тренировка: 7дн назад</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Повторов:8</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Следующая тренировка:через 4 часа</small></li>
              </ol>

            </div>
            <div class="word-wrapper d-flex justify-content-between">
              <div class="column" style="line-height: 1.5rem;">


                <span class="word h4 text-danger m-2">agree</span>
                <span class="">—</span>
                <big class="transcription text-primary">[əgríː]<span class="ml-2">—</span></big>
                <big class="translation">согласна</big>
              </div>

              <div class="column col-3 d-flex justify-content-end">

                <img class="rounded px-0 mr-1" src="./assets/vocabulary/image/files/01_0001.jpg" alt="">
                <button type="button" class="btn btn-outline-primary px-1 mr-5"><i
                    class="fas fa-volume-up sound-button"></i></button>
                <button type="button" class="btn btn-outline-success px-1"><i
                    class="fas fa-file-export retrieval-button"></i></button>

              </div>
            </div>
            <div class="additional-info">

              <div class="description d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-graduation-cap"></i></div>
                <div class="text-container">
                  <span class="text-primary"><strong>To agree is to have the same opinion or belief as another
                      person</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Согласиться - значит иметь то же мнение или убеждение, что и другой
                    человек</span>
                </div>
              </div>

              <div class="example d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-lightbulb"></i></div>
                <div class="text-container">
                  <span class="text-text-primary"><strong>The students agree they have too much homework</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Студенты согласны, что у них слишком много домашней работы</span>
                </div>
              </div>
            </div>
          </li>

          <li class="list-group-item">
            <div class="d-flex justify-content-between">

              <div class="progress-wrapper d-flex col-4 ml-3 align-items-center">
                <div class="progress">
                  <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 75%"
                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="progress-info text-nowrap ml-2 text-muted">Нужно потренироваться еще!</small>
              </div>
              <ol class="d-flex col-7">
                <small class="text-muted"></small>
                <li class="breadcrumb-item"><small class="text-muted">Последняя тренировка: 2дн назад</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Повторов:2</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Следующая тренировка:через 2 дн</small></li>
              </ol>

            </div>
            <div class="word-wrapper d-flex justify-content-between">
              <div class="column" style="line-height: 1.5rem;">


                <span class="word h4 text-danger m-2">August</span>
                <span class="">—</span>
                <big class="transcription text-primary">[ɔ́ːgəst]<span class="ml-2">—</span></big>
                <big class="translation">август</big>
              </div>

              <div class="column col-3 d-flex justify-content-end">

                <img class="rounded px-0 mr-1" src="./assets/vocabulary/image/files/01_0004.jpg" alt="">
                <button type="button" class="btn btn-outline-primary px-1 mr-5"><i
                    class="fas fa-volume-up sound-button"></i></button>
                <button type="button" class="btn btn-outline-success px-1"><i
                    class="fas fa-file-export retrieval-button"></i></button>

              </div>
            </div>
            <div class="additional-info">

              <div class="description d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-graduation-cap"></i></div>
                <div class="text-container">
                  <span class="text-primary"><strong>August is the eighth month of the year</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Август - восьмой месяц года</span>
                </div>
              </div>

              <div class="example d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-lightbulb"></i></div>
                <div class="text-container">
                  <span class="text-text-primary"><strong>Is your birthday in August?</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">У тебя день рождения в августе?</span>
                </div>
              </div>
            </div>
          </li>

          <li class="list-group-item">
            <div class="d-flex justify-content-between">

              <div class="progress-wrapper d-flex col-4 ml-3 align-items-center">
                <div class="progress">
                  <div class="progress-bar progress-bar-striped bg-dark" role="progressbar" style="width: 15%"
                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="progress-info text-nowrap text-muted ml-2">Я это точно учил?</small>
              </div>
              <ol class="d-flex col-7">
                <small class="text-muted"></small>
                <li class="breadcrumb-item"><small class="text-muted">Последняя тренировка: 1дн назад</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Повторов:1</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Следующая тренировка:через 4 часа</small></li>
              </ol>

            </div>
            <div class="word-wrapper d-flex justify-content-between">
              <div class="column" style="line-height: 1.5rem;">


                <span class="word h4 text-danger m-2">boat</span>
                <span class="">—</span>
                <big class="transcription text-primary">[bout]<span class="ml-2">—</span></big>
                <big class="translation">лодка</big>
              </div>

              <div class="column col-3 d-flex justify-content-end">

                <img class="rounded px-0 mr-1" src="./assets/vocabulary/image/files/01_0005.jpg" alt="">
                <button type="button" class="btn btn-outline-primary px-1 mr-5"><i
                    class="fas fa-volume-up sound-button"></i></button>
                <button type="button" class="btn btn-outline-success px-1"><i
                    class="fas fa-file-export retrieval-button"></i></button>

              </div>
            </div>
            <div class="additional-info">

              <div class="description d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-graduation-cap"></i></div>
                <div class="text-container">
                  <span class="text-primary"><strong>A boat is a vehicle that moves across water</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Лодка - это транспортное средство, которое движется по воде</span>
                </div>
              </div>

              <div class="example d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-lightbulb"></i></div>
                <div class="text-container">
                  <span class="text-text-primary"><strong>There is a small boat on the lake</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">На озере есть маленькая лодка</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>


      <div class="tab-pane fade" id="deleted-words">
        <div class="col-12 d-flex justify-content-between">
          <p class="col-4 h3 text-primary">Всего слов: 3</p>
          <div class="form-group col-4">
            <label for="exampleSelect1">Сортировать:</label>
            <select class="form-control" id="exampleSelect1">
              <option>от A до Z</option>
              <option>от Z до A</option>
              <option>по возрастанию прогресса</option>
              <option>по убыванию прогресса</option>
            </select>
          </div>
        </div>
        <ul class="list-group">
          <li class="list-group-item">
            <div class="d-flex justify-content-between">

              <div class="progress-wrapper d-flex col-4 ml-3 align-items-center">
                <div class="progress">
                  <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 35%"
                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="progress-info text-nowrap text-muted ml-2">Где-то уже слышал!</small>
              </div>
              <ol class="d-flex col-7">
                <small class="text-muted"></small>
                <li class="breadcrumb-item"><small class="text-muted">Последняя тренировка: 7дн назад</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Повторов:8</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Следующая тренировка:через 4 часа</small></li>
              </ol>

            </div>
            <div class="word-wrapper d-flex justify-content-between">
              <div class="column" style="line-height: 1.5rem;">


                <span class="word h4 text-secondary m-2">agree</span>
                <span class="">—</span>
                <big class="transcription text-primary">[əgríː]<span class="ml-2">—</span></big>
                <big class="translation">согласна</big>
              </div>

              <div class="column col-3 d-flex justify-content-end">

                <img class="rounded px-0 mr-1" src="./assets/vocabulary/image/files/01_0001.jpg" alt="">
                <button type="button" class="btn btn-outline-primary px-1 mr-5"><i
                    class="fas fa-volume-up sound-button"></i></button>
                <button type="button" class="btn btn-outline-success px-1"><i
                    class="fas fa-trash-restore retrieval-button"></i></button>

              </div>
            </div>
            <div class="additional-info">

              <div class="description d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-graduation-cap"></i></div>
                <div class="text-container">
                  <span class="text-primary"><strong>To agree is to have the same opinion or belief as another
                      person</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Согласиться - значит иметь то же мнение или убеждение, что и другой
                    человек</span>
                </div>
              </div>

              <div class="example d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-lightbulb"></i></div>
                <div class="text-container">
                  <span class="text-text-primary"><strong>The students agree they have too much homework</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Студенты согласны, что у них слишком много домашней работы</span>
                </div>
              </div>
            </div>
          </li>

          <li class="list-group-item">
            <div class="d-flex justify-content-between">

              <div class="progress-wrapper d-flex col-4 ml-3 align-items-center">
                <div class="progress">
                  <div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 75%"
                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="progress-info text-nowrap ml-2 text-muted">Нужно потренироваться еще!</small>
              </div>
              <ol class="d-flex col-7">
                <small class="text-muted"></small>
                <li class="breadcrumb-item"><small class="text-muted">Последняя тренировка: 2дн назад</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Повторов:2</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Следующая тренировка:через 2 дн</small></li>
              </ol>

            </div>
            <div class="word-wrapper d-flex justify-content-between">
              <div class="column" style="line-height: 1.5rem;">


                <span class="word h4 text-secondary m-2">August</span>
                <span class="">—</span>
                <big class="transcription text-primary">[ɔ́ːgəst]<span class="ml-2">—</span></big>
                <big class="translation">август</big>
              </div>

              <div class="column col-3 d-flex justify-content-end">

                <img class="rounded px-0 mr-1" src="./assets/vocabulary/image/files/01_0004.jpg" alt="">
                <button type="button" class="btn btn-outline-primary px-1 mr-5"><i
                    class="fas fa-volume-up sound-button"></i></button>
                <button type="button" class="btn btn-outline-success px-1"><i
                    class="fas fa-trash-restore retrieval-button"></i></button>

              </div>
            </div>
            <div class="additional-info">

              <div class="description d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-graduation-cap"></i></div>
                <div class="text-container">
                  <span class="text-primary"><strong>August is the eighth month of the year</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Август - восьмой месяц года</span>
                </div>
              </div>

              <div class="example d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-lightbulb"></i></div>
                <div class="text-container">
                  <span class="text-text-primary"><strong>Is your birthday in August?</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">У тебя день рождения в августе?</span>
                </div>
              </div>
            </div>
          </li>

          <li class="list-group-item">
            <div class="d-flex justify-content-between">

              <div class="progress-wrapper d-flex col-4 ml-3 align-items-center">
                <div class="progress">
                  <div class="progress-bar progress-bar-striped bg-dark" role="progressbar" style="width: 15%"
                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <small class="progress-info text-nowrap text-muted ml-2">Я это точно учил?</small>
              </div>
              <ol class="d-flex col-7">
                <small class="text-muted"></small>
                <li class="breadcrumb-item"><small class="text-muted">Последняя тренировка: 1дн назад</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Повторов:1</small></li>
                <li class="breadcrumb-item"><small class="text-muted">Следующая тренировка:через 4 часа</small></li>
              </ol>

            </div>
            <div class="word-wrapper d-flex justify-content-between">
              <div class="column" style="line-height: 1.5rem;">


                <span class="word h4 text-secondary m-2">boat</span>
                <span class="">—</span>
                <big class="transcription text-primary">[bout]<span class="ml-2">—</span></big>
                <big class="translation">лодка</big>
              </div>

              <div class="column col-3 d-flex justify-content-end">

                <img class="rounded px-0 mr-1" src="./assets/vocabulary/image/files/01_0005.jpg" alt="">
                <button type="button" class="btn btn-outline-primary px-1 mr-5"><i
                    class="fas fa-volume-up sound-button"></i></button>
                <button type="button" class="btn btn-outline-success px-1"><i
                    class="fas fa-trash-restore retrieval-button"></i></button>

              </div>
            </div>
            <div class="additional-info">

              <div class="description d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-graduation-cap"></i></div>
                <div class="text-container">
                  <span class="text-primary"><strong>A boat is a vehicle that moves across water</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">Лодка - это транспортное средство, которое движется по воде</span>
                </div>
              </div>

              <div class="example d-flex">
                <div class="icon-container col-1 text-center text-info"><i class="fas fa-lightbulb"></i></div>
                <div class="text-container">
                  <span class="text-text-primary"><strong>There is a small boat on the lake</strong></span>
                  <span class="">—</span>
                  <span class="text-gray">На озере есть маленькая лодка</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        </div>
      </div>
    </div>
    `;
}
