import { capitalize } from './utils';

function getMethodName(eventName) {
  if (typeof eventName !== 'string') {
    return '';
  }
  return `on${capitalize(eventName)}`;
}

export default class DomListener {
  constructor($root, listeners = []) {
    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}
