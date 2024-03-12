import React from 'react';
import PropTypes from 'prop-types';
import { isPlainObject } from 'lodash';

import { StyledAnswerWrapper } from './StyledComponent';
import DOMPurify from 'dompurify';

const Answer = ({ answer }) => {
  const displayAnswer =
    typeof answer === 'string'
      ? answer
      : isPlainObject(answer) && typeof answer.text === 'string'
        ? answer.text
        : Array.isArray(answer.text)
          ? answer.text.join(' ')
          : null;

  return (
    <StyledAnswerWrapper>
      <span
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(displayAnswer),
        }}
      />
    </StyledAnswerWrapper>
  );
};

Answer.propTypes = {
  answer: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]).isRequired,
};

export default Answer;
