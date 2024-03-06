import { isEmpty } from 'lodash';

import {
  ADD_ERROR_REPLY,
  ADD_REPLY,
  AGENT_HANDOVER_SUBMIT_FAIL,
  CANCEL_AGENT_HANDOVER,
  CLEAR_HISTORY,
  RETRIGGER_AGENT_HANDOVER,
  SEND_NEW_MESSAGE,
  SHOW_AGENT_HANDOVER_FORM,
  SUBMIT_AGENT_HANDOVER_FORM,
} from '../action';
import {
  DEFAULT_AGENT_HANDOVER_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_USER_FORM_FIELDS,
  EMPTY_QUICK_REPLY,
  SUBMIT_ERROR_MESSAGE,
} from '../../constants/chat';

export const historyReducer = (state, action) => {
  const messageState = state.history || [];
  const removeLastMessageStatus = messageState.map((msg, idx) => {
    if (idx === messageState.length - 1) {
      return {
        ...msg,
        isLastMessage: false,
      };
    }
    return msg;
  });

  switch (action.type) {
    case SEND_NEW_MESSAGE: {
      const { newMessage, interactionId, ...rest } = action.payload;
      const allHistory = [
        ...removeLastMessageStatus,
        {
          text: newMessage,
          lastUserReplied: 'client',
          isLastMessage: true,
          timeMessageSent: new Date(),
          interactionId,
          ...rest,
        },
      ];

      return {
        ...state,
        history: allHistory,
      };
    }

    case ADD_REPLY: {
      const { text, isLastReplyItem, context, name, jid } = action.payload;
      const { quick_reply } = context;
      const quickReplies = isEmpty(quick_reply) ? EMPTY_QUICK_REPLY : quick_reply;
      const historyWithReplyLastMsg = removeLastMessageStatus.map((msg, idx) => {
        const lastMessage = idx == removeLastMessageStatus.length - 1;
        // match the jid payload passed
        // message.reply.text shouldn't be empty
        if (lastMessage && msg.answerId === jid) {
          // text prop should be array now
          const newReplies = msg.reply?.text ? [...msg.reply.text, text] : [text];
          return {
            ...msg,
            answerId: msg?.jid || jid,
            reply: {
              text: newReplies,
              isLastReplyItem: Boolean(isLastReplyItem),
            },
            timeReply: new Date(),
            lastUserReplied: 'bot',
            quickReply: quickReplies,
            type: name?.includes('default') ? 'default' : name,
            isLastMessage: true,
          };
        }
        // reply is undefined for the first item
        else if (lastMessage && msg.lastUserReplied === 'client' && !msg.answerId) {
          return {
            ...msg,
            answerId: jid,
            reply: {
              // convert to array to map easily as a separate bubble
              text: [text],
              isLastReplyItem: Boolean(isLastReplyItem),
            },
            timeReply: new Date(),
            lastUserReplied: 'bot',
            quickReply: quickReplies,
            type: name?.includes('default') ? 'default' : name,
            isLastMessage: true,
          };
        }
        return msg;
      });
      return {
        ...state,
        history: historyWithReplyLastMsg,
        ui: {
          ...state.ui,
          widgetConfig: {
            ...state.ui.widgetConfig,
            chat: {
              ...state.ui.widgetConfig.chat,
              typing: !isLastReplyItem,
            },
          },
        },
      };
    }

    case ADD_ERROR_REPLY: {
      const historyWithReplyLastMsg = removeLastMessageStatus.map((msg, idx) => {
        if (idx == messageState.length - 1) {
          return {
            ...msg,
            reply: { text: DEFAULT_ERROR_MESSAGE },
            timeReply: new Date(),
            lastUserReplied: 'bot',
            quickReply: { replies: [] },
            type: 'error',
            isLastMessage: true,
          };
        }
        return msg;
      });
      return {
        ...state,
        history: historyWithReplyLastMsg,
      };
    }

    case CLEAR_HISTORY: {
      return {
        ...state,
        history: [],
      };
    }

    case SHOW_AGENT_HANDOVER_FORM: {
      const config = state.ui?.widgetConfig?.chat || {};
      const callbackEmail = config.callbackEmail;
      const displayFormFields = config.displayFormFields;
      const formHeader = config.formHeader || DEFAULT_AGENT_HANDOVER_MESSAGE.formHeader;
      const formFields = config.formFields || DEFAULT_USER_FORM_FIELDS;
      if (!callbackEmail) {
        return state;
      }
      const newMessages = removeLastMessageStatus.map((msg, idx) => {
        const lastMessage = removeLastMessageStatus?.length - 1;
        // attach reply to handoff label
        if (idx === lastMessage) {
          return {
            ...msg,
            forms: displayFormFields ? formFields : [],
            timeReply: new Date(),
            lastUserReplied: 'bot',
            type: 'agent-handover',
            reply: {
              text: [formHeader],
            },
            isLastMessage: true,
          };
        }
        return msg;
      });
      return {
        ...state,
        history: newMessages,
      };
    }

    case CANCEL_AGENT_HANDOVER: {
      const config = state.ui?.widgetConfig?.chat || {};
      const cancelledFormMessage = config.cancelledFormMessage || DEFAULT_AGENT_HANDOVER_MESSAGE.cancelledFormMessage;
      const lastMessage = removeLastMessageStatus?.length - 1;
      const updatedMsg = removeLastMessageStatus.map((msg, idx) => {
        if (msg.type === 'agent-handover' && idx === lastMessage) {
          return {
            ...msg,
            reply: {
              text: cancelledFormMessage,
            },
            forms: undefined,
            isLastMessage: true,
          };
        }
        return msg;
      });
      return {
        ...state,
        history: updatedMsg,
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

    case RETRIGGER_AGENT_HANDOVER:
    case SUBMIT_AGENT_HANDOVER_FORM: {
      const config = state.ui?.widgetConfig?.chat || {};
      const submittedFormMessage = config.submittedFormMessage || DEFAULT_AGENT_HANDOVER_MESSAGE.submittedFormMessage;
      const lastMessage = removeLastMessageStatus?.length - 1;
      const updatedMsg = removeLastMessageStatus.map((msg, idx) => {
        if (msg.type === 'agent-handover' && idx === lastMessage) {
          return {
            ...msg,
            timeReply: new Date(),
            reply: {
              text: [submittedFormMessage],
              isLastReplyItem: true,
            },
            forms: undefined,
            isLastMessage: true,
          };
        }
        return msg;
      });
      return {
        ...state,
        history: updatedMsg,
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

    case AGENT_HANDOVER_SUBMIT_FAIL: {
      const updatedMsg = removeLastMessageStatus.map((msg, idx) => {
        const lastMessage = removeLastMessageStatus?.length - 1;
        if (msg.type === 'agent-handover' && idx === lastMessage) {
          return {
            ...msg,
            forms: undefined,
            reply: { text: action.payload?.error || SUBMIT_ERROR_MESSAGE },
            type: 'error',
            isLastMessage: true,
          };
        }
        return msg;
      });
      return {
        ...state,
        history: updatedMsg,
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
