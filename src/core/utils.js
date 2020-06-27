const capitalize = (string) => {
  if (typeof string !== 'string') {
    return '';
  }
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

function storage(key, data) {
  if (arguments.length === 1) {
    return JSON.parse(localStorage.getItem(key));
  }
  if (data === null) {
    localStorage.removeItem(key);
    return true;
  }
  localStorage.setItem(key, JSON.stringify(data));
  return true;
}

export { capitalize, delay, storage };
