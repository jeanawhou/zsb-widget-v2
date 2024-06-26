import { botReducer } from './bot';
import { historyReducer } from './history';
import { uiReducer } from './ui';
import { userReducer } from './user';
import { websocketReducer } from './websocket';

const combineReducers =
  (...reducers) =>
  (state, action) =>
    reducers.reduce((newState, reducer) => reducer(newState, action), state);

export const combinedReducers = combineReducers(userReducer, botReducer, uiReducer, historyReducer, websocketReducer);
