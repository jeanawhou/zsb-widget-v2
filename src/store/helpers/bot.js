import { reconcileProps } from 'src/utils';

export const extractPublicKeys = (pub) => {
  return {
    sentinel: pub.snt,
    graph: pub.nd,
    wlk: pub.wlk,
    key: pub.key,
  };
};

export const extractWidgetUI = (config = {}, props = {}) => {
  const configProps = reconcileProps(config);
  const widgetProps = reconcileProps(props);
  return {
    // overwrite config props with component props
    ...configProps,
    ...widgetProps,
  };
};
