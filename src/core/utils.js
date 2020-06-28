const capitalize = (string) => {
  if (typeof string !== 'string') {
    return '';
  }
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
  return true;
};

storage.remove = (key) => {
  localStorage.removeItem(key);
};

export { capitalize, delay, storage };
