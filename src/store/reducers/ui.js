import { omit } from 'lodash';

import {
  ADD_ERROR_REPLY,
  ADD_REACTION_TO_LAST_MESSAGE,
  ADD_REPLY,
  CLEAR_NEW_MESSAGE_BADGE,
  CLEAR_QUICK_REPLIES,
  EXPAND_WIDGET,
  MINIMIZE_WIDGET,
  SEND_NEW_MESSAGE,
  SET_WIDGET_TO_FULL_HEIGHT,
  SET_QUICK_REPLIES,
  SET_WIDGET_CONFIG,
  SET_WS_ASK_QUESTION_ACTION,
  START_TYPING_MESSAGE,
  STOP_TYPING_MESSAGE,
  RESTORE_WIDGET_HEIGHT,
  SET_WIDGET_TO_FULLSCREEN,
  RESTORE_WIDGET_WIDTH,
  SET_WIDGET_WIDTH_TO_HALF_FULLSCREEN,
} from '../action';
import { extractWidgetUI } from '../helpers/bot';
import { generateUUID } from '../utils';
import DEFAULT_ZSB_ICON from '@/assets/zsb-icon-faded-small.svg';
import { extractUserIcon } from '../helpers/svgIcons';

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

    case ADD_REPLY: {
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
      const widgetUI = extractWidgetUI(omit(configJSON, EXCLUDED_PROPS), omit(widgetProps, EXCLUDED_PROPS));
      const sessionId = generateUUID();
      const {
        avatar,
        iconColor,
        fbAccessToken,
        fbApiVersion,
        authenticatedUser,
        autoOpen,
        visitorId,
        launcherIcon,
        type,
        position,
        ...restOfUI
      } = widgetUI;
      const isProd = import.meta.env.PROD;
      const userIcon = extractUserIcon(avatar, iconColor);
      const launcher = launcherIcon ? extractUserIcon(launcherIcon, iconColor) : null;
      // eslint-disable-next-line no-undef
      const fallbackIcon = isProd ? `${__VITE_BASE_ORIGIN__}${DEFAULT_ZSB_ICON}` : DEFAULT_ZSB_ICON;
      const isChatWidget = !type || type === 'chat';
      const isMid = position?.includes('mid');
      const isValidMidPosition = isMid && widgetUI.shape === 'rectangle';

      const chatPosition =
        isChatWidget && isValidMidPosition
          ? position
          : isChatWidget && isMid && !isValidMidPosition && position?.includes('right')
            ? 'bottom-right'
            : position?.includes('left') && isMid
              ? 'bottom-left'
              : position;

      return {
        ...state,
        ui: {
          ...state.ui,
          isWidgetExpanded: autoOpen,
          widgetType: type || 'chat',
          widgetConfig: {
            ...state.ui.widgetConfig,
            // posibility of being reused on component type
            // hence moving it outside the chat object
            avatar: userIcon,
            chat: {
              launcherIcon: launcher || userIcon || fallbackIcon,
              position: chatPosition,
              ...restOfUI,
            },
          },
        },
        user: {
          ...state.user,
          isAuthenticated: visitorId ? true : authenticatedUser,
          visitorId,
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
        messages: state.messages?.length
          ? []
          : [
              {
                reply: { text: widgetUI.welcomeMessage } || null,
                timeReply: new Date(),
              },
            ],
      };
    }

    case ADD_REACTION_TO_LAST_MESSAGE: {
      const messagesWithReplyLastMsg = (state.messages || []).map((msg, idx) => {
        if (idx == state.messages?.length - 1) {
          return {
            ...msg,
            feedback: action.payload,
          };
        }
        return msg;
      });
      return {
        ...state,
        messages: messagesWithReplyLastMsg,
        metadata: {
          ...state.metadata,
          dislikes: action.payload === 0 ? 1 + state.metadata.dislikes : state.metadata.dislikes,
        },
      };
    }

    case SET_WS_ASK_QUESTION_ACTION:
    case SEND_NEW_MESSAGE:
    case START_TYPING_MESSAGE: {
      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            chat: {
              ...state.ui.widgetConfig.chat,
              typing: true,
            },
          },
        },
      };
    }

    case STOP_TYPING_MESSAGE: {
      return {
        ...state,
        ui: {
          ...state.ui,
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
