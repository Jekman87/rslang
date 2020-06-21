import paintings from './paintingsInfo.js';

export default class Loader {
  constructor() {
    this.data = {};
    this.reportEl = document.querySelector('p.report-message');
  }

  init() {
    document.addEventListener('dataRequired', this.handleDataRequest.bind(this));
  }

  handleDataRequest(e) {
    this.defineParams(e.detail);
    this.getData();
  }

  defineParams(arr) {
    const [round, level] = arr;
    this.page = round - 1;
    this.group = level - 1;
  }

  getData() {
    if (!this.data[`${this.group}_${this.page}`]) {
      this.loadData();
    } else {
      document.dispatchEvent(new CustomEvent('newData', { detail: { data: this.data[`${this.group}_${this.page}`], position: [this.page + 1, this.group + 1] } }));
    }
  }

  async loadData() {
    try {
      const response = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?group=${this.group}&page=${this.page}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`);
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
            this.report('Audio upload failed!');
            throw new Error();
          }
          const audio = await audioResponse.blob();
          return URL.createObjectURL(audio);
        }),
      );

      sentencesInfo.forEach((item, index) => {
        item.audio = audios[index];
      });

      const pictureInfo = await this.loadPicture();

      this.data[`${this.group}_${this.page}`] = { sentencesInfo, pictureInfo };
      console.log(this.data[`${this.group}_${this.page}`]);
      document.dispatchEvent(new CustomEvent('newData', { detail: { data: this.data[`${this.group}_${this.page}`], position: [this.page + 1, this.group + 1] } }));
    } catch (e) {
      this.report('Something went wrong!');
    }
  }

  static formatString(str) {
    let result = str.replace(/<[\\/\w]{1,2}>/g, '');
    result = result.replace('.', '');
    result = result.split(' ');
    return result;
  }

  async loadPicture() {
    const infoObj = {
      name: paintings[this.group][this.page].name,
      author: paintings[this.group][this.page].author,
      year: paintings[this.group][this.page].year,
    };

    const picPass = paintings[this.group][this.page].cutSrc;
    const picResponse = await fetch(`https://raw.githubusercontent.com/torchik-slava/rslang_data_paintings/master/${picPass}`);
    if (!picResponse.ok) {
      this.report('Picture upload failed!');
      throw new Error();
    }
    const pic = await picResponse.blob();
    infoObj.link = URL.createObjectURL(pic);

    return infoObj;
  }

  report(message) {
    this.reportEl.textContent = message;
    this.reportEl.classList.remove('report-message_hidden');
    setTimeout(() => {
      this.reportEl.classList.add('report-message_hidden');
    }, 2500);
  }
}
