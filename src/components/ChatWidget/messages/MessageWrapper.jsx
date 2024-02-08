import PropTypes from 'prop-types';
import { StyledMessagesWrapper } from 'src/components/StyledComponents';
import UserMessage from 'src/components/UserMessage';
import Reply from 'src/components/Reply';
import useMessagesWrapper from './hooks';
import Typing from 'src/components/Typing';

const MessageWrapper = (props) => {
  const { fullHeight } = props;
  const { allMessages, isExpanded, isWidthHalfFullscreen, messagesRef } = useMessagesWrapper();

  return (
    <StyledMessagesWrapper
      ref={messagesRef}
      fullheight={fullHeight && isExpanded ? 'true' : 'false'}
      halfscreen={isWidthHalfFullscreen ? 'true' : 'false'}
    >
      {allMessages.map((message, index) => {
        return (
          <div key={`message-${index}`}>
            {message.text ? <UserMessage message={message} /> : null}
            {message.reply ? <Reply message={message} key={`reply-message-${index}`} /> : <Typing />}
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
