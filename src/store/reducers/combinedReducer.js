import { botReducer } from './bot';
import { messagesReducer } from './messages';
import { uiReducer } from './ui';
import { userReducer } from './user';

const combineReducers =
  (...reducers) =>
  (state, action) =>
    reducers.reduce((newState, reducer) => reducer(newState, action), state);

export const combinedReducers = combineReducers(
  userReducer,
  botReducer,
  uiReducer,
  messagesReducer,
);
