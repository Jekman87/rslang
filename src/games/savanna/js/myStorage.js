export function setSettingsToStorage(name, value) {
  window.localStorage.setItem(`${name}`, JSON.stringify(value));
}

export function getSettingsFromStorage(name) {
  return JSON.parse(window.localStorage.getItem(`${name}`) || JSON.stringify(null));
}
