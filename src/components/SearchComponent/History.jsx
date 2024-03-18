import React from 'react';
import PropTypes from 'prop-types';

import { StyledHistoryItem, StyledHistoryWrapper } from './StyledComponent';
import useSelector from 'src/store/useSelector';
import { historyDescSelector, lastHistorySelector, shouldShowHistoryTitleSelector } from 'src/store/selectors/history';
import Question from './Question';
import Answer from './Answer';

const History = (props) => {
  const { value } = props;

  const allHistory = useSelector(historyDescSelector);
  const lastHistory = useSelector(lastHistorySelector);
  const shouldShowHistory = useSelector(shouldShowHistoryTitleSelector, value);

  return allHistory.length ? (
    <StyledHistoryWrapper>
      {allHistory?.length < 1 ? null : (
        <>
          {shouldShowHistory ? <h4>{'History'}</h4> : null}
          {allHistory.map((history, idx) => {
            if (
              value &&
              lastHistory.text &&
              lastHistory.text.trim() === value.trim() &&
              history.text.trim() === value.trim()
            ) {
              return <div key={`history-${idx}`}></div>;
            }
            return (
              <StyledHistoryItem key={`history-${idx}`}>
                {history.text ? <Question time={history.timeReply} question={history.text} /> : null}
                {history.reply ? <Answer feedback={history.feedback} answer={history.reply} /> : null}
              </StyledHistoryItem>
            );
          })}
        </>
      )}
    </StyledHistoryWrapper>
  ) : (
    <></>
  );
};

History.propTypes = {
  value: PropTypes.string,
};

export default History;
