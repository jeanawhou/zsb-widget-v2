import { CLEAR_QUICK_REPLIES, EXPAND_WIDGET, MINIMIZE_WIDGET, SET_QUICK_REPLIES } from '../action';

export const uiReducer = (state, action) => {
  switch (action.type) {
    case EXPAND_WIDGET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          isExpandedChat: true,
        },
      };
    }

    case MINIMIZE_WIDGET: {
      return {
        ...state,
        ui: {
          ...state.ui,
          isExpandedChat: false,
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

    default:
      return state;
  }
};
