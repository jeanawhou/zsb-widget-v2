import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';

import { StyledFlexRowLeft, StyledReplyMessageContent } from './StyledComponents';
import { cssVariables } from 'src/styles/variables';
import { useCallback } from 'react';
import useSelector from 'src/store/useSelector';
import { replyBubbleColorSelector } from 'src/store/selectors/ui';

const ChatBubble = ({ content, messageIcon, children, feedback, isForm }) => {
  const replyBubbleGradient = useSelector(replyBubbleColorSelector);

  const renderContent = useCallback(() => {
    return isForm ? (
      <span>{content}</span>
    ) : (
      <span
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content || children),
        }}
      />
    );
  }, [children, content, isForm]);

  return (
    <StyledReplyMessageContent color={replyBubbleGradient}>
      <StyledFlexRowLeft>
        {messageIcon || null}
        {renderContent()}
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
