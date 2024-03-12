import { useContext, useRef, useState } from 'react';

import { Context } from 'store/store.jsx';
import useSelector from 'store/useSelector';
import { hasSearchErrorSelector, isSearchingSelector, widgetTypeSelector } from 'src/store/selectors/ui';
import { FINISH_SEARCH, FINISH_SEARCH_WITH_ERROR, SHOW_SEARCH_INDICATOR, START_SEARCH } from 'src/store/action';
import { publicKeysSelector, websocketSelector } from 'src/store/selectors';
import { userSelector } from 'src/store/selectors/user';
import { apiService } from 'src/services/api.service';
import { generateUUID } from 'src/store/utils';
import { integrationSelector } from 'src/store/selectors/integration';
import { historySelector, lastHistorySelector } from 'src/store/selectors/history';
import useReply from '../hooks/useReply';
import { DEFAULT_ERROR_MESSAGE } from 'src/constants/chat';

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
  const hasSearchError = useSelector(hasSearchErrorSelector);

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
      if (res.data?.success && res.data?.report[0]) {
        const result = res.data.report[0];
        addResponse(result);
        dispatch({ type: FINISH_SEARCH });
      }
      if (!res || res.message?.toLowerCase()?.includes('error')) {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }
    } catch (error) {
      dispatch({ type: FINISH_SEARCH_WITH_ERROR, payload: { text: error.message, context: {} } });
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
    hasSearchError,
  };
};

export default useSearchComponent;
