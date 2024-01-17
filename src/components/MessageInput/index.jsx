import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';

import { StyledInputWrapper } from '../StyledComponents';
import { useMessageInput } from './hooks';

const MessageInput = (props) => {
  const { chatConfig, clearNewMessageBadge, handleKeyDown, handleSendMessage, isExpanded, newMessage, setNewMessage } =
    useMessageInput({
      props,
    });
  const { placeholder, typing, ...rest } = chatConfig;

  return (
    <StyledInputWrapper {...rest}>
      <textarea
        rows={1}
        placeholder={placeholder}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus={isExpanded}
        onFocus={clearNewMessageBadge}
        onKeyUp={clearNewMessageBadge}
        onClick={clearNewMessageBadge}
        disabled={typing}
      />
      <SendOutlined label="Send" onClick={handleSendMessage} onKeyDown={handleKeyDown} tabIndex={0} disabled={typing} />
    </StyledInputWrapper>
  );
};

MessageInput.propTypes = {
  placeholder: PropTypes.string,
};

export default MessageInput;
