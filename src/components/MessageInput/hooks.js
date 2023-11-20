import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Context } from 'store/store';
import { MINIMIZE_WIDGET } from 'store/action';
import { ADD_REPLY, SEND_NEW_MESSAGE } from '../../store/action';
import useSelector from 'store/useSelector';
import { isWidgetExpandedSelector } from 'store/selectors/ui.js';
import { apiService } from 'src/services/api.service';
import { publicKeysSelector } from 'src/store/selectors';
import { userSelector } from 'src/store/selectors/user';
import { botIdentifierSelector } from 'src/store/selectors/bot';


export const useMessageInput = () => {
  const [state, dispatch] = useContext(Context);
  const [newMessage, setNewMessage] = useState('');
  const isExpanded = useSelector(isWidgetExpandedSelector);
  const publicKeys = useSelector(publicKeysSelector);
  const user = useSelector(userSelector);
  const botIdentifier = useSelector(botIdentifierSelector);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
      const interactionId = uuidv4();
      dispatch({ type: SEND_NEW_MESSAGE, payload: { newMessage } });
      setNewMessage('');
      const res = await apiService.askQuestion(newMessage, publicKeys, user, interactionId, botIdentifier)
      if (res.data.success && res.data.report[0]) {
        const reply = res.data.report[0]
        console.log('reply', reply);
      }
      addResponse(
       `Hi there! Ask me a question and I'll find the answer for you. Hi there! Ask me a question and I'll find the answer for you.Hi there! Ask me a question and I'll find the answer for you.Hi there! Ask me a question and I'll find the answer for you.`
     );
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
}