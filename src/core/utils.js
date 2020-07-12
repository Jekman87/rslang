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

const getResetDayTime = (resetHour) => {
  const time = new Date();
  const hour = time.getHours();
  if (hour >= resetHour) time.setDate(time.getDate() + 1);
  const resetDayTime = time.setHours(resetHour, 0);

  return resetDayTime;
};

const getStartDayTime = (resetHour) => {
  const time = new Date();
  const hour = time.getHours();
  if (hour <= resetHour) time.setDate(time.getDate() - 1);
  const resetDayTime = time.setHours(resetHour, 0);

  return resetDayTime;
};

export {
  capitalize, delay, storage, getResetDayTime, getStartDayTime,
};
