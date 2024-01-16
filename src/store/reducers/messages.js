import {
  ADD_ERROR_REPLY,
  ADD_REPLY,
  CANCEL_AGENT_HANDOVER,
  CLEAR_CHAT_MESSAGES,
  SEND_NEW_MESSAGE,
  SHOW_AGENT_HANDOVER_FORM,
  SUBMIT_AGENT_HANDOVER_FORM,
} from '../action';
import { DEFAULT_AGENT_HANDOVER_MESSAGE, DEFAULT_USER_FORM_FIELDS } from '../../constants/chat';

export const messagesReducer = (state, action) => {
  const messageState = state.messages;
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
      const { newMessage, interactionId } = action.payload;
      const allMessages = [
        ...removeLastMessageStatus,
        {
          text: newMessage,
          lastUserReplied: 'client',
          isLastMessage: true,
          timeMessageSent: new Date(),
          interactionId,
        },
      ];

      return {
        ...state,
        messages: allMessages,
      };
    }

    case ADD_REPLY: {
      const { text, isLastReplyItem, context, name, jid, ...rest } = action.payload;
      const { quick_reply } = context;
      const quickReplies = quick_reply || { replies: [] };
      const messagesWithReplyLastMsg = messageState.map((msg, idx) => {
        // match the jid payload passed
        // message.reply.text shouldn't be empty
        if (msg.answerId === jid) {
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
          };
        }
        // reply is undefined for the first item
        else if (idx == messageState.length - 1 && msg.lastUserReplied === 'client' && !msg.answerId) {
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
          };
        }
        return msg;
      });
      return {
        ...state,
        messages: messagesWithReplyLastMsg,
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

    case ADD_ERROR_REPLY: {
      const messagesWithReplyLastMsg = messageState.map((msg, idx) => {
        if (idx == messageState.length - 1) {
          return {
            ...msg,
            reply: { text: `Sorry, I'm having trouble to look for the answer. Please try again later.` },
            timeReply: new Date(),
            lastUserReplied: 'bot',
            quickReply: { replies: [] },
            type: 'error',
          };
        }
        return msg;
      });
      return {
        ...state,
        messages: messagesWithReplyLastMsg,
      };
    }

    case CLEAR_CHAT_MESSAGES: {
      return {
        ...state,
        messages: [],
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
      const newMessages = messageState.map((msg, idx) => {
        const lastMessage = messageState?.length - 1;
        // attach reply to handoff label
        if (idx === lastMessage) {
          return {
            ...msg,
            forms: displayFormFields ? formFields : [],
            timeReply: new Date(),
            lastUserReplied: 'bot',
            type: 'agent-handover',
            reply: {
              text: formHeader,
            },
          };
        }
        return msg;
      });
      return {
        ...state,
        messages: newMessages,
      };
    }

    case CANCEL_AGENT_HANDOVER: {
      const config = state.ui?.widgetConfig?.chat || {};
      const cancelledFormMessage = config.cancelledFormMessage || DEFAULT_AGENT_HANDOVER_MESSAGE.cancelledFormMessage;
      const updatedMsg = messageState.map((msg) => {
        if (msg.type === 'agent-handover') {
          return {
            ...msg,
            reply: {
              text: cancelledFormMessage,
            },
            forms: undefined,
          };
        }
        return msg;
      });
      return {
        ...state,
        messages: updatedMsg,
      };
    }

    case SUBMIT_AGENT_HANDOVER_FORM: {
      const config = state.ui?.widgetConfig?.chat || {};
      const submittedFormMessage = config.submittedFormMessage || DEFAULT_AGENT_HANDOVER_MESSAGE.submittedFormMessage;
      const updatedMsg = messageState.map((msg) => {
        if (msg.type === 'agent-handover') {
          return {
            ...msg,
            reply: {
              text: submittedFormMessage,
            },
            forms: undefined,
          };
        }
        return msg;
      });
      return {
        ...state,
        messages: updatedMsg,
      };
    }

    default:
      return state;
  }
};
