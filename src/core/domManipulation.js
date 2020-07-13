class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.innerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  addClass(className) {
    if (className) {
      this.$el.classList.add(className);
      return this;
    }
    return false;
  }

  hasClass(className) {
    return this.$el.classList.contains(className);
  }

  closest(className) {
    return this.$el.closest(className);
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  toggle(className) {
    this.$el.classList.toggle(className);
    return this;
  }

  find(selector) {
    return $$(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  getElement() {
    return this.$el;
  }

  get data() {
    return this.$el.dataset;
  }

  text(text) {
    if (typeof text !== 'undefined') {
      if (['input'].includes(this.$el.tagName.toLowerCase())) {
        this.$el.value = text;
      } else {
        this.$el.textContent = text;
      }
      return this;
    }
    if (['input', 'select'].includes(this.$el.tagName.toLowerCase())) {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  css(styles = {}) {
    Object
      .keys(styles)
      .forEach((key) => {
        this.$el.style[key] = styles[key];
      });
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  removeAttr(name) {
    this.$el.removeAttribute(name);
  }

  append(node) {
    let nodeElement = node;
    if (node instanceof Dom) {
      nodeElement = node.$el;
    }
    this.$el.append(nodeElement);
    return this;
  }

  on(eventType, callBack) {
    this.$el.addEventListener(eventType, callBack);
  }

  off(eventType, callBack) {
    this.$el.removeEventListener(eventType, callBack);
  }
}

export default function $$(selector) {
  return new Dom(selector);
}

$$.create = (tagName, classes = '') => {
  const $el = document.createElement(tagName);
  if (classes) {
    $el.classList.add(classes);
  }
  return $$($el);
};
