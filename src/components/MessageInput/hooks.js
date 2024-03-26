import { useContext, useState } from 'react';

import { Context } from 'store/store';
import { MINIMIZE_WIDGET } from 'store/action';
import { ADD_ERROR_REPLY, CLEAR_NEW_MESSAGE_BADGE, SEND_NEW_MESSAGE } from '../../store/action';
import useSelector from 'store/useSelector';
import { isWidgetExpandedSelector } from 'store/selectors/ui.js';
import { apiService } from 'src/services/api.service';
import { publicKeysSelector, websocketSelector } from 'src/store/selectors';
import { userSelector } from 'src/store/selectors/user';
import { integrationSelector } from 'src/store/selectors/integration';
import { generateUUID } from 'src/store/utils';
import useReply from '../hooks/useReply';
import {
  chatConfigSelector,
  newMessageCountSelector,
  placeholderSelector,
  widgetThemeColorSelector,
  widgetTypeSelector,
} from 'src/store/selectors/ui';

export const useMessageInput = () => {
  const { addResponse } = useReply();
  const [, dispatch] = useContext(Context);
  const [newMessage, setNewMessage] = useState('');
  const isExpanded = useSelector(isWidgetExpandedSelector);
  const publicKeys = useSelector(publicKeysSelector);
  const user = useSelector(userSelector);
  const integration = useSelector(integrationSelector);
  const websocket = useSelector(websocketSelector);
  const chatConfig = useSelector(chatConfigSelector);
  const newMessageCount = useSelector(newMessageCountSelector);
  const widgetType = useSelector(widgetTypeSelector);
  const placeholder = useSelector(placeholderSelector);
  const themeColor = useSelector(widgetThemeColorSelector);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || chatConfig.typing) return;
    const interactionId = generateUUID();
    dispatch({ type: SEND_NEW_MESSAGE, payload: { userInput: newMessage, interactionId } });
    setNewMessage('');
    try {
      const res = await apiService.askQuestion(
        newMessage,
        publicKeys,
        user,
        widgetType,
        interactionId,
        integration,
        websocket.channel,
      );
      if (res.data.success && res.data.report[0]) {
        const reply = res.data.report[0];
        addResponse(reply);
      }
    } catch (error) {
      dispatch({ type: ADD_ERROR_REPLY });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newMessage.length) {
      handleSendMessage(e);
    } else if (e.key === 'Escape') {
      dispatch({ type: MINIMIZE_WIDGET });
    }
  };

  const clearNewMessageBadge = () => {
    if (newMessageCount) {
      dispatch({ type: CLEAR_NEW_MESSAGE_BADGE });
    }
  };

  return {
    addResponse,
    chatConfig,
    clearNewMessageBadge,
    handleKeyDown,
    handleSendMessage,
    isExpanded,
    newMessage,
    newMessageCount,
    setNewMessage,
    placeholder,
    themeColor,
  };
};
