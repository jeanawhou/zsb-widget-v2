import { useContext, useEffect, useRef, useState } from 'react';

import { Context } from 'store/store.jsx';
import { EXPAND_WIDGET, MINIMIZE_WIDGET } from 'store/action';
import useSelector from 'store/useSelector';
import { isExpandedChatSelector } from 'store/selectors/ui.js';
import { messagesSelector } from 'store/selectors/messages.js';
import { decrypt, encrypt } from 'src/store/utils';

const SECRET_KEY = import.meta.env.VITE_CRYPTO_KEY;

const useChatWidget = ({ bot }) => {
  const [, dispatch] = useContext(Context);
  const isExpanded = useSelector(isExpandedChatSelector);
  const messages = useSelector(messagesSelector);

  const widgetRef = useRef();

  const [isViewportBelow50, setIsViewportBelow50] = useState(false);
  const [encyptText, setEncrypt] = useState({});

  const toggleChat = () => {
    if (isExpanded) {
      dispatch({ type: MINIMIZE_WIDGET });
    } else {
      dispatch({ type: EXPAND_WIDGET })
    }
  };

  console.log('enc', SECRET_KEY, bot, encyptText);


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

    const enc = encrypt(bot, String(SECRET_KEY));
    setEncrypt(enc);

    checkViewportHeight();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [bot]);

  const noOperation = async () => ({});

  useEffect(() => {
    if (messages && widgetRef.current) {
      const messageContainer = widgetRef.current
      setTimeout(
        () =>
          messageContainer.scrollTop = messageContainer.scrollHeight,
        200
      );
    }
    if (messages && messages.length && encyptText) {
      console.log(decrypt(encyptText, SECRET_KEY));
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