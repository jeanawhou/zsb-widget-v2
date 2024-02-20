import { SET_RANDOM_GENERATED_ID, SET_VISITOR_ID, SUBMIT_AGENT_HANDOVER_FORM } from '../action';

export const userReducer = (state, action) => {
  switch (action.type) {
    case SET_VISITOR_ID: {
      return {
        ...state,
        user: {
          ...state.user,
          visitorId: action.payload,
          isAuthenticated: true,
        },
      };
    }

    case SET_RANDOM_GENERATED_ID: {
      return {
        ...state,
        user: {
          ...state.user,
          visitorId: action.payload,
        },
      };
    }

    case SUBMIT_AGENT_HANDOVER_FORM: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          hasSubmittedUserDetails: true,
        },
      };
    }

    default:
      return state;
  }
};
