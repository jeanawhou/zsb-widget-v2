import { StyledBotReply, StyledMessage } from './StyledComponents';

const Typing = () => {
  return (
    <StyledMessage>
      <StyledBotReply className="typing">
        <span></span>
        <span></span>
        <span></span>
      </StyledBotReply>
    </StyledMessage>
  );
};

export default Typing;
