import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Context } from 'store/store.jsx';
import { EXPAND_WIDGET, MINIMIZE_WIDGET } from 'store/action';
import useSelector from 'store/useSelector';
import { isWidgetExpandedSelector } from 'store/selectors/ui.js';
import { messagesSelector } from 'store/selectors/messages.js';
import {
  chatStylesSelector,
  isFullHeightSelector,
  isFullscreenSelector,
  isWidthHalfFullscreenSelector,
  newMessageCountSelector,
} from 'src/store/selectors/ui';
import { lastMessageQuickReplySelector } from 'src/store/selectors/messages';
import { CLEAR_NEW_MESSAGE_BADGE, SET_WIDGET_TO_FULLSCREEN } from 'src/store/action';
import useCustomWebsocket from '../hooks/useWebsocket';
import { websocketSelector } from 'src/store/selectors';
import useScreens from '../hooks/useScreens';

const useChatWidget = () => {
  // hooks
  const [, dispatch] = useContext(Context);
  const { connectionStatus, sendJsonMessage } = useCustomWebsocket();
  const { isMobile, isTablet } = useScreens();

  // selectors
  const isExpanded = useSelector(isWidgetExpandedSelector);
  const messages = useSelector(messagesSelector);
  const chatStyles = useSelector(chatStylesSelector);
  const websocket = useSelector(websocketSelector);
  const quickReplies = useSelector(lastMessageQuickReplySelector);
  const newMessageCount = useSelector(newMessageCountSelector);
  const isFullHeight = useSelector(isFullHeightSelector);
  const isFullscreen = useSelector(isFullscreenSelector);
  const isWidthHalfFullscreen = useSelector(isWidthHalfFullscreenSelector);

  // refs
  const messagesRef = useRef();
  const widgetRef = useRef(null);

  // component state
  const [fullHeight, setFullHeight] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const shouldShowLauncher = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const isSmallScreen = viewportHeight < 650;

    if (widgetRef?.current) {
      const isInvertedWidget = chatStyles.position?.includes('top');
      // top of widget computation
      const isWidgetHeightSmall = widgetRef.current?.clientHeight < 450;
      const isTouchingTopOfPage = widgetRef.current?.offsetTop < 10;

      // bottom of widget computation
      const widgetEl = widgetRef.current.getBoundingClientRect();
      const isTouchingBottomOfPage = window.innerHeight - widgetEl.bottom < 10;

      // check to not allow resize if both global state are false
      if (!isFullscreen && !isFullHeight) {
        // `fullHeight` is a component state
        if (!fullHeight) {
          if (isInvertedWidget) {
            if (isTouchingBottomOfPage && (isSmallScreen || isWidgetHeightSmall)) {
              setFullHeight(true);
            } else {
              setFullHeight(false);
            }
          } else {
            if (isTouchingTopOfPage && (isSmallScreen || isWidgetHeightSmall)) {
              setFullHeight(true);
            } else {
              setFullHeight(false);
            }
          }
        } else {
          if (isWidgetHeightSmall || isSmallScreen) {
            setFullHeight(true);
          } else {
            setFullHeight(false);
          }
        }
      }
    }
  }, [widgetRef?.current, isFullscreen, isFullHeight]);

  useEffect(() => {
    if (isFullHeight && !fullHeight) {
      setFullHeight(true);
    } else if (!isFullHeight && fullHeight) {
      setFullHeight(false);
    }
  }, [isFullHeight]);

  useEffect(() => {
    if (isFullscreen && !fullscreen) {
      setFullscreen(true);
    } else if (!isFullscreen && fullscreen) {
      setFullscreen(false);
    }
  }, [fullscreen, isFullscreen]);

  const checkViewportHeight = () => {
    if (isExpanded && !isFullHeight && !isFullscreen) {
      if (isMobile || isTablet) {
        if (isMobile) {
          dispatch({ type: SET_WIDGET_TO_FULLSCREEN });
        }
      } else if (!isFullHeight && !isFullscreen) {
        shouldShowLauncher();
      }
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
    if (!isFullHeight && !isFullscreen && isMobile && isExpanded) {
      dispatch({ type: SET_WIDGET_TO_FULLSCREEN });
    } else if (!isFullscreen && isMobile) {
      dispatch({ type: SET_WIDGET_TO_FULLSCREEN });
    }
  }, [isExpanded, isMobile, isFullHeight, isFullscreen]);

  useEffect(() => {
    if (navigator?.userAgent && isMobile && isExpanded) {
      setFullHeight(true);
    }
    if (!isFullHeight && !isFullscreen) {
      // listens on resize event
      window.addEventListener('resize', checkViewportHeight);
    }
  }, [isExpanded, isFullHeight, isFullscreen, isMobile, checkViewportHeight]);

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
    fullHeight,
    isFullscreen,
    chatStyles,
    quickReplies,
    newMessageCount,
    handleScroll,
    isMobile,
    isWidthHalfFullscreen,
  };
};

export default useChatWidget;
