import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

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
import { WIDTH } from 'src/constants/viewport';

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

  const isMobile = useMemo(() => MOBILE_USER_AGENT_REGEX.test(navigator.userAgent), [navigator?.userAgent]);
  const isTablet = useMemo(() => {
    const parsedWidth = Number(WIDTH.mobile.replace('px', ''));
    const isWidgetSmall = widgetRef.current?.clientWidth <= parsedWidth;
    return (isMobile && isWidgetSmall) || navigator.userAgent.includes('iPad');
  }, [isMobile, navigator?.userAgent]);

  const shouldShowLauncher = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const isSmallScreen = viewportHeight < 650;

    if (widgetRef?.current) {
      const isWidgetHeightSmall = widgetRef.current?.clientHeight < 450;
      const isTouchingTopOfPage = widgetRef.current?.offsetTop < 10;
      if (!hideLauncher) {
        if (isTouchingTopOfPage && (isSmallScreen || isWidgetHeightSmall)) {
          setHideLauncher(true);
        } else {
          setHideLauncher(false);
        }
      } else {
        if (isWidgetHeightSmall || isSmallScreen) {
          setHideLauncher(true);
        } else {
          setHideLauncher(false);
        }
      }
    }
  }, [isMobile, widgetRef?.current]);

  const checkViewportHeight = () => {
    if (isExpanded) {
      if (isMobile) {
        setHideLauncher(true);
      } else {
        shouldShowLauncher();
      }
    } else if (hideLauncher) {
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

  const toggleChat = () => {
    if (isExpanded) {
      dispatch({ type: MINIMIZE_WIDGET });
    } else {
      dispatch({ type: EXPAND_WIDGET });
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
