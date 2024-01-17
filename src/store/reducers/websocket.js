import { EMPTY_QUICK_REPLY } from 'src/constants/chat';
import { ADD_REPLY, DISCONNECT_WEBSOCKET, SET_WS_ASK_QUESTION_ACTION, SET_WS_CHANNEL } from '../action';
import { initialWebsocketState } from '../initialState';

export const websocketReducer = (state, action) => {
  switch (action.type) {
    case SET_WS_CHANNEL: {
      const { target, ...rest } = action.payload;

      return {
        ...state,
        websocket: {
          ...state.websocket,
          channel: target,
          ...rest,
        },
      };
    }

    case DISCONNECT_WEBSOCKET: {
      return {
        ...state,
        websocket: initialWebsocketState,
      };
    }

    case ADD_REPLY: {
      return {
        ...state,
        websocket: {
          ...initialWebsocketState,
          channel: state.websocket.channel,
        },
      };
    }

    case SET_WS_ASK_QUESTION_ACTION: {
      const { status, data, type, answer } = action.payload;
      const actionList = state.websocket?.askQuestionActions.length
        ? [...(state.websocket?.askQuestionActions || []), action.payload]
        : [action.payload];
      const chatList = state.messages;
      const currentSteps = state.websocket.steps;
      const newGeneratedAnswer = data?.content || '';
      const generatedAnswer = state.websocket.generatedAnswer || '';
      const wsProcess = currentSteps.length && currentSteps.includes(type) ? currentSteps : [...currentSteps, type];
      const concatenatedAnswer = generatedAnswer + newGeneratedAnswer;
      const newReply = {
        reply: {
          text: [concatenatedAnswer],
          isLastReplyItem: false,
        },
        isLastMessage: true,
      };

      if (type === 'response') {
        const updatedChatList = chatList?.map((msg, idx) => {
          const lastMessage = chatList?.length - 1;
          const { jid, name, context } = answer || {};

          if (idx === lastMessage) {
            return {
              ...msg,
              answerId: jid,
              reply: {
                text: [concatenatedAnswer],
                isLastReplyItem: true,
              },
              lastUserReplied: 'bot',
              quickReply: context.quick_reply || EMPTY_QUICK_REPLY,
              type: name?.includes('default') ? 'default' : name,
              isLastMessage: true,
            };
          }
          return msg;
        });

        return {
          ...state,
          messages: updatedChatList,
          websocket: {
            ...initialWebsocketState,
            channel: state.websocket.channel,
          },
        };
      } else {
        const updatedChatList = chatList.map((msg, idx) => {
          const lastMessageIndex = chatList?.length - 1;

          if (idx === lastMessageIndex) {
            return {
              ...msg,
              ...newReply,
              timeReply: msg.timeReply || new Date(),
            };
          }
          return msg;
        });

        return {
          ...state,
          messages: updatedChatList,
          websocket: {
            ...state.websocket,
            askQuestionActiveAction: action.payload,
            askQuestionActions: actionList,
            generatedAnswer: concatenatedAnswer,
            steps: wsProcess,
            sending: true,
          },
        };
      }
    }

    default:
      return state;
  }
};
