import { useContext, useRef, useState } from 'react';

import { Context } from 'store/store.jsx';
import useSelector from 'store/useSelector';
import { isSearchingSelector, widgetTypeSelector } from 'src/store/selectors/ui';
import { FINISH_SEARCH, SHOW_SEARCH_INDICATOR, START_SEARCH } from 'src/store/action';
import { publicKeysSelector, websocketSelector } from 'src/store/selectors';
import { userSelector } from 'src/store/selectors/user';
import { apiService } from 'src/services/api.service';
import { generateUUID } from 'src/store/utils';
import { integrationSelector } from 'src/store/selectors/integration';
import { historySelector, lastHistorySelector } from 'src/store/selectors/history';
import useReply from '../hooks/useReply';

const useSearchComponent = () => {
  const [, dispatch] = useContext(Context);
  const { addResponse } = useReply();

  const websocket = useSelector(websocketSelector);
  const publicKeys = useSelector(publicKeysSelector);
  const user = useSelector(userSelector);
  const integration = useSelector(integrationSelector);
  const isSearchComponentLoading = useSelector(isSearchingSelector);
  const allHistory = useSelector(historySelector);
  const widgetType = useSelector(widgetTypeSelector);
  const lastHistory = useSelector(lastHistorySelector);

  const [value, setValue] = useState('');

  const searchInputRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (value.trim() === '' || isSearchComponentLoading) return;
    dispatch({ type: SHOW_SEARCH_INDICATOR });
    const interactionId = generateUUID();
    dispatch({ type: START_SEARCH, payload: { userInput: value, interactionId } });
    try {
      const res = await apiService.askQuestion(
        value,
        publicKeys,
        user,
        widgetType,
        interactionId,
        integration,
        websocket.channel,
      );
      if (res.data.success && res.data.report[0]) {
        const result = res.data.report[0];
        addResponse(result);
        dispatch({ type: FINISH_SEARCH });
      }
    } catch (error) {
      dispatch({ type: FINISH_SEARCH });
    }
  };

  const handleChangeSearchInput = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (evt) => {
    if (evt.key === 'ArrowDown' && searchInputRef?.current) {
      searchInputRef.current.focus();
      return;
    } else if (evt.key === 'Escape') {
      setValue('');
    } else if (evt.key === 'Enter') {
      return handleSearch(evt);
    }
  };

  return {
    setValue,
    value,
    handleChangeSearchInput,
    handleSearch,
    isSearchComponentLoading,
    handleKeyDown,
    searchInputRef,
    allHistory,
    lastHistory,
  };
};

export default useSearchComponent;
