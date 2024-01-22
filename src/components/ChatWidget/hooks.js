import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Context } from 'store/store.jsx';
import { EXPAND_WIDGET, MINIMIZE_WIDGET } from 'store/action';
import useSelector from 'store/useSelector';
import { isWidgetExpandedSelector } from 'store/selectors/ui.js';
import { messagesSelector } from 'store/selectors/messages.js';
import { chatStylesSelector, newMessageCountSelector } from 'src/store/selectors/ui';
import { lastMessageQuickReplySelector, shouldShowQuickRepliesSelector } from 'src/store/selectors/messages';
import { CLEAR_NEW_MESSAGE_BADGE } from 'src/store/action';
import useCustomWebsocket from '../hooks/useWebsocket';
import { websocketSelector } from 'src/store/selectors';
import { MOBILE_USER_AGENT_REGEX } from 'src/constants';

const useChatWidget = () => {
  const [, dispatch] = useContext(Context);
  const { connectionStatus, sendJsonMessage } = useCustomWebsocket();

  // selectors
  const isExpanded = useSelector(isWidgetExpandedSelector);
  const messages = useSelector(messagesSelector);
  const chatStyles = useSelector(chatStylesSelector);
  const websocket = useSelector(websocketSelector);
  const quickReplies = useSelector(lastMessageQuickReplySelector);
  const shouldShowQuickReply = useSelector(shouldShowQuickRepliesSelector);
  const newMessageCount = useSelector(newMessageCountSelector);

  // refs
  const messagesRef = useRef();
  const widgetRef = useRef(null);

  // component state
  const [hideLauncher, setHideLauncher] = useState(false);

  // CONSTANTS
  // window and widget sizes
  const viewportHeight = window.innerHeight;
  const isSmallScreen = viewportHeight < 650;
  const isWidgetHeightSmall = widgetRef?.current?.clientHeight < 450;
  const isTouchingTopOfPage = widgetRef?.current?.offsetTop < 10;

  const isMobile = MOBILE_USER_AGENT_REGEX.test(navigator.userAgent);
  const isIpad = navigator.userAgent.includes('iPad');

  const toggleChat = () => {
    if (isExpanded) {
      dispatch({ type: MINIMIZE_WIDGET });
    } else {
      dispatch({ type: EXPAND_WIDGET });
    }
  };

  const shouldShowLauncher = useCallback(() => {
    if (!hideLauncher) {
      if (isTouchingTopOfPage) {
        if (isWidgetHeightSmall || isSmallScreen) {
          setHideLauncher(true);
        }
      } else {
        if (isWidgetHeightSmall || isSmallScreen) {
          setHideLauncher(true);
        } else {
          setHideLauncher(false);
        }
      }
    } else {
      if (isTouchingTopOfPage) {
        if (isWidgetHeightSmall || isSmallScreen) {
          setHideLauncher(true);
        } else {
          setHideLauncher(false);
        }
      } else {
        if (!isWidgetHeightSmall || !isSmallScreen) {
          setHideLauncher(false);
        }
      }
    }
  }, [isMobile, isSmallScreen, isWidgetHeightSmall, isTouchingTopOfPage]);

  const checkViewportHeight = () => {
    if (isExpanded) {
      if (isMobile) {
        setHideLauncher(true);
      } else {
        shouldShowLauncher(isTouchingTopOfPage, isWidgetHeightSmall, isSmallScreen);
      }
    } else {
      setHideLauncher(false);
    }
  };

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
    if (isMobile) {
      shouldShowLauncher();
    }
  }, [isExpanded, isMobile]);

  useEffect(() => {
    if (navigator?.userAgent && isMobile && isExpanded) {
      setHideLauncher(true);
    }
    // listens on resize event
    window.addEventListener('resize', checkViewportHeight);
  }, [isExpanded, hideLauncher, widgetRef?.current, navigator?.userAgent]);

  const noOperation = async () => ({});

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
    if (messages && messagesRef.current) {
      const messageContainer = messagesRef.current;
      setTimeout(() => (messageContainer.scrollTop = messageContainer.scrollHeight), 200);
    }
  }, [messages]);

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
    isExpanded,
    messages,
    noOperation,
    toggleChat,
    messagesRef,
    widgetRef,
    hideLauncher,
    chatStyles,
    quickReplies,
    shouldShowQuickReply,
    newMessageCount,
    handleScroll,
    isMobile,
  };
};

export default useChatWidget;
