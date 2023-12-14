import styled, { css } from 'styled-components';
import { cssVariables } from '../styles/variables';

export const StyledFlexRowCenter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledFlexRowLeft = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledFlexRowSpaceBetween = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const StyledFlexColumnSpaceBetween = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const StyledFlexColumnSpaceEvenly = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

export const StyledFlexRowSpaceEvenly = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

export const StyledFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledSubtitle = styled.span`
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledChatWrapper = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${(props) =>
    props.minimized === 'true'
      ? css`
          .anticon {
            box-shadow: ${cssVariables.boxShadow};
            background-color: ${(props) => props.color || cssVariables.zsbCyan};
            color: ${(props) => props.textColor || '#fff'};
            font-size: 36px;
            padding: 10px;
            border-radius: 50%;
          }
        `
      : css`
          width: ${(props) => props.width || '300px'};
          border: 1px solid #ccc;
          border-radius: 0 0 9px 9px;
          box-shadow: ${cssVariables.boxShadow};
          min-height: 250px;
          background-color: #fff;
          padding: 5px 5px 0px 5px;
          animation: fadeIn 0.25s ease-in-out;

          .anticon-close {
            color: ${(props) => props.textColor || '#fff'};
            position: absolute;
            right: 10px;
          }
        `}
`;

export const StyledWidgetWrapper = styled.div`
  font-size: 16px;
  font-family: 'Roboto', sans-serif !important;
  position: fixed;
  bottom: 20px;
  right: 20px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }

  @keyframes reverseRotate {
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(0deg);
    }
  }

  .chat-launcher {
    cursor: pointer;
    height: 40px;
    width: 40px;
    margin-top: 10px;
    float: right;
    background: ${(props) => props.color || cssVariables.zsbCyanGradient};
    padding: 5px;
    border-radius: 50%;
    box-shadow: ${cssVariables.boxShadow};

    &.isLogoOnly {
      padding: 0px;
      margin: 0px;
      box-shadow: none;
      cursor: default;
      background: none;
    }
    ${(props) =>
      props.minimized === 'false'
        ? css`
            border-radius: 50%;
            border: 1px solid ${(props) => props.color || cssVariables.zsbCyanGradient};
            width: 40px;
            height: 40px;
            background: ${(props) => props.color || cssVariables.zsbCyanGradient};

            &.anticon-close {
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 5px;
              font-size: 24px;
              color: #fff;
              animation: rotate 0.5s linear;
            }
          `
        : css`
            animation: reverseRotate 0.5s linear;
          `}
  }
`;

export const StyledChatHeader = styled(StyledFlexRowCenter)`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  background: ${(props) => props.color || cssVariables.zsbCyanGradient};
  color: ${(props) => props.textColor || '#fff'};
  padding: 6px;
  width: ${(props) => props.width || '300px'};
  border-radius: 5px 5px 0px 0px;
  box-shadow: ${cssVariables.boxShadow};
  height: 100px;
  align-items: center;
  text-overflow: ellipsis;
  animation: fadeIn 0.5s ease-in-out;

  h3,
  h4 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0px 5px;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  > :first-child {
    min-width: 16px;
  }
`;

export const StyledMessagesWrapper = styled.div`
  width: 100%;
  display: ${(props) => (props.minimized ? 'none' : 'flex')};
  overflow-y: auto;
  min-height: 220px;
  height: ${(props) => props.height || '350px'};
  flex-direction: column;

  > :first-child {
    margin: 5px;
  }
  > * + * {
    margin: 5px;
  }
`;

export const StyledMessage = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: column;
  word-break: break-word;
  margin-bottom: 5px;
  margin: ${(props) => (props.quickreply === 'true' ? '0' : '5px')};

  > em {
    margin-top: 5px;
    font-size: 10px;
  }
`;

export const StyledClientMessage = styled(StyledMessage)`
  align-items: ${(props) => (props.quickreply === 'true' ? 'center' : 'flex-end')};
  width: ${(props) => (props.quickreply === 'true' ? '100%' : 'inherit')};

  > span:first-child {
    max-width: ${(props) => (props.quickreply === 'true' ? '100%' : '80%')};
    padding: ${(props) => (props.quickreply === 'true' ? '5px 8px' : '8px')};
    margin: ${(props) => (props.quickreply === 'true' ? '0px 5px' : '0')};
    cursor: ${(props) => (props.quickreply === 'true' ? 'pointer' : 'auto')};
    width: fit-content;
    border-radius: 10px;
    background: ${(props) => (props.reaction === 'true' ? '#f0f0f0' : props.color || cssVariables.zsbCyanGradient)};
    color: ${(props) => props.textColor || '#fff'};
  }
`;

export const StyledReplyFooter = styled(StyledFlexRowSpaceBetween)`
  > em {
    margin-top: 5px;
    font-size: 10px;
  }

  .anticon {
    margin-right: 0px;
    margin-top: -18px;
  }
`;

export const StyledQuickReplyWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 5px 0;
  width: 100%;
`;

export const StyledBotReply = styled(StyledMessage)`
  align-items: flex-start;
  max-width: 80%;

  &.typing {
    background-color: #f0f0f0;
    text-align: left;
    width: fit-content;
    padding: 10px 4px;
    border-radius: 5px;
    width: 45px;
    height: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    > span {
      padding: 5px !important;
      content: '';
      animation: blink 1s infinite;
      animation-fill-mode: both;
      background: ${(props) => (props.color ? props.color : cssVariables.zsbCyan)} !important;
      top: 5px;
      border-radius: 50% !important;
      text-align: center;

      &:first-child {
        animation-delay: 0.1s;
        margin-left: 0;
        left: 5px;
      }

      &:nth-child(2) {
        animation-delay: 0.2s;
        margin-left: 5px * 1.5;
        left: 18px;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
        margin-left: 5px * 3;
        left: 32px;
      }
    }
  }

  @keyframes blink {
    0% {
      opacity: 0.1;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

export const StyledReplyMessageContent = styled.span`
  border-radius: 10px;
  background-color: #f0f0f0;
  text-align: left;
  width: fit-content;
  padding: 8px;
  line-height: 18px;
  margin: 5px 0;

  .anticon:not(.anticon-warning) {
    display: block;
    margin-right: -5px;
    margin-bottom: -12px;
    text-align: end;
  }

  .anticon-warning {
    margin-right: 5px;
  }

  p:last-child,
  p:last-child,
  span > p:last-child,
  span > p:only-child {
    margin: 0;
  }
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  textarea {
    resize: none;
    border-radius: 5px;
    width: 100%;
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    max-height: 100px;
  }

  .anticon-send {
    margin-left: 5px;
  }

  input[type='text'] {
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: auto;
  }
`;

export const StyledChatHeaderActionIcons = styled(StyledFlexColumnSpaceBetween)`
  width: auto;
  height: 100%;

  .anticon {
    cursor: pointer;
  }
`;
