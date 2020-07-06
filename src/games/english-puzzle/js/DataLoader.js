/* eslint-disable no-param-reassign */
import paintings from './paintingsInfo';

export default class Loader {
  constructor(storage, reporter) {
    this.storage = storage;
    this.reporter = reporter;
    this.data = {};
  }

  init() {
    document.addEventListener('dataRequired', this.handleDataRequest.bind(this));
  }

  handleDataRequest() {
    const group = this.get('currentLevel') - 1;
    const page = this.get('currentRound') - 1;
    this.getData(group, page);
  }

  getData(group, page) {
    if (!this.data[`${group}_${page}`]) {
      this.loadData(group, page);
    } else {
      this.set('sentencesData', this.data[`${group}_${page}`].sentencesInfo);
      this.set('paintingData', this.data[`${group}_${page}`].pictureInfo);
      document.dispatchEvent(new CustomEvent('newData'));
    }
  }

  async loadData(group, page) {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`);
      if (!response.ok) {
        throw new Error('Загрузка данных не удалась!');
      }
      const data = await response.json();

      const sentencesInfo = [];
      data.forEach((item) => {
        const sentence = Loader.formatString(item.textExample);
        sentencesInfo.push({
          text: sentence,
          audio: item.audioExample,
          translate: item.textExampleTranslate,
        });
      });

      const audios = await Promise.all(
        sentencesInfo.map(async (item) => {
          const audioResponse = await fetch(`https://raw.githubusercontent.com/torchik-slava/rslang-data/master/${item.audio}`);
          if (!audioResponse.ok) {
            throw new Error('Загрузка аудио не удалась!');
          }
          const audio = await audioResponse.blob();
          return URL.createObjectURL(audio);
        }),
      );

      sentencesInfo.forEach((item, index) => {
        item.audio = audios[index];
      });

      const pictureInfo = await this.loadPicture(group, page);

      this.data[`${group}_${page}`] = { sentencesInfo, pictureInfo };
      this.set('sentencesData', sentencesInfo);
      this.set('paintingData', pictureInfo);

      document.dispatchEvent(new CustomEvent('newData'));
    } catch (e) {
      this.report(e.message, false);
    }
  }

  static formatString(str) {
    let result = str.replace(/<[\\/\w]{1,2}>/g, '');
    result = result.replace('.', '');
    result = result.split(' ');
    return result;
  }

  async loadPicture(group, page) {
    const infoObj = {
      name: paintings[group][page].name,
      author: paintings[group][page].author,
      year: paintings[group][page].year,
    };

    const picPass = paintings[group][page].cutSrc;
    const picResponse = await fetch(`https://raw.githubusercontent.com/torchik-slava/rslang_data_paintings/master/${picPass}`);
    if (!picResponse.ok) {
      throw new Error('Загрузка изображения не удалась!');
    }
    const pic = await picResponse.blob();
    infoObj.link = URL.createObjectURL(pic);

    return infoObj;
  }

  get(prop) {
    return this.storage.getProp(prop);
  }

  set(prop, value) {
    this.storage.setProp(prop, value);
  }

  report(message, isSucces) {
    this.reporter.report(message, isSucces);
  }
}
