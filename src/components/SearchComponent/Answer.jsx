import React from 'react';
import PropTypes from 'prop-types';
import { isPlainObject } from 'lodash';

import { StyledAnswerWrapper } from './StyledComponent';
import DOMPurify from 'dompurify';
import Feedback from './Feedback';

const Answer = ({ answer, isResult, isLoading, feedback }) => {
  const displayAnswer =
    typeof answer === 'string'
      ? answer
      : isPlainObject(answer) && typeof answer.text === 'string'
        ? answer.text
        : Array.isArray(answer.text)
          ? answer.text.join(' ')
          : null;

  return (
    <div>
      <StyledAnswerWrapper>
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(displayAnswer),
          }}
        />
      </StyledAnswerWrapper>
      {!isLoading ? <Feedback feedback={feedback} isResult={isResult} /> : null}
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]).isRequired,
  isResult: PropTypes.bool,
  isLoading: PropTypes.bool,
  feedback: PropTypes.number,
};

export default Answer;
