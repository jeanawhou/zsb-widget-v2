import useSelector from 'src/store/useSelector';
import { StyledBotReply, StyledMessage } from './StyledComponents';
import { widgetThemeColorSelector } from 'src/store/selectors/ui';

const Typing = () => {
  const widgetThemeColor = useSelector(widgetThemeColorSelector);
  return (
    <StyledMessage>
      <StyledBotReply color={widgetThemeColor} className="typing">
        <span></span>
        <span></span>
        <span></span>
      </StyledBotReply>
    </StyledMessage>
  );
};

export default Typing;
