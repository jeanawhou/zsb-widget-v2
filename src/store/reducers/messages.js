import {
  ADD_REPLY,
  SEND_NEW_MESSAGE,
} from '../action';

export const messagesReducer = (state, action) => {
  const messageState = state.messages
  const removeLastMessageStatus = (messageState || []).map((msg, idx) => {
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
      const { newMessage } = action.payload;
      const allMessages = [
        ...removeLastMessageStatus,
        {
          text: newMessage,
          user: 'client',
          isLastMessage: true,
          timeMessageSent: new Date(),
        },
      ];

      return {
        ...state,
        messages: allMessages,
      };
    }

    case ADD_REPLY: {
      const { reply } = action.payload;
      const messagesWithReplyLastMsg = (messageState || []).map((msg, idx) => {
        if (idx == messageState.length - 1) {
          return {
            ...msg,
            reply,
            timeReply: new Date(),
            user: 'bot',
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
