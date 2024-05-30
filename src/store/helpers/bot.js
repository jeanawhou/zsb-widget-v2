import { reconcileProps } from 'src/utils';

export const extractPublicKeys = (pubAskedQuestion) => {
  return {
    sentinel: pubAskedQuestion.snt,
    graph: pubAskedQuestion.nd,
    key: pubAskedQuestion.key,
    wlk: pubAskedQuestion.wlk,
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
