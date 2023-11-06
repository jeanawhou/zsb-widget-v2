import { useContext, useState } from 'react'
import { Context } from 'store/store';
import { MINIMIZE_WIDGET } from 'store/action';
import { ADD_REPLY, SEND_NEW_MESSAGE } from '../../store/action';
import useSelector from 'store/useSelector';
import { isExpandedChatSelector } from 'store/selectors/ui.js';


export const useMessageInput = () => {
  const [, dispatch] = useContext(Context);
  const [newMessage, setNewMessage] = useState('');
  const isExpanded = useSelector(isExpandedChatSelector);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    dispatch({ type: SEND_NEW_MESSAGE, payload: { newMessage } });
    setNewMessage('');
  };

  const addResponse = (reply) => {
    setTimeout(() => {
      dispatch({ type: ADD_REPLY, payload: { reply } });
    }, 65000);
  };

  const handleKeyDown = (e) => {
     if (e.key === 'Enter' && newMessage.length) {
       handleSendMessage(e);
       addResponse(
         `Hi there! Ask me a question and I'll find the answer for you. Hi there! Ask me a question and I'll find the answer for you.Hi there! Ask me a question and I'll find the answer for you.Hi there! Ask me a question and I'll find the answer for you.`
       );
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