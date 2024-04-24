import React from 'react';

import ChatWidget from './ChatWidget';
import useZSBWidget from './hooks';
import SearchComponent from './SearchComponent';

const ZSBWidget = (props) => {
  const { isChatWidget, isWidgetReady } = useZSBWidget({ props });

  return isWidgetReady ? isChatWidget ? <ChatWidget {...props} /> : <SearchComponent {...props} /> : <div></div>;
};

export default ZSBWidget;
