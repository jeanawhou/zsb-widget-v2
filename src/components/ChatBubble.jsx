import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';

import { extractDisplayAnswer } from 'src/store/helpers/messages';
import { StyledFlexRowLeft, StyledReplyMessageContent } from './StyledComponents';
import { cssVariables } from 'src/styles/variables';

const ChatBubble = ({ content, messageIcon, children, feedback, isForm }) => {
  return (
    <StyledReplyMessageContent>
      <StyledFlexRowLeft>
        {messageIcon || null}
        {isForm ? (
          <span>{content}</span>
        ) : (
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(extractDisplayAnswer(content || children)),
            }}
          />
        )}
      </StyledFlexRowLeft>

      {feedback === 1 ? (
        <LikeFilled style={{ color: cssVariables.blueLike }} />
      ) : feedback === 0 ? (
        <DislikeFilled style={{ color: cssVariables.redLike }} />
      ) : null}
    </StyledReplyMessageContent>
  );
};

ChatBubble.propTypes = {
  content: PropTypes.any,
  bubbleIndex: PropTypes.bool,
  isForm: PropTypes.bool,
  messageIcon: PropTypes.any,
  children: PropTypes.any,
  feedback: PropTypes.number,
};

export default ChatBubble;
