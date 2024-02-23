import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Context } from 'src/store/store';
import { DECRYPT_BOT, SET_WIDGET_CONFIG } from 'src/store/action';
import ChatWidget from './ChatWidget';
import useSelector from 'src/store/useSelector';
import { configURLSelector, isWidgetReadySelector } from 'src/store/selectors';

const ZSBWidget = (props) => {
  const isChatWidget = props?.type === 'chat' || !props?.type;
  const [, dispatch] = useContext(Context);
  const configURL = useSelector(configURLSelector);
  const isWidgetReady = useSelector(isWidgetReadySelector);

  const fetchConfigProps = () => {
    fetch(configURL)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: SET_WIDGET_CONFIG,
          payload: { configJSON: res, widgetProps: props },
        });
      });
  };

  useEffect(() => {
    if (configURL) {
      fetchConfigProps();
    }
  }, [configURL]);

  useEffect(() => {
    dispatch({ type: DECRYPT_BOT, payload: props });
  }, []);

  return isWidgetReady ? isChatWidget ? <ChatWidget {...props} /> : <div {...props}>ZSBWidget</div> : <div></div>;
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
  style: PropTypes.any,
  configProps: PropTypes.object,
  handleSendMessage: PropTypes.func,
  handleAddReply: PropTypes.func,
  bot: PropTypes.string,
  type: PropTypes.string,
};

export default ZSBWidget;
