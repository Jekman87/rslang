const LOCAL_ASSETS_URL = '/assets/speakit';
const ASSETS_URL = 'https://raw.githubusercontent.com/vviiiii/rslang-data/master/data';
const PRONOUNCE_URL = 'https://www.native-english.ru/audio/pronounce';

const MAX_WORDS_PAGES = 29;
const MAX_WORDS_LEVEL = 5;

const PER_GAME_WORDS = 10;
const MAX_HISTORY_LIST_COUNT = 20;

const GAME_MODE = ['dictionary', 'rounds'];

const GAME_DEFAULT_STATE = {
  gameLevel: {
    level: 0,
    round: 0,
    group: 0,
  },
  gameWords: [],
  correct: 0,
  successWords: [],
  words: [],
  mode: GAME_MODE[0],
  dictionaryCount: 0,
};

export {
  ASSETS_URL,
  LOCAL_ASSETS_URL,
  MAX_WORDS_PAGES,
  MAX_WORDS_LEVEL,
  PER_GAME_WORDS,
  MAX_HISTORY_LIST_COUNT,
  GAME_DEFAULT_STATE,
  PRONOUNCE_URL,
  GAME_MODE,
};
