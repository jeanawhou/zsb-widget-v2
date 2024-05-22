import { useContext, useEffect } from 'react';

import { fingerPrintJs } from 'src/services/global.service';
import { Context } from 'store/store.jsx';
import useSelector from 'store/useSelector';
import { chatConfigSelector, isChatWidgetSelector } from 'src/store/selectors/ui';
import { DECRYPT_BOT, SET_RANDOM_GENERATED_ID, SET_WIDGET_CONFIG } from 'src/store/action';
import useCustomWebsocket from '../hooks/useWebsocket';
import { configURLSelector, isWidgetReadySelector, websocketSelector } from 'src/store/selectors';
import { visitorIdSelector } from 'src/store/selectors/user';
import { isEmpty } from 'lodash';

const useZSBWidget = ({ props }) => {
  // hooks
  const [, dispatch] = useContext(Context);
  const { connectionStatus, sendJsonMessage } = useCustomWebsocket();
  // selectors
  const chatStyles = useSelector(chatConfigSelector);
  const websocket = useSelector(websocketSelector);
  const componentVisitorId = useSelector(visitorIdSelector);
  const configURL = useSelector(configURLSelector);
  const isWidgetReady = useSelector(isWidgetReadySelector);
  const isChatWidget = useSelector(isChatWidgetSelector);

  const setWidgetConfigFromProps = () => {
    if (!isEmpty(props) && props.bot) {
      dispatch({
        type: SET_WIDGET_CONFIG,
        payload: { widgetProps: props },
      });
    }
  };

  const fetchConfigProps = () => {
    fetch(configURL)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: SET_WIDGET_CONFIG,
          payload: { configJSON: res, widgetProps: props },
        });
      })
      .catch((error) => {
        setWidgetConfigFromProps();
      });
  };

  useEffect(() => {
    if (configURL) {
      fetchConfigProps();
    } else {
      setWidgetConfigFromProps();
    }
  }, [configURL]);

  useEffect(() => {
    dispatch({ type: DECRYPT_BOT, payload: props });
  }, []);

  useEffect(() => {
    const clientConnectPayload = {
      type: 'client_connect',
      data: {},
    };

    switch (connectionStatus) {
      case 'Open':
        if (!websocket.channel) {
          sendJsonMessage(clientConnectPayload);
        }
        break;

      default:
        break;
    }
  }, [connectionStatus, websocket?.channel]);

  useEffect(() => {
    if (!componentVisitorId) {
      fingerPrintJs().then((visitorId) => {
        dispatch({ type: SET_RANDOM_GENERATED_ID, payload: visitorId });
      });
    }
    // since chat styles will only be populated after widget and config styles is merged
  }, [chatStyles]);

  return {
    isWidgetReady,
    isChatWidget,
  };
};

export default useZSBWidget;
