import { mapValues, isObject, camelCase, mapKeys } from 'lodash'

export const camelCaseKeys = (obj) => {
  if (isObject(obj)) {
    return mapValues(mapKeys(obj, (_, key) => camelCase(key)), (value) => {
      if (isObject(value) && !Array.isArray(value)) {
        return camelCaseKeys(value);
      }
      return value;
    });
  }
  return obj;
}