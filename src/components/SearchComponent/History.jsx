import React from 'react';
import PropTypes from 'prop-types';

import { StyledHistoryItem, StyledHistoryWrapper, StyledResultWrapper } from './StyledComponent';
import useSelector from 'src/store/useSelector';
import { historyDescSelector, lastHistorySelector, shouldShowHistoryTitleSelector } from 'src/store/selectors/history';
import Result from './Result';
import Question from './Question';
import Answer from './Answer';

const History = (props) => {
  const { value } = props;

  const allHistory = useSelector(historyDescSelector);
  const lastHistory = useSelector(lastHistorySelector);
  const shouldShowHistory = useSelector(shouldShowHistoryTitleSelector, value);

  return allHistory.length ? (
    <StyledResultWrapper>
      <StyledHistoryWrapper>
        <Result value={value} />

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
                  {history.reply ? <Answer answer={history.reply} /> : null}
                </StyledHistoryItem>
              );
            })}
          </>
        )}
      </StyledHistoryWrapper>
    </StyledResultWrapper>
  ) : (
    <></>
  );
};

History.propTypes = {
  value: PropTypes.string,
};

export default History;
