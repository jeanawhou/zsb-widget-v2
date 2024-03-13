import React from 'react';
import useSelector from 'src/store/useSelector';
import { StyledBotReply, StyledMessage } from './StyledComponents';
import {
  clientBubbleColorSelector,
  fontSizeSelector,
  isTypingSelector,
  replyBubbleColorSelector,
} from 'src/store/selectors/ui';

const Typing = () => {
  const replyBubbleGradient = useSelector(replyBubbleColorSelector);
  const clientBubbleColor = useSelector(clientBubbleColorSelector);
  const fontSize = useSelector(fontSizeSelector);
  const isTyping = useSelector(isTypingSelector);
  return isTyping ? (
    <StyledMessage $fontsize={fontSize}>
      <StyledBotReply color={replyBubbleGradient} dotcolor={clientBubbleColor} className="typing">
        <span></span>
        <span></span>
        <span></span>
      </StyledBotReply>
    </StyledMessage>
  ) : null;
};

export default Typing;
