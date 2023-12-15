import { ADD_ERROR_REPLY, ADD_REPLY, CLEAR_CHAT_MESSAGES, SEND_NEW_MESSAGE } from '../action';

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
          user: 'client',
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
      const { reply } = action.payload;
      const { quick_reply } = reply.context;
      const quickReplies = quick_reply || { replies: [] };
      const messagesWithReplyLastMsg = messageState.map((msg, idx) => {
        if (idx == messageState.length - 1) {
          return {
            ...msg,
            reply: reply.context,
            timeReply: new Date(),
            user: 'bot',
            quickReply: quickReplies,
          };
        }
        return msg;
      });
      return {
        ...state,
        messages: messagesWithReplyLastMsg,
      };
    }

    case ADD_ERROR_REPLY: {
      const messagesWithReplyLastMsg = messageState.map((msg, idx) => {
        if (idx == messageState.length - 1) {
          return {
            ...msg,
            reply: { text: `Sorry, I'm having trouble to look for the answer. Please try again later.` },
            timeReply: new Date(),
            user: 'bot',
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

    default:
      return state;
  }
};
