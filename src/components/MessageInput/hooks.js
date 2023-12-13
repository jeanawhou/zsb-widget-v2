import { useContext, useState } from 'react';

import { Context } from 'store/store';
import { MINIMIZE_WIDGET } from 'store/action';
import { ADD_ERROR_REPLY, ADD_REPLY, SEND_NEW_MESSAGE } from '../../store/action';
import useSelector from 'store/useSelector';
import { isWidgetExpandedSelector } from 'store/selectors/ui.js';
import { apiService } from 'src/services/api.service';
import { publicKeysSelector } from 'src/store/selectors';
import { userSelector } from 'src/store/selectors/user';
import { integrationSelector } from 'src/store/selectors/integration';
import { generateUUID } from 'src/store/utils';

export const useMessageInput = () => {
  const [, dispatch] = useContext(Context);
  const [newMessage, setNewMessage] = useState('');
  const isExpanded = useSelector(isWidgetExpandedSelector);
  const publicKeys = useSelector(publicKeysSelector);
  const user = useSelector(userSelector);
  const integration = useSelector(integrationSelector);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const interactionId = generateUUID();
    dispatch({ type: SEND_NEW_MESSAGE, payload: { newMessage, interactionId } });
    setNewMessage('');
    try {
      const res = await apiService.askQuestion(newMessage, publicKeys, user, interactionId, integration);
      if (res.data.success && res.data.report[0]) {
        const reply = res.data.report[0];
        addResponse(reply);
      }
    } catch (error) {
      dispatch({ type: ADD_ERROR_REPLY });
    }
  };

  const addResponse = (reply) => {
    dispatch({ type: ADD_REPLY, payload: { reply } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newMessage.length) {
      handleSendMessage(e);
    } else if (e.key === 'Escape') {
      dispatch({ type: MINIMIZE_WIDGET });
    }
  };

  return {
    handleKeyDown,
    setNewMessage,
    addResponse,
    newMessage,
    handleSendMessage,
    isExpanded,
  };
};
