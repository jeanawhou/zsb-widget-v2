import { StyledBotReplyMessage, StyledMessage } from './StyledComponents';

const Typing = () => {
  return (
    <StyledMessage>
      <StyledBotReplyMessage className="typing">
        <span></span>
        <span></span>
        <span></span>
      </StyledBotReplyMessage>
    </StyledMessage>
  );
};

export default Typing;
