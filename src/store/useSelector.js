import { useContext } from 'react';
import { Context } from './store.jsx';

const useSelector = (selector, ...args) => {
  const [state] = useContext(Context);

  if (selector) {
    return selector(state, ...args);
  }

  return state;
};

export default useSelector;
