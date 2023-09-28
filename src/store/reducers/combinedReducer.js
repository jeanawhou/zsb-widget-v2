import { botReducer } from './bot';
import { messagesReducer } from './messages';
import { uiReducer } from './ui';

const combineReducers =
  (...reducers) =>
  (state, action) =>
    reducers.reduce((newState, reducer) => reducer(newState, action), state);

export const combinedReducers = combineReducers(
  messagesReducer,
  uiReducer,
  botReducer,
);
