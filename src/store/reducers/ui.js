import { omit } from 'lodash';

import {
  ADD_ERROR_REPLY,
  ADD_REACTION_TO_LAST_RESPONSE,
  ADD_ANSWER,
  CLEAR_NEW_MESSAGE_BADGE,
  CLEAR_QUICK_REPLIES,
  EXPAND_WIDGET,
  MINIMIZE_WIDGET,
  SEND_NEW_MESSAGE,
  SET_WIDGET_TO_FULL_HEIGHT,
  SET_QUICK_REPLIES,
  SET_WS_ASK_QUESTION_ACTION,
  START_TYPING_MESSAGE,
  STOP_TYPING_MESSAGE,
  RESTORE_WIDGET_HEIGHT,
  SET_WIDGET_TO_FULLSCREEN,
  RESTORE_WIDGET_WIDTH,
  SET_WIDGET_WIDTH_TO_HALF_FULLSCREEN,
  FINISH_SEARCH,
  SHOW_SEARCH_INDICATOR,
  FINISH_SEARCH_WITH_ERROR,
  SET_WIDGET_CONFIG,
} from '../action';
import { extractWidgetUI } from '../helpers/bot';
import { generateUUID } from '../utils';
import DEFAULT_ZSB_ICON from '@/assets/zsb-icon-faded-small.svg';
import { extractUserIcon } from '../helpers/svgIcons';
import { FALLBACK_WIDGET_LABEL } from 'src/constants/chat';
import { ICON_OPTIONS, WIDGET_TYPES } from 'src/constants';

