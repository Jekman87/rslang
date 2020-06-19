const capitalize = (string) => {
  if (typeof string !== 'string') {
    return '';
  }
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

export { capitalize, delay };
