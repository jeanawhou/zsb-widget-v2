import PropTypes from 'prop-types';

import { StyledClientMessage, StyledMessage } from './StyledComponents';
import TimeStamp from './TimeStamp';

const UserMessage = ({ message }) => {
  const { timeMessageSent, text } = message;

  return (
    <StyledMessage>
      <StyledClientMessage>
        <span>{text}</span>
        <em>
          <TimeStamp time={timeMessageSent} />
        </em>
      </StyledClientMessage>
    </StyledMessage>
  );
};

UserMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    timeMessageSent: PropTypes.any,
  }),
};

export default UserMessage;
