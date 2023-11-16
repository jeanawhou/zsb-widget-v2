import { AES, enc } from 'crypto-js';

export const getTimeStamp = () => {
  return new Date().toLocaleTimeString();
};

export const decrypt = (bot, key = '') => {
  return bot ? JSON.parse(AES.decrypt(bot.toString(), key).toString(enc.Utf8)) : null;
};

export const encrypt = (bot, key = '') => {
  return bot ? AES.encrypt(JSON.stringify(bot), key).toString() : '';
};
