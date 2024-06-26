import { useContext, useEffect, useRef } from 'react';
import { CLEAR_NEW_MESSAGE_BADGE } from 'src/store/action';
import { historySelector } from 'src/store/selectors/history';
import { isWidgetExpandedSelector, isWidthHalfFullscreenSelector } from 'src/store/selectors/ui';
import { Context } from 'src/store/store';
import useSelector from 'src/store/useSelector';

const useMessagesWrapper = () => {
  const [, dispatch] = useContext(Context);
  const messagesRef = useRef(null);
  const allHistory = useSelector(historySelector);
  const isWidthHalfFullscreen = useSelector(isWidthHalfFullscreenSelector);
  const isExpanded = useSelector(isWidgetExpandedSelector);

  const handleScroll = () => {
    if (messagesRef.current) {
      const element = messagesRef.current;
      const isMessagesWrapperScrolled = element.scrollTop + element.clientHeight >= element.scrollHeight;

      if (isMessagesWrapperScrolled) {
        dispatch({ type: CLEAR_NEW_MESSAGE_BADGE });
      }
    }
  };

  // scroll down if messages changed
  useEffect(() => {
    if (allHistory && messagesRef.current) {
      const messageContainer = messagesRef.current;
      setTimeout(() => (messageContainer.scrollTop = messageContainer.scrollHeight), 200);
    }
  }, [allHistory]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (messagesRef.current) {
        messagesRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  return {
    allHistory,
    isExpanded,
    isWidthHalfFullscreen,
    messagesRef,
  };
};

export default useMessagesWrapper;
