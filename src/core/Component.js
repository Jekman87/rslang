import DomListener from './DomListener';

export default class Component extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.observer = options.observer;
    this.unSubscribers = [];
    this.dataForApp = options.dataForApp;
  }

  init() {
    this.initDomListeners();
  }

  emit(eventName, ...args) {
    this.observer.emit(eventName, ...args);
  }

  subscribe(eventName, fn) {
    const unsub = this.observer.subscribe(eventName, fn);
    this.unSubscribers.push(unsub);
  }

  destroy() {
    this.removeDomListeners();
    this.unSubscribers.forEach((unsub) => unsub());
  }

  toHTML() {
    return '';
  }
}
