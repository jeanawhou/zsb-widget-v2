import PropTypes from 'prop-types';

import ChatWidget from './ChatWidget';
import ComponentWidget from './ComponentWidget';
import useZSBWidget from './hooks';

const ZSBWidget = (props) => {
  const { isChatWidget, isWidgetReady } = useZSBWidget({ props });

  return isWidgetReady ? isChatWidget ? <ChatWidget {...props} /> : <ComponentWidget /> : <div></div>;
};

ZSBWidget.defaultProps = {
  title: '',
  subtitle: '',
  placeholder: '',
  bot: '',
};

ZSBWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  bot: PropTypes.string,
  type: PropTypes.string,
};

export default ZSBWidget;
