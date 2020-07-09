/**
 * @param {String} el
 * @param {String} classNames
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 * @param  {...array} dataAttr
 */

export default function createEssence(el, classNames, child, parent, ...dataAttr) {
  const newElement = document.createElement(el);

  if (classNames) newElement.classList.add(...classNames.split(' '));

  if (child && Array.isArray(child)) {
    child.forEach((childElement) => childElement && newElement.append(childElement));
  } else if (child && typeof child === 'object') {
    newElement.append(child);
  } else if (child && typeof child === 'string') {
    newElement.innerHTML = child;
  }

  if (parent) {
    parent.append(newElement);
  }

  if (dataAttr.length) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        newElement.setAttribute(attrName, '');
      } else if (attrName.match(/value|id|src|alt|href|target/)) {
        newElement.setAttribute(attrName, attrValue);
      } else {
        newElement.dataset[attrName] = attrValue;
      }
    });
  }
  return newElement;
}