export const uiReducer = (state, action) => {
  const EXCLUDED_PROPS = ['style', 'bot', 'children'];

  switch (action.type) {
    case EXPAND_WIDGET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          isWidgetExpanded: true,
        },
      };
    }

    case MINIMIZE_WIDGET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          isWidgetExpanded: false,
        },
      };
    }

    case SET_QUICK_REPLIES: {
      const { quickReplies } = action.payload;
      return {
        ...state,
        ui: {
          ...state.ui,
          quickReplies,
        },
      };
    }

    case CLEAR_QUICK_REPLIES: {
      return {
        ...state,
        ui: {
          ...state.ui,
          quickReplies: {},
        },
      };
    }

    case ADD_ERROR_REPLY: {
      return {
        ...state,
        ui: {
          ...state.ui,
          newMessageCount: state.ui.newMessageCount + 1,
          widgetConfig: {
            ...state.ui.widgetConfig,
            chat: {
              ...state.ui.widgetConfig.chat,
              typing: false,
            },
          },
        },
      };
    }

    case ADD_ANSWER: {
      const { newMessageCount } = action.payload;
      return {
        ...state,
        ui: {
          ...state.ui,
          newMessageCount: newMessageCount,
        },
      };
    }

    case CLEAR_NEW_MESSAGE_BADGE: {
      return {
        ...state,
        ui: {
          ...state.ui,
          newMessageCount: null,
        },
      };
    }

    case SET_WIDGET_CONFIG: {
      const { configJSON, widgetProps } = action.payload;
      const widgetUI = configJSON
        ? extractWidgetUI(omit(configJSON, EXCLUDED_PROPS), omit(widgetProps, EXCLUDED_PROPS))
        : omit(widgetProps, EXCLUDED_PROPS);
      const sessionId = generateUUID();
      const {
        avatar,
        iconColor,
        fbAccessToken,
        fbApiVersion,
        authenticatedUser,
        autoOpen,
        visitorId,
        launcherAvatar,
        type,
        position,
        label,
        placeholder,
        color,
        ...restOfUI
      } = widgetUI;
      const launcher = launcherAvatar
        ? extractUserIcon(launcherAvatar, ICON_OPTIONS.includes(launcherAvatar) ? iconColor || color : null)
        : null;
      // eslint-disable-next-line no-undef
      const fallbackIcon = DEFAULT_ZSB_ICON;
      const isChatWidget = !type || type === 'chat';
      const isMid = position?.includes('mid');
      const isValidMidPosition = isMid && widgetUI.shape === 'rectangle';
      const widgetType = WIDGET_TYPES.includes(type) ? type.toLowerCase() : 'chat';
      const userIconColor =
        !isChatWidget && ICON_OPTIONS.includes(avatar)
          ? color
          : isChatWidget && ICON_OPTIONS.includes(avatar)
            ? iconColor || color
            : null;
      const userIcon = extractUserIcon(avatar, userIconColor);

      const chatPosition =
        isChatWidget && isValidMidPosition
          ? position
          : isChatWidget && isMid && !isValidMidPosition && position?.includes('right')
            ? 'bottom-right'
            : position?.includes('left') && isMid
              ? 'bottom-left'
              : position ?? 'bottom-right';

      return {
        ...state,
        ui: {
          ...state.ui,
          isWidgetExpanded: autoOpen,
          widgetType,
          widgetConfig: {
            ...state.ui.widgetConfig,
            // posibility of being reused on component type
            // hence moving it outside the chat object
            placeholder,
            color,
            avatar: userIcon,
            chat:
              widgetType === 'chat'
                ? {
                    launcherAvatar: launcher || userIcon || fallbackIcon,
                    position: chatPosition,
                    label: restOfUI?.shape === 'rectangle' ? (label ? label : FALLBACK_WIDGET_LABEL) : null,
                    ...restOfUI,
                  }
                : {},
            search: widgetType === 'search' ? restOfUI : {},
          },
        },
        user: {
          ...state.user,
          isAuthenticated: visitorId ? true : authenticatedUser ?? null,
          visitorId: visitorId ?? null,
          sessionId,
        },
        fbConfig: {
          ...state.fbConfig,
          fbAccessToken,
          fbApiVersion,
        },
        bot: {
          ...state.bot,
          identifier: restOfUI.identifier,
        },
        integration: {
          ...state.integration,
          ...restOfUI.integration,
        },
        isWidgetReady: true,
        history: state.history?.length
          ? []
          : widgetType === 'chat'
            ? [
                {
                  reply: widgetUI.welcomeMessag ? { text: widgetUI.welcomeMessage } : null,
                  timeReply: new Date(),
                },
              ]
            : [],
      };
    }

    case ADD_REACTION_TO_LAST_RESPONSE: {
      const historyWithReplyLastMsg = (state.history || []).map((msg, idx) => {
        if (idx == state.history?.length - 1) {
          return {
            ...msg,
            feedback: action.payload,
          };
        }
        return msg;
      });
      return {
        ...state,
        history: historyWithReplyLastMsg,
        metadata: {
          ...state.metadata,
          dislikes: action.payload === 0 ? 1 + state.metadata.dislikes : state.metadata.dislikes,
        },
      };
    }

    case SET_WS_ASK_QUESTION_ACTION:
    case SEND_NEW_MESSAGE:
    case SHOW_SEARCH_INDICATOR:
    case START_TYPING_MESSAGE: {
      const widgetType = state.ui.widgetType;
      const config = widgetType === 'chat' ? state.ui.widgetConfig.chat : state.ui.widgetConfig.search;
      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            chat:
              widgetType === 'chat'
                ? {
                    ...config,
                    typing: true,
                  }
                : {},
            search:
              widgetType === 'search'
                ? {
                    ...config,
                    loading: true,
                  }
                : {},
          },
        },
      };
    }

    case FINISH_SEARCH:
    case STOP_TYPING_MESSAGE: {
      const widgetType = state.ui.widgetType;
      const config = widgetType === 'chat' ? state.ui.widgetConfig.chat : state.ui.widgetConfig.search;
      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            chat:
              widgetType === 'chat'
                ? {
                    ...config,
                    typing: false,
                  }
                : {},
            search:
              widgetType === 'search'
                ? {
                    ...config,
                    error: false,
                    loading: false,
                  }
                : {},
          },
        },
      };
    }

    case FINISH_SEARCH_WITH_ERROR: {
      const widgetType = state.ui.widgetType;
      const config = widgetType === 'chat' ? state.ui.widgetConfig.chat : state.ui.widgetConfig.search;
      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            search: { ...config, error: true, loading: false },
          },
        },
      };
    }

    case SET_WIDGET_TO_FULL_HEIGHT: {
      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            isFullHeight: true,
          },
        },
      };
    }

    case RESTORE_WIDGET_HEIGHT: {
      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            isFullHeight: false,
          },
        },
      };
    }

    case SET_WIDGET_TO_FULLSCREEN: {
      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            isWidthHalfFullscreen: false,
            isFullscreen: true,
          },
        },
      };
    }

    case RESTORE_WIDGET_WIDTH: {
      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            isFullscreen: false,
            isWidthHalfFullscreen: false,
          },
        },
      };
    }

    case SET_WIDGET_WIDTH_TO_HALF_FULLSCREEN: {
      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            isFullscreen: false,
            isWidthHalfFullscreen: true,
          },
        },
      };
    }

    default:
      return state;
  }
};
