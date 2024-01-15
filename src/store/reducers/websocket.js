import {
  DISCONNECT_WEBSOCKET,
  SET_WS_ASK_QUESTION_ACTION,
  SET_WS_CHANNEL,
} from '../action';
import { initialWebsocketState } from '../initialState';

export const websocketReducer = (state, action) => {
  switch (action.type) {
    case SET_WS_CHANNEL: {
      const { target, ...rest } = action.payload
      
      return {
        ...state,
        websocket: {
          ...state.websocket,
          channel: target,
          ...rest
        }
      }
    }

    case DISCONNECT_WEBSOCKET: {
      return {
        ...state,
        websocket: {
          channel: null
        }
      }
    }

    case SET_WS_ASK_QUESTION_ACTION: {
      const { status, data, type } = action.payload;
      const actionList =
        state.websocket?.askQuestionActions.length
          ? [...(state.websocket?.askQuestionActions || []), action.payload]
          : [action.payload];
      const chatList = state.messages;
      const newGeneratedAnswer = data?.content || '';
      const generatedAnswer = state.websocket.generatedAnswer || '';
      const concatenatedAnswer = generatedAnswer + newGeneratedAnswer;

      if (status === 'processing') {
        const updatedChatList = chatList.map((msg, idx) => {
          const lastMessage = chatList?.length - 1;
  
          if (idx === lastMessage) {
            return {
              ...msg,
              reply: {
                text: concatenatedAnswer,
              },
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
            sending: true,
          },
        };
      } else if (type === 'response') {

        const updatedChatList = chatList?.map((msg, idx) => {
          const lastMessage = chatList?.length - 1;
  
          if (idx === lastMessage) {
            return {
              ...msg,
              reply: {
                text: concatenatedAnswer,
              },
            };
          }
          return msg;
        });

        return {
          ...state,
          messages: updatedChatList,
          websocket: initialWebsocketState,
        };
      }

      return {
        ...state,
        websocket: {
          ...state.websocket,
          askQuestionActiveAction: action.payload,
          askQuestionActions: actionList,
          generatedAnswer: concatenatedAnswer,
          sending: true,
        },
      };
    }

    default:
      return state;
  }
};
