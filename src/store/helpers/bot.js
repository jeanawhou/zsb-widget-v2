import { camelCaseKeys } from 'src/utils';

export const extractPublicKeys = (pub) => {
  return {
    sentinel: pub.snt,
    graph: pub.nd,
    wlk: pub.wlk,
    key: pub.key,
  };
};

export const extractWidgetUI = (config = {}, props = {}) => {
  const configProps = camelCaseKeys(config);
  const widgetProps = camelCaseKeys(props);
  return {
    // overwrite config props with component props
    ...configProps,
    ...widgetProps,
  };
};
