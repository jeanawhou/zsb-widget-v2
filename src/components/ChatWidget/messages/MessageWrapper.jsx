import React from 'react';
import PropTypes from 'prop-types';

import { StyledMessagesWrapper } from 'src/components/ChatWidget/StyledComponents';
import UserMessage from 'src/components/ChatWidget/UserMessage';
import Reply from 'src/components/ChatWidget/messages/Reply';
import useMessagesWrapper from './hooks';
import Typing from 'src/components/ChatWidget/Typing';

const MessageWrapper = (props) => {
  const { fullHeight } = props;
  const { allHistory, isExpanded, isWidthHalfFullscreen, messagesRef } = useMessagesWrapper();

  return (
    <StyledMessagesWrapper
      ref={messagesRef}
      fullheight={fullHeight && isExpanded ? 'true' : 'false'}
      halfscreen={isWidthHalfFullscreen ? 'true' : 'false'}
    >
      {allHistory.map((message, index) => {
        return (
          <div key={`message-${index}`}>
            {message.text ? <UserMessage message={message} /> : null}
            {message.reply ? (
              <Reply message={message} key={`reply-message-${index}`} />
            ) : message.isLastMessage ? (
              <Typing />
            ) : null}
          </div>
        );
      })}
    </StyledMessagesWrapper>
  );
};

MessageWrapper.propTypes = {
  fullHeight: PropTypes.bool,
};

export default MessageWrapper;
