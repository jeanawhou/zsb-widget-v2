import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { fingerPrintJs } from 'src/services/global.service';
import { Context } from 'store/store.jsx';
import { EXPAND_WIDGET, MINIMIZE_WIDGET } from 'store/action';
import useSelector from 'store/useSelector';
import { isWidgetExpandedSelector } from 'store/selectors/ui.js';
import {
  chatConfigSelector,
  isFullHeightSelector,
  isFullscreenSelector,
  isWidthHalfFullscreenSelector,
  widgetHeightSelector,
  widgetThemeColorSelector,
} from 'src/store/selectors/ui';
import { lastMessageQuickReplySelector } from 'src/store/selectors/history';
import { SET_RANDOM_GENERATED_ID, SET_WIDGET_TO_FULLSCREEN } from 'src/store/action';
import useScreens from '../hooks/useScreens';
import { visitorIdSelector } from 'src/store/selectors/user';

const useChatWidget = () => {
  // hooks
  const [, dispatch] = useContext(Context);
  const { isMobile, isTablet } = useScreens();

  // selectors
  const isExpanded = useSelector(isWidgetExpandedSelector);
  const chatStyles = useSelector(chatConfigSelector);
  const quickReplies = useSelector(lastMessageQuickReplySelector);
  const isFullHeight = useSelector(isFullHeightSelector);
  const isFullscreen = useSelector(isFullscreenSelector);
  const isWidthHalfFullscreen = useSelector(isWidthHalfFullscreenSelector);
  const componentVisitorId = useSelector(visitorIdSelector);
  const height = useSelector(widgetHeightSelector);
  const themeColor = useSelector(widgetThemeColorSelector);

  // refs
  const widgetRef = useRef(null);

  // component state
  const [fullHeight, setFullHeight] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const shouldShowLauncher = useCallback(() => {
    if (typeof window !== 'undefined') {
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

  const checkViewportHeight = useCallback(() => {
    if (isExpanded && !isFullHeight && !isFullscreen) {
      if (isMobile || isTablet) {
        if (isMobile) {
          dispatch({ type: SET_WIDGET_TO_FULLSCREEN });
        }
      } else if (!isFullHeight && !isFullscreen) {
        shouldShowLauncher();
      }
    }
  }, [dispatch, isExpanded, isFullHeight, isFullscreen, isMobile, isTablet, shouldShowLauncher]);

  useEffect(() => {
    if (!isFullHeight && !isFullscreen && isMobile && isExpanded) {
      dispatch({ type: SET_WIDGET_TO_FULLSCREEN });
    } else if (!isFullscreen && isMobile) {
      dispatch({ type: SET_WIDGET_TO_FULLSCREEN });
    }
  }, [isExpanded, isMobile, isFullHeight, isFullscreen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (navigator?.userAgent && isMobile && isExpanded) {
        setFullHeight(true);
      }
      window.addEventListener('resize', checkViewportHeight);

      return () => {
        window.removeEventListener('resize', checkViewportHeight);
      };
    }
  }, [isExpanded, isFullHeight, isFullscreen, isMobile, checkViewportHeight]);

  const toggleChat = () => {
    if (isExpanded) {
      dispatch({ type: MINIMIZE_WIDGET });
    } else {
      dispatch({ type: EXPAND_WIDGET });
    }
  };

  useEffect(() => {
    if (!componentVisitorId) {
      fingerPrintJs().then((visitorId) => {
        dispatch({ type: SET_RANDOM_GENERATED_ID, payload: visitorId });
      });
    }
    // since chat styles will only be populated after widget and config styles is merged
  }, [chatStyles]);

  return {
    height,
    isExpanded,
    toggleChat,
    fullHeight,
    isFullscreen,
    widgetRef,
    chatStyles,
    quickReplies,
    isMobile,
    isWidthHalfFullscreen,
    themeColor,
  };
};

export default useChatWidget;
