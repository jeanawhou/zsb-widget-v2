import { AES, enc } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

import { getLocalStorageItem } from 'src/services/global.service';

export const getTimeStamp = () => {
  return new Date().toLocaleTimeString();
};

export const decrypt = (bot, key = '') => {
  return bot ? JSON.parse(AES.decrypt(bot.toString(), key).toString(enc.Utf8)) : null;
};

export const getStoredInteractions = (maxInteractionHistory) => {
  const interactionHistory = getLocalStorageItem('context');
  const interactionList = getLocalStorageItem('interactions');
  if (interactionList?.length > maxInteractionHistory * 2) {
    interactionList.splice(0, 2);
  }
  return interactionHistory ? interactionList || [] : [];
};

export const generateUUID = () => uuidv4();
