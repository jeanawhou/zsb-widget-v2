import { mapValues, isPlainObject, camelCase, mapKeys } from 'lodash';
import { ZSB_CHAT_BREAKER_ENCONDING } from 'src/constants/chat';
import { COMPONENT_PROPS } from 'src/constants/index';

const _camelCaseKeys = (key) => {
  const componentPropIndex = COMPONENT_PROPS.findIndex((prop) => prop.toLowerCase() === key.toLowerCase());
  if (componentPropIndex >= 0) {
    return COMPONENT_PROPS[componentPropIndex];
  } else {
    return camelCase(key);
  }
};

export const camelCaseKeys = (obj) => {
  if (isPlainObject(obj)) {
    return mapValues(
      mapKeys(obj, (_, key) => _camelCaseKeys(key)),
      (value) => {
        if (isPlainObject(value)) {
          return camelCaseKeys(value);
        }
        return value === 'true' || value === 'false' || value === 'null' || value === 'undefined'
          ? JSON.parse(value)
          : value;
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
