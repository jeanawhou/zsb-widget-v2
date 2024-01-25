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
  SET_QUICK_REPLIES,
  SET_WIDGET_CONFIG,
  SET_WS_ASK_QUESTION_ACTION,
  START_TYPING_MESSAGE,
  STOP_TYPING_MESSAGE,
} from '../action';
import { extractWidgetUI } from '../helpers/bot';
import { generateUUID } from '../utils';

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
          quickReplies: [],
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
      const { icon, fbAccessToken, fbApiVersion, authenticatedUser, ...restOfUI } = widgetUI;

      return {
        ...state,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            icon: icon || `${window.location.origin}${state.ui.widgetConfig.icon}`,
            chat: {
              ...restOfUI,
            },
          },
        },
        user: {
          ...state.user,
          isAuthenticated: widgetProps.visitorId ? true : authenticatedUser,
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

    default:
      return state;
  }
};
