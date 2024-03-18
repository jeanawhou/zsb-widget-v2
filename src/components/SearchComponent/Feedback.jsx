import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { DislikeFilled, LikeFilled } from '@ant-design/icons';
import { cssVariables } from 'src/styles/variables';
import { StyledFeedbackWrapper } from './StyledComponent';
import useSelector from 'src/store/useSelector';
import { lastHistorySelector } from 'src/store/selectors/history';
import { apiService } from 'src/services/api.service';
import { Context } from 'src/store/store';
import { publicKeysSelector } from 'src/store/selectors';
import { userSelector } from 'src/store/selectors/user';
import { integrationSelector } from 'src/store/selectors/integration';
import { ADD_REACTION_TO_LAST_RESPONSE } from 'src/store/action';

const Feedback = ({ feedback, isResult }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, dispatch] = useContext(Context);
  const lastHistory = useSelector(lastHistorySelector);
  const publicKeys = useSelector(publicKeysSelector);
  const user = useSelector(userSelector);
  const integration = useSelector(integrationSelector);

  const handleAddFeedback = (reply) => {
    apiService.logFeedback(publicKeys, reply, lastHistory.interactionId || '', user, integration.name);
    dispatch({
      type: ADD_REACTION_TO_LAST_RESPONSE,
      payload: reply,
    });
  };
  return (
    <StyledFeedbackWrapper>
      {typeof feedback === 'number' ? (
        <>{feedback ? <LikeFilled style={{ cursor: 'auto' }} /> : <DislikeFilled style={{ cursor: 'auto' }} />}</>
      ) : !feedback && isResult ? (
        <>
          <span>{'Helpful?'}</span>
          <LikeFilled twoToneColor={cssVariables.blueLike} onClick={() => handleAddFeedback(1)} />
          <DislikeFilled onClick={() => handleAddFeedback(0)} />
        </>
      ) : null}
    </StyledFeedbackWrapper>
  );
};

Feedback.propTypes = {
  feedback: PropTypes.number,
  isResult: PropTypes.bool,
};

export default Feedback;
