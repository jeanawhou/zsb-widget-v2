import { useContext, useEffect, useRef, useState } from 'react';

import { Context } from 'store/store.jsx';
import { EXPAND_WIDGET, MINIMIZE_WIDGET } from 'store/action';
import useSelector from 'store/useSelector';
import { isWidgetExpandedSelector } from 'store/selectors/ui.js';
import { messagesSelector } from 'store/selectors/messages.js';


const useChatWidget = (props) => {
  const [, dispatch] = useContext(Context);
  const isExpanded = useSelector(isWidgetExpandedSelector);
  const messages = useSelector(messagesSelector);

  const widgetRef = useRef();

  const [isViewportBelow50, setIsViewportBelow50] = useState(false);

  const toggleChat = () => {
    if (isExpanded) {
      dispatch({ type: MINIMIZE_WIDGET });
    } else {
      dispatch({ type: EXPAND_WIDGET })
    }
  };

  useEffect(() => {
    const checkViewportHeight = () => {
      const viewportHeight = window.innerHeight;
      const screenHeight = window.screen.height;
      const isBelow50 = viewportHeight <= screenHeight / 2;
      setIsViewportBelow50(isBelow50);
    };

    const handleResize = () => {
      checkViewportHeight();
    };

    checkViewportHeight();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const noOperation = async () => ({});

  // scroll down if messages changed
  useEffect(() => {
    if (messages && widgetRef.current) {
      const messageContainer = widgetRef.current
      setTimeout(
        () =>
          messageContainer.scrollTop = messageContainer.scrollHeight,
        200
      );
    }
  }, [messages])
  
  return {
    isExpanded,
    messages,
    noOperation,
    toggleChat,
    widgetRef,
    isViewportBelow50,
  };
}

export default useChatWidget