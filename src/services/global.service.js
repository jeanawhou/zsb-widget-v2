import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const fingerPrintJs = () => {
    const fpPromise = FingerprintJS.load();
    return fpPromise
      .then((fp) => fp.get())
      .then((result) => result.visitorId)
      .catch((error) => console.error(error));
  };

export const setLocalStorageItem = (item, name = '') => {
  return localStorage.setItem(name, JSON.stringify(item))
}

export const getLocalStorageItem = (name = '') => {
  return JSON.parse(localStorage.getItem(name))
}

export const clearLocalStorageItem = () => {
  localStorage.clear();
}