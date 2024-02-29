import useSelector from 'src/store/useSelector';
import { StyledBotReply, StyledMessage } from './StyledComponents';
import { clientBubbleColorSelector, fontSizeSelector, replyBubbleColorSelector } from 'src/store/selectors/ui';

const Typing = () => {
  const replyBubbleGradient = useSelector(replyBubbleColorSelector);
  const clientBubbleColor = useSelector(clientBubbleColorSelector);
  const fontSize = useSelector(fontSizeSelector);
  return (
    <StyledMessage fontsize={fontSize}>
      <StyledBotReply color={replyBubbleGradient} dotcolor={clientBubbleColor} className="typing">
        <span></span>
        <span></span>
        <span></span>
      </StyledBotReply>
    </StyledMessage>
  );
};

export default Typing;
