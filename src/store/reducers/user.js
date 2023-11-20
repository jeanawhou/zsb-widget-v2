import { SET_VISITOR_ID } from '../action';

export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_VISITOR_ID: {
      return {
        ...state,
        user: {
          ...state.user,
          visitorId: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
