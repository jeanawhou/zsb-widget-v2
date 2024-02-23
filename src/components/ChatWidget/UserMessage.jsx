import PropTypes from 'prop-types';

import { StyledClientMessage, StyledMessage } from './StyledComponents';
import TimeStamp from './TimeStamp';
import DOMPurify from 'dompurify';
import useSelector from 'src/store/useSelector';
import { widgetThemeColorSelector } from 'src/store/selectors/ui';

const UserMessage = ({ message }) => {
  const { timeMessageSent, text } = message;
  const widgetThemeColor = useSelector(widgetThemeColorSelector);

  return (
    <StyledMessage>
      <StyledClientMessage color={widgetThemeColor}>
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(text),
          }}
        />
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
