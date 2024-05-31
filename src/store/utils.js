import { AES, enc } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty, isPlainObject } from 'lodash';

import { getLocalStorageItem } from 'src/services/global.service';
import { LAUNCHER_ONLY_ICONS } from 'src/constants/chat';
import { ICON_OPTIONS } from 'src/constants';

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

export const isUrl = (string) => {
  try {
    return Boolean(new URL(string));
  } catch (e) {
    return false;
  }
};

export const getChatWidgetAvatar = (avatar, type, fallbackLauncherAvatar, isLauncherAnIcon) => {
  // icon type check
  const isIcon = type === 'icon' && isLauncherAnIcon;
  if (isIcon) {
    if (!LAUNCHER_ONLY_ICONS.includes(avatar)) {
      return fallbackLauncherAvatar;
    }
    return null;
  } else if (
    // avatar is null check
    type.toLowerCase() === 'none' &&
    (!avatar === 'none' || !avatar)
  ) {
    return null;
  }
  // amazing lodash isEmpty()!
  // checks if string, array or object types is empty
  else if (!isEmpty(avatar)) {
    if (isPlainObject(avatar)) {
      return avatar;
    } else if (avatar?.toLowerCase() !== 'none') {
      if (ICON_OPTIONS.includes(avatar)) {
        return !LAUNCHER_ONLY_ICONS.includes(avatar) ? avatar : null;
      }
      return isUrl(avatar) ? avatar : isIcon ? fallbackLauncherAvatar : null;
    }
    return null;
  }
  return null;
};

export const shouldShowChatWidgetAvatar = (avatar, type) => {
  const lowerCasedAvatar = typeof avatar === 'string' ? avatar.toLowerCase() : '';
  if (!isEmpty(avatar)) {
    if (type?.toLowerCase() !== 'none') {
      if (!isEmpty(avatar)) {
        if (typeof avatar === 'string') {
          return lowerCasedAvatar !== 'none' && avatar.toLowerCase() !== 'custom';
        }
        return true;
      }
      return false;
    }
    return !LAUNCHER_ONLY_ICONS.includes(avatar);
  }
  return false;
};
