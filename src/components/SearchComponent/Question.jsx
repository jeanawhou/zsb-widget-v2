import React from 'react';
import PropTypes from 'prop-types';

import { StyledAnswerWrapper, StyledFlexRowIconFirst, StyledQuestionContent } from './StyledComponent';
import { ClockCircleOutlined } from '@ant-design/icons';
import TimeStamp from '../TimeStamp';

const Question = ({ question, time }) => {
  const displayQuestion = typeof question === 'string' ? question : Array.isArray(question) ? question.join(' ') : null;

  return (
    <StyledAnswerWrapper>
      <StyledQuestionContent>
        <StyledFlexRowIconFirst>
          <ClockCircleOutlined />
          <TimeStamp time={time} />
        </StyledFlexRowIconFirst>
        <span>{displayQuestion}</span>
      </StyledQuestionContent>
    </StyledAnswerWrapper>
  );
};

Question.propTypes = {
  question: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]).isRequired,
  time: PropTypes.string,
};

export default Question;
