import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';

import { StyledInputWrapper } from '../StyledComponents';
import { useMessageInput } from './hooks';
import useSelector from 'src/store/useSelector';
import { chatConfigSelector } from 'src/store/selectors/ui';

const MessageInput = (props) => {
  const chatConfig = useSelector(chatConfigSelector);
  const { placeholder, ...rest } = chatConfig;
  const { handleKeyDown, handleSendMessage, setNewMessage, newMessage, isExpanded } = useMessageInput({
    props,
  });
  return (
    <StyledInputWrapper {...rest}>
      <textarea
        rows={1}
        placeholder={placeholder}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus={isExpanded}
      />
      <SendOutlined label="Send" onClick={handleSendMessage} onKeyDown={handleKeyDown} tabIndex={0} />
    </StyledInputWrapper>
  );
};

MessageInput.propTypes = {
  placeholder: PropTypes.string,
};

export default MessageInput;
