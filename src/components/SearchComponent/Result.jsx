import React from 'react';
import PropTypes from 'prop-types';
import useSelector from 'src/store/useSelector';
import { lastHistorySelector } from 'src/store/selectors/history';
import { StyledFlexColumnLeft } from '../ChatWidget/StyledComponents';
import Answer from './Answer';
import { InfoCircleFilled, WarningFilled } from '@ant-design/icons';
import { cssVariables } from 'src/styles/variables';
import { hasSearchErrorSelector, isSearchingSelector } from 'src/store/selectors/ui';
import { Spin } from 'antd';
import { DEFAULT_ERROR_MESSAGE } from 'src/constants/chat';

const Result = (props) => {
  const lastHistory = useSelector(lastHistorySelector);
  const spinning = useSelector(isSearchingSelector);
  const hasSearchError = useSelector(hasSearchErrorSelector);

  const { value } = props;

  return value && lastHistory.text === value ? (
    <Spin spinning={spinning} tip={'Just a moment...'}>
      <StyledFlexColumnLeft>
        <h4>
          {'Result'}{' '}
          {hasSearchError ? (
            <WarningFilled title={'Error'} style={{ color: cssVariables.warning }} />
          ) : (
            <InfoCircleFilled title={'Answer'} style={{ color: cssVariables.blueLike, marginLeft: 10 }} />
          )}
        </h4>
        <StyledFlexColumnLeft>
          {hasSearchError ? (
            <Answer answer={DEFAULT_ERROR_MESSAGE} isError={true} />
          ) : lastHistory.reply ? (
            <>
              <Answer answer={lastHistory.reply} />{' '}
            </>
          ) : null}
        </StyledFlexColumnLeft>
      </StyledFlexColumnLeft>
    </Spin>
  ) : null;
};

Result.propTypes = {
  value: PropTypes.string,
};

export default Result;
