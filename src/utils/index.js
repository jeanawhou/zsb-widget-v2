import { mapValues, isPlainObject, camelCase, mapKeys, isEmpty } from 'lodash';

import { ZSB_CHAT_BREAKER_ENCONDING } from 'src/constants/chat';
import { COMPONENT_PROPS, PROPS_TO_DEPRECATED } from 'src/constants/index';
import { getHexString, isHexColor } from './colors';

const camelCaseKeys = (key) => {
  const componentPropIndex = COMPONENT_PROPS.findIndex((prop) => prop.toLowerCase() === key.toLowerCase());
  if (componentPropIndex >= 0) {
    const deprecatedProp = PROPS_TO_DEPRECATED.find(({ old }) => old.toLowerCase() === key.toLowerCase());
    if (!isEmpty(deprecatedProp)) {
      console.error(
        `Deprecated zsb property warning. Please use "${deprecatedProp.new}" instead of "${deprecatedProp.old}"`,
      );
      return deprecatedProp.new;
    }
    return COMPONENT_PROPS[componentPropIndex];
  } else {
    return camelCase(key);
  }
};

export const parseValues = (value) => {
  const isHex = isHexColor(value);
  if (isHex) {
    return getHexString(value);
  }
  return value === 'true' || value === 'false' ? JSON.parse(value) : value;
};

export const reconcileProps = (obj) => {
  console.log('obj obj', obj);
  if (isPlainObject(obj)) {
    return mapValues(
      mapKeys(obj, (_, key) => camelCaseKeys(key)),
      (value) => {
        if (isPlainObject(value)) {
          return reconcileProps(value);
        }
        return parseValues(value);
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
