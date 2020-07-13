const promoGames = [
  {
    id: '1',
    name: 'English Puzzle',
    img: ['/assets/games-img/puzzle/1.png',
      '/assets/games-img/puzzle/2.png',
      '/assets/games-img/puzzle/3.png',
      '/assets/games-img/puzzle/4.png'],
    preview: 'Изучай английский и живопись вместе! Собери паззл правильно и получи произведение искусства в личную коллекцию!',
    description: `English Puzzle - мини-игра на прохождение. Цель игры - собрать коллекцию из 200 картин в личной галерее. В отличие от других мини-игр, ориентирована в основном на правила построения предложений в английском языке, а не на изучение новых слов. Игра имеет 6 уровней сложности на каждом из которых от 25 до 45 раундов. Суммарно игра насчитывает 200 раундов (что соответствует количеству картин), в каждом из которых пользователю предлагается собрать 10 предложений из слов оформленных в виде элементов паззла.<br>
    Чтобы собрать предложение, пользователю необходимо составить слова в правильном порядке, кликая по ним в правильном порядке или просто перетягивая в нужную область. Если предложение собрано правильно, пользователь переходит к следующему. Если предложение собрано неверно, пользователь имеет возможность либо попробовать еще раз (слова при этом снова перемешиваются) либо перейти к следующему предложению (текущее предложение соберется автоматически). Также если пользователь не знает, как собрать предложение, он может перейти к следующему, нажав "Не знаю" (текущее предложение соберется автоматически).<br>
    В игре присутствую 4 подсказки: предварительное произношение предложения, произношение предложения по клику, перевод предложения и фоновый рисунок на паззле. Выбирать подсказки можно в любых сочетаниях. После того как предложение собрано, автоматически срабатывают неиспользованные подсказки.<br>
    Раунд считается пройденным, когда все предложения собраны (пользователем или автоматически). Однако увидеть картину целиком и получить ее в свою личную коллекцию можно только если пользовать самостоятельно собрал все 10 предложений правильно. В конце раунда пользователь может посмотреть результаты раунда, статистику ранее сыгранных игр, а также картины, которые он выиграл за все время игры.<br>
    Играя в English Puzzle, Вы не только научитесь правильно составлять предложения на английском языке, но также сможете расширить свой кругозор собирая коллекцию картин. Ведь в игре представлены настоящие шедевры живописи.`,
  },
  {
    id: '2',
    name: 'Аудиовызов',
    img: ['/assets/games-img/audiocall/1.png',
      '/assets/games-img/audiocall/2.png',
      '/assets/games-img/audiocall/3.png',
      '/assets/games-img/audiocall/4.png'],
    preview: 'Тренировка улучшает восприятие английской речи на слух.',
    description: `Тренировка делает упор только на восприятие и перевод. С каждым подходом ты будешь все лучше и лучше понимать английскую речь и, не задумываясь, переводить сказанное на родной язык!<br>
    Что происходит в процессе?<br>
    Ты слышишь слово и видишь 5 вариантов его перевода. При этом не видишь, как это слово пишется по-английски. Твоя задача выбрать правильный перевод озвученного слова.`,
  },
  {
    id: '3',
    name: 'Саванна',
    img: ['/assets/games-img/savanna/1.png',
      '/assets/games-img/savanna/2.png',
      '/assets/games-img/savanna/3.png',
      '/assets/games-img/savanna/4.png'],
    preview: 'Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем легче тебе будет общаться.',
    description: `Вы долго путешествовали по миру изучения английского языка и попали в сказочные саванны, и никак не можете выбраться оттуда. И вдруг откуда-то появился старец со странным кристаллом.  Он предлагает вам перевести 30 слов, и тем самым зарядить кристалл. Кристалл заряжается только правильными ответами. Неправильные ответы огорчают старца. Если вы огорчите старца 5 раз, он исчезнет. Если вы сможете перевести 30 слов, и не огорчить старца 5 раз, он подскажет вам дорогу к вашей цели.<br>
    Готовы ли вы сыграть на его условиях?`,
  },
  {
    id: '4',
    name: 'Спринт',
    img: ['/assets/games-img/sprint/1.png',
      '/assets/games-img/sprint/2.png',
      '/assets/games-img/sprint/3.png',
      '/assets/games-img/sprint/4.png'],
    preview: 'Истинная гонка на проверку знаний. Укажите верно ли приведен перевод слова?',
    description: 'Спринт - пожалуй самая экстремальная игра со всего набора RSLang. Здесь вам предстоит угадать перевод как можно большего количества слов за один раунд, который в свою очередь длится 60 секунд. В игре предусмотрена накопительная система бонусов - за каждые четыре правильных ответа вы получаете новый уровень преимуществ в виде дополнительных баллов и времени. В конце каждого раунда отображаются текущая статистика со всеми пройденными словами, их транскрипцией, корректным переводом и произношением. Также вы можете посмотреть долгосрочную статистику со всеми предыдущими играми и оценить свой прогресс.',
  },
  {
    id: '5',
    name: 'SpeakIt',
    img: ['/assets/games-img/speakit/1.jpg',
      '/assets/games-img/speakit/2.jpg',
      '/assets/games-img/speakit/3.jpg',
      '/assets/games-img/speakit/4.jpg'],
    preview: 'Игра SpeakIt поможет вам говорить так, чтобы вас понимали! Вы ведь хотите этого?!',
    description: `SpeakIt - это одна из игр нашего набора, при помощи которой можно прослушать произношение английских слов для понимания, как правильно говорить те или иные звуки. <br>
    Но это не все! Вы также можете потренировать собственное произношение! Для этого, используя технологию распознавания речи Google Web Speech API, вы без необходимости в живом собеседнике отточите навык произношения. Все, что вам нужно сделать, это нажать на кнопку "Говорить" и произносить по очереди слова, которые отображены на карточках, в любом порядке, пока система распознавания речи не поймет вас. Для вашего удобства в игре есть помощь, обратившись к которой, вы сможете услышать как произносятся звуки английского языка по отдельности. Как результат, не каждый иностранец поймет, что английский не ваш родной язык!`,
  },
  {
    id: '6',
    name: 'Загадка-отгадка',
    img: ['/assets/games-img/riddle/1.png',
      '/assets/games-img/riddle/2.png',
      '/assets/games-img/riddle/3.png',
      '/assets/games-img/riddle/4.png'],
    preview: 'Задействуй знания английского языка и кругозор для решения лучших загадок со всего мира.',
    description: `Загадка-отгадка - она же "Своя игра", она же самая размеренная, но в то же время интересная и затягивающая игра со всего набора RSLang.<br>
    С самого детства мы любим загадки, не правда ли? Чем старше мы становимся, тем больше серьёзных повседневных задач мы решаем каждый день. Но порой просто хочется остановиться и провести время за старыми-добрыми квестами или же взять себя в руки и использовать время максимально рационально, укрепить свои знания решая более сложные теоретические задачи. Эта развивающая игра как раз совмещает в себе два последних состояния.<br>
    Здесь вас никто не будет подгонять - никаких таймеров, никаких заучиваний слов и правил, баллов и сложной статистики - только вы, ваш кругозор, знания английского языка и самые лучше загадки со всего мира.<br>
    В игре 6 уровней сложности, в каждом из которых по 15 загадок. Чем дальше вы будете продвигаться, тем сложнее буду загадки. В игре предусмотрены подсказки и общая статистика, которая отображает прогресс продвижения по каждому уровню сложности.`,
  },
];

export { promoGames as default };
