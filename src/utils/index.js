import { mapValues, isPlainObject, camelCase, mapKeys } from 'lodash';
import { ZSB_CHAT_BREAKER_ENCONDING } from 'src/constants/chat';

export const camelCaseKeys = (obj) => {
  if (isPlainObject(obj)) {
    return mapValues(
      mapKeys(obj, (_, key) => camelCase(key)),
      (value) => {
        if (isPlainObject(value)) {
          return camelCaseKeys(value);
        }
        return value;
      },
    );
  }
  return obj;
};

export const hasZSBChatBreakerEncoding = (value) => {
  if (value && typeof value === 'string') {
    return value.includes(ZSB_CHAT_BREAKER_ENCONDING);
  }
  return false;
};
