import { useContext, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { SOCKET_URL, RECONNECT_INTERVAL, UNIT_OF_TIME } from 'src/constants/websocket';
import { DISCONNECT_WEBSOCKET, FINISH_SEARCH, SET_WS_ASK_QUESTION_ACTION, SET_WS_CHANNEL } from 'src/store/action';
import { websocketSelector } from 'src/store/selectors';
import { Context } from 'src/store/store';
import useSelector from 'src/store/useSelector';
import useReply from './useReply';
import { isSearchWidgetSelector } from 'src/store/selectors/ui';

const useCustomWebsocket = () => {
  const [, dispatch] = useContext(Context);
  const { addResponse } = useReply();

  const websocket = useSelector(websocketSelector);
  const isSearchWidget = useSelector(isSearchWidgetSelector);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    retryOnError: () => true,
    reconnectInterval: RECONNECT_INTERVAL,
    onError: (e) => {
      console.log(getReconnectMessage('error'), e?.reason);
      dispatch({
        type: DISCONNECT_WEBSOCKET,
      });
    },
    reconnectAttempts: 3,
    onClose: (e) => {
      console.log(getReconnectMessage('closed'), e?.reason);
      dispatch({
        type: DISCONNECT_WEBSOCKET,
      });
    },
  });

  const getReconnectMessage = (status) => {
    return `Socket ${status === 'closed' ? 'is closed' : 'throws an error'}. Reconnect will be attempted in ${
      RECONNECT_INTERVAL / UNIT_OF_TIME
    } second.`;
  };

  // Rename readyState from number to human readable word
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    if (lastMessage?.data) {
      const wsData = JSON.parse(lastMessage.data);
      switch (wsData.type) {
        case 'client_connected':
          if (!websocket?.channel) {
            dispatch({
              type: SET_WS_CHANNEL,
              payload: wsData.data,
            });
          }
          break;

        case 'ask_question':
          if (wsData.data?.answer && wsData.data?.type === 'response') {
            addResponse(wsData.data.answer);
            if (isSearchWidget) {
              dispatch({ type: FINISH_SEARCH });
            }
          } else {
            dispatch({
              type: SET_WS_ASK_QUESTION_ACTION,
              payload: wsData.data,
            });
          }
          break;

        default:
          break;
      }
    }
  }, [lastMessage, websocket?.channel]);

  return {
    connectionStatus,
    lastMessage,
    sendJsonMessage,
  };
};

export default useCustomWebsocket;
