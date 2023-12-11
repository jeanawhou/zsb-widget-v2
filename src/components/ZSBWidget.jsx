import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Context } from 'src/store/store';
import { DECRYPT_BOT, SET_VISITOR_ID, SET_WIDGET_CONFIG } from 'src/store/action';
import ChatWidget from './ChatWidget';
import { fingerPrintJs } from 'src/services/global.service';
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
    if (props.visitorid && props.visitorid !== (null || 'null') && props.visitorid !== (undefined || 'undefined')) {
      dispatch({ type: SET_VISITOR_ID, payload: props.visitorid });
    } else {
      fingerPrintJs().then((visitorId) => {
        dispatch({ type: SET_VISITOR_ID, payload: visitorId });
      });
    }
  }, [props?.visitorid]);

  useEffect(() => {
    dispatch({ type: DECRYPT_BOT, payload: props });
  }, []);

  return isWidgetReady ? isChatWidget ? <ChatWidget {...props} /> : <div {...props}>ZSBWidget</div> : <div></div>;
};

ZSBWidget.defaultProps = {
  title: '',
  subtitle: '',
  placeholder: 'Type your message...',
  icon: 'https://logosandtypes.com/wp-content/uploads/2022/07/openai.svg',
  showLogoOnChat: false,
  bot: 'U2FsdGVkX1/+3jMGwQZvHR+ZGRFTAwkLrSKLGHZNd2+xKPqkvy+BUykxlCqoEHvAwFWkaK8qUtDzFaIuvvx0JpPKU9xnxT7o2zWecCrfg1fBPlFrQ6sGFo+sKaGME/4yqBDs28YG+WpaAnvC/o8g9r7rUoumuWedsU8puK0ftC0qfQOmXsJHBy0BoRVq72bwB/kNrnCI5DC2QciUVnVxWHvdHbPfv+TTQf+J/wtG0OU+kF1MX9fkY1kPL9acK7njXNcyOwujfZFphRaqXvbTUHCaWOObS6sUXxEhK4LpEE3D28Qq7+4EI3gzNI9S3+dj0qRdm7R1bpwRdG4UzbIOKmK1UgslT+NgYdIZ/RzXulUeCCT/rNauHTaY3URiSC9823VbqULna3k8LY8CrG01uu9R4YDwaYcoSUt5gIM9dNg1d1v5Uqv1wt6MZa+rxUl4099h3/Z8QnCIZmdaMVdeAE9kb5QQxCl8sAK42hxxN9dvcgiXykKgFu8KnV7I4PAZ4+3MukpyS1WMxM1XnQVvHw==',
};

ZSBWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.any,
  showLogoOnChat: PropTypes.bool,
  configProps: PropTypes.object,
  handleSendMessage: PropTypes.func,
  handleAddReply: PropTypes.func,
  bot: PropTypes.string,
  visitorid: PropTypes.string,
  type: PropTypes.string,
};

export default ZSBWidget;
