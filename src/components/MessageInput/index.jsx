import { useContext } from 'react';
import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';

import { StyledInputWrapper } from '../StyledComponents';
import { useMessageInput } from './hooks';
import useSelector from 'src/store/useSelector';
import { chatConfigSelector, newMessageCountSelector } from 'src/store/selectors/ui';
import { Context } from 'src/store/store';
import { CLEAR_NEW_MESSAGE_BADGE } from 'src/store/action';

const MessageInput = (props) => {
  const chatConfig = useSelector(chatConfigSelector);
  const newMessageCount = useSelector(newMessageCountSelector);
  const { placeholder, ...rest } = chatConfig;
  const [, dispatch] = useContext(Context);
  const { handleKeyDown, handleSendMessage, setNewMessage, newMessage, isExpanded } = useMessageInput({
    props,
  });

  const clearNewMessageBadge = () => {
    if (newMessageCount) {
      dispatch({ type: CLEAR_NEW_MESSAGE_BADGE });
    }
  };

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
      />
      <SendOutlined label="Send" onClick={handleSendMessage} onKeyDown={handleKeyDown} tabIndex={0} />
    </StyledInputWrapper>
  );
};

MessageInput.propTypes = {
  placeholder: PropTypes.string,
};

export default MessageInput;
