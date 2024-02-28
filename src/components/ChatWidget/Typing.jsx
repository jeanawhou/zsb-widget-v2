import useSelector from 'src/store/useSelector';
import { StyledBotReply, StyledMessage } from './StyledComponents';
import { clientBubbleColorSelector, replyBubbleColorSelector } from 'src/store/selectors/ui';

const Typing = () => {
  const replyBubbleGradient = useSelector(replyBubbleColorSelector);
  const clientBubbleColor = useSelector(clientBubbleColorSelector);
  return (
    <StyledMessage>
      <StyledBotReply color={replyBubbleGradient} dotcolor={clientBubbleColor} className="typing">
        <span></span>
        <span></span>
        <span></span>
      </StyledBotReply>
    </StyledMessage>
  );
};

export default Typing;
