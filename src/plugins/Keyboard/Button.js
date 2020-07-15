import buttonConfig from './buttonConfig';
import { caseConfig } from './constants';

export default class Button {
  constructor(row, col) {
    this.button = null;
    this.row = row;
    this.col = col;
  }

  createButton() {
    const buttonCode = buttonConfig.code[this.row][this.col];

    this.button = document.createElement('button');
    this.button.classList.add('button', buttonCode);

    const enSet = this.createLangSet('En');
    const ruSet = this.createLangSet('Ru');

    this.button.append(enSet, ruSet);

    return this.button;
  }

  createLangSet(lang) {
    const langSet = document.createElement('span');
    langSet.classList.add(lang);

    const keys = Object.keys(caseConfig);

    for (let i = 0; i < keys.length; i += 1) {
      const langChar = document.createElement('span');
      langChar.classList.add(caseConfig[keys[i]]);

      const propOfConfig = `${caseConfig[keys[i]]}${lang}`;
      langChar.textContent = buttonConfig[propOfConfig][this.row][this.col];

      langSet.append(langChar);
    }

    return langSet;
  }
}
