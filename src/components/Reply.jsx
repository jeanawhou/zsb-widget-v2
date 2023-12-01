import PropTypes from 'prop-types';
import { LikeFilled } from '@ant-design/icons';

import { StyledBotReplyMessage, StyledMessage, StyledReplyFooter } from './StyledComponents';
import { cssVariables } from 'src/styles/variables';
import TimeStamp from './TimeStamp';

const Reply = ({ message }) => {
  const { timeReply, reply } = message;
  return (
    <StyledMessage>
      <StyledBotReplyMessage>
        <span>{reply}</span>
        <StyledReplyFooter>
          <em>
            <TimeStamp time={timeReply} />
          </em>
          <LikeFilled style={{ color: cssVariables.blueLike }} />
        </StyledReplyFooter>
      </StyledBotReplyMessage>
    </StyledMessage>
  );
};

Reply.propTypes = {
  message: PropTypes.shape({
    reply: PropTypes.string,
    timeReply: PropTypes.any,
  }),
};

export default Reply;
