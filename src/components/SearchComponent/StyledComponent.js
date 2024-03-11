import styled, { css } from 'styled-components';

import { cssVariables } from 'src/styles/variables';
import { Input } from 'antd';
import { StyledFlexColumnLeft, StyledFlexRowLeft } from '../ChatWidget/StyledComponents';

export const StyledInput = styled(Input)`
  height: ${(props) => props.$height || '55px'};

  .ant-input-wrapper {
    height: 100%;

    .ant-input-group-addon,
    .ant-input {
      font-size: 20px;
      height: ${(props) => props.$height || '55px'};
      background: transparent;
      border: none;
    }

    .anticon-arrow-right,
    .anticon-search {
      color: ${cssVariables.grayBorder};
      cursor: pointer;
    }

    ${(props) =>
      props.$isNotEmpty === 'true'
        ? css`
            border: none;
            border-radius: 0;

            .ant-input-group-addon,
            .ant-input {
              border: none;
              border-radius: 0px;
            }
          `
        : css`
            box-shadow: ${cssVariables.boxShadow};
            border-radius: 8px;
          `}
  }
`;

export const StyledComponentWrapper = styled.div`
  font-family: Roboto, sans-serif !important;

  ${(props) =>
    props.$isNotEmpty === 'true'
      ? css`
          min-height: auto;
          box-shadow: ${cssVariables.boxShadow};
          border-radius: 8px;
        `
      : css`
          height: ${(props) => props.$height || '55px'};
        `}

  hr {
    margin: 0;
    height: 1.25px;
    background-color: ${cssVariables.grayBorder};
  }
`;

export const StyledResultWrapper = styled(StyledFlexRowLeft)`
  height: 100%;
  width: 100%;

  .anticon {
    color: ${cssVariables.grayBorder};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 10px 0;
  }
`;

export const StyledContentsWrapper = styled(StyledFlexColumnLeft)`
  > * {
    text-align: left;
  }
`;

export const StyledHistoryWrapper = styled(StyledFlexColumnLeft)`
  margin: 5px 18px;

  .ant-spin-nested-loading {
    width: 100%;
  }

  .anticon-info-circle {
    color: ${cssVariables.blueLike};
  }
`;

export const StyledResultItem = styled(StyledFlexRowLeft)`
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 10px 0;
  padding-left: 16px;
  &:focus-visible,
  &:focus,
  &:active,
  &:hover {
    background-color: ${cssVariables.primaryBlueHover};
    margin: 0;
  }

  .anticon-search {
    margin-right: 18px;
    height: 20px;
    width: 20px;
  }
`;

export const StyledAnswerWrapper = styled(StyledFlexRowLeft)`
  margin: 0 !important;
  &:first-child {
    margin-right: 10px;
  }

  > span:nth-child(2) {
    width: 100%;

    > * {
      width: 100%;
    }
  }

  .anticon-info-circle {
    margin-right: 6px;
  }

  > span > p {
    margin: 5px 0;
  }
`;

export const StyledQuestionContent = styled(StyledFlexRowLeft)`
  &:first-child {
    margin-right: 10px;
    width: auto;
  }

  > * + * {
    margin: 10px 0;
  }
`;

export const StyledFlexRowIconFirst = styled(StyledFlexRowLeft)`
  margin-right: 10px;
  font-size: 12px;
  width: auto;

  svg {
    font-size: 16px;
    margin-right: 5px;
  }

  > div {
    font-size: 10px;
  }
`;

export const StyledHistoryItem = styled(StyledFlexColumnLeft)`
  > * + * {
    margin: 10px 0;
  }

  font-size: 14px;
  font-style: italic;

  p:only-child {
    margin: 0;
  }
`;
