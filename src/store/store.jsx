import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { initialState } from './initialState';
import { combinedReducers } from './reducers/combinedReducer';

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);
Store.propTypes = {
  children: PropTypes.any,
};

export default Store;
