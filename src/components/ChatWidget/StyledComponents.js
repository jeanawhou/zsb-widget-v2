import styled, { css } from 'styled-components';
import { cssVariables } from '../../styles/variables';
import { DESKTOP_HEIGHT, MOBILE_HEIGHT } from 'src/constants/viewport';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from 'src/constants/chat';
import Avatar from '../Avatar';

export const StyledFlexRowCenter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledFlexbox = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledFlexCenter = styled(StyledFlexbox)`
  justify-content: center;
  align-items: center;
`;

export const StyledFlexRowRight = styled(StyledFlexbox)`
  ${StyledFlexCenter};
  flex-direction: row;
  justify-content: flex-end;
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
  gap: 5px;
`;

export const StyledActionButtonsWrapper = styled(StyledFlexRowSpaceEvenly)`
  margin-top: 10px;
  > button {
    width: 100%;
  }

  .ant-form-item {
    margin-bottom: 0px;
  }
`;

export const StyledFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledFlexColumnLeft = styled(StyledFlexColumn)`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: start;
`;

export const StyledFlexColumnRight = styled(StyledFlexColumn)`
  ${StyledFlexbox};
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const StyledSubtitle = styled.span`
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledChatWrapper = styled(StyledFlexColumn)`
  display: flex;
  justify-content: space-between;

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
  ${(props) => {
    return props.minimized === 'true'
      ? css`
          height: 0px;
          .anticon {
            background-color: ${(props) => props.color || cssVariables.zsbCyan};
            color: ${(props) => props.textcolor || '#fff'};
            font-size: 36px;
            padding: 10px;
            border-radius: 50%;
          }
        `
      : // from here minimize is already false
        css`
          width: ${(props) =>
            props.fullscreen === 'true' || props.mobile === 'true' || props.halfscreen === 'true'
              ? '100%'
              : props.width || '300px'};
          border: 1px solid #ccc;
          border-radius: ${(props) =>
            !(props.mobile === 'true' || props.fullscreen === 'true' || props.fullheight === 'true')
              ? '0 0 9px 9px'
              : '0px'};
          /* box-shadow: ${cssVariables.boxShadow}; */
          min-height: 250px;
          background-color: #fff;
          animation: fadeIn 0.25s ease-in-out;

          .anticon-close {
            color: ${(props) => props.textcolor || '#fff'};
            position: absolute;
            right: 10px;
          }

          ${(props.mobile === 'true' || props.fullscreen === 'true') && props.minimized === 'false'
            ? css`
                @media (min-height: ${MOBILE_HEIGHT.tall}) {
                  height: ${props.fullheight === 'true' || props.fullscreen === 'true' || props.halfscreen === 'true'
                    ? '98%'
                    : props.height || '98%'};
                  width: ${props.fullscreen === 'true' || props.mobile === 'true' || props.halfscreen === 'true'
                    ? '100%'
                    : props.width || DEFAULT_WIDTH};
                }

                @media (max-height: ${MOBILE_HEIGHT.short}) {
                  height: ${props.fullheight === 'true' || props.fullscreen === 'true' || props.halfscreen === 'true'
                    ? '86%'
                    : props.height || '86%'};
                  width: ${props.fullscreen === 'true' || props.mobile === 'true' || props.halfscreen === 'true'
                    ? '100%'
                    : props.width || DEFAULT_WIDTH};
                }
                @media (max-height: ${MOBILE_HEIGHT.tall}) and (min-height: ${MOBILE_HEIGHT.short}) {
                  height: ${props.fullheight === 'true' || props.fullscreen === 'true' || props.halfscreen === 'true'
                    ? '95%'
                    : props.height || '95%'};
                  width: ${props.fullscreen === 'true' || props.mobile === 'true' || props.halfscreen === 'true'
                    ? '100%'
                    : props.width || DEFAULT_WIDTH};
                }
              `
            : css`
                @media (max-height: ${DESKTOP_HEIGHT.tall}) {
                  width: ${(props.fullscreen === 'true' || props.mobile === 'true' || props.halfscreen === 'true') &&
                  props.minimized === 'false'
                    ? '100%'
                    : props.width || DEFAULT_WIDTH};
                  height: ${props.fullheight === 'true' || props.fullscreen === 'true' || props.halfscreen === 'true'
                    ? '86%'
                    : props.height || DEFAULT_HEIGHT};
                }

                @media (min-height: ${DESKTOP_HEIGHT.tall}) {
                  width: ${(props.fullscreen === 'true' || props.mobile === 'true' || props.halfscreen === 'true') &&
                  props.minimized === 'false'
                    ? '100%'
                    : props.width || DEFAULT_WIDTH};
                  height: ${props.fullheight === 'true' || props.fullscreen === 'true' || props.halfscreen === 'true'
                    ? '92%'
                    : props.height || DEFAULT_HEIGHT};
                }
              `}
        `;
  }};
`;

export const StyledLauncherWrapper = styled.div`
  color: #fff;
  width: fit-content !important;
  position: ${(props) => (props.minimized === 'true' ? 'fixed' : 'unset')};

  margin-top: ${(props) =>
    props.position?.includes('mid')
      ? 'auto'
      : props.position?.includes('top')
        ? '0px'
        : props.position?.includes('bottom')
          ? '10px'
          : 'inherit'};
  margin-bottom: ${(props) =>
    props.position?.includes('mid')
      ? 'auto'
      : props.position?.includes('bottom')
        ? '0px'
        : props.position?.includes('top')
          ? '10px'
          : 'inherit'};
  margin-left: ${(props) =>
    props.position?.includes('left')
      ? '0px'
      : props.position?.includes('mid')
        ? 'auto'
        : props.position?.includes('right')
          ? '10px'
          : 'inherit'};
  margin-right: ${(props) =>
    props.position?.includes('right')
      ? '0px'
      : props.position?.includes('mid')
        ? 'auto'
        : props.position?.includes('left')
          ? '10px'
          : 'inherit'};

  float: ${(props) => (props.position?.includes('left') ? 'left' : 'right')};
  top: ${(props) =>
    props.minimized === 'true' && props.position?.includes('top')
      ? '10px'
      : props.position?.includes('mid')
        ? '50%'
        : 'unset'};
  bottom: ${(props) =>
    props.minimized === 'true' && props.position?.includes('bottom')
      ? '10px'
      : props.position?.includes('mid')
        ? '50%'
        : 'unset'};
  left: ${(props) => {
    const parsedAdjustment = props?.adjustment ? Math.abs(Number(props.adjustment)) : null;
    return props.position?.includes('mid') && typeof parsedAdjustment === 'number' && props.position?.includes('left')
      ? parsedAdjustment < 0
        ? `${Math.abs(parsedAdjustment)}px`
        : `-${parsedAdjustment}px`
      : props.minimized === 'true' && props.position?.includes('left') && props.position?.includes('mid')
        ? '50%'
        : 'unset';
  }};
  right: ${(props) => {
    const parsedAdjustment = props?.adjustment ? Math.abs(Number(props.adjustment)) : null;
    return props.position?.includes('mid') && typeof parsedAdjustment === 'number' && props.position?.includes('right')
      ? parsedAdjustment < 0
        ? `${Math.abs(parsedAdjustment)}px`
        : `-${parsedAdjustment}px`
      : props.minimized === 'true' && props.position?.includes('right') && props.position?.includes('mid')
        ? '50%'
        : 'unset';
  }};
  rotate: ${(props) =>
    props.position?.includes('mid-right') ? '-90deg' : props.position?.includes('mid-left') ? '90deg' : 'none'};
  ${(props) =>
    props.position?.includes('left')
      ? css`
          ${StyledFlexRowLeft};
        `
      : css`
          ${StyledFlexRowRight};
        `}

  /* mid position needs more testing */
  width: ${(props) => (props.position?.includes('mid') ? '40px' : 'auto')};
  cursor: ${(props) => (props.disableclose === 'true' ? 'not-allowed' : 'pointer')};
`;

export const StyledWidgetLabel = styled(StyledFlexRowCenter)`
  white-space: nowrap;
  padding: 12px;
  border-radius: ${(props) =>
    !(props.mobile === 'true' || props.fullscreen === 'true' || props.fullheight === 'true') ? '5px' : '0px'};
  width: auto;
  background: ${(props) => props.color || cssVariables.zsbCyan};
`;

export const StyledWidgetWrapper = styled.div`
  font-size: 16px;
  font-family: Roboto, sans-serif !important;
  height: ${(props) =>
    (props.fullheight === 'true' ||
      props.fullscreen === 'true' ||
      props.halfscreen === 'true' ||
      props.mid === 'true') &&
    props.minimized === 'false'
      ? '100%'
      : props.minimized === 'true'
        ? 'auto'
        : 'auto'};
  width: ${(props) =>
    props.halfscreen === 'true' && props.minimized === 'false'
      ? '50%'
      : (props.fullscreen === 'true' || props.mobile === 'true') && props.minimized === 'false'
        ? '100%'
        : props.minimized === 'true'
          ? 'auto'
          : props.width || DEFAULT_WIDTH};
  position: ${(props) => (props.minimized === 'false' ? 'fixed' : 'relative')};
  bottom: ${(props) =>
    props.position?.includes('mid')
      ? 0
      : props.position?.includes('bottom') ||
          props.fullheight === 'true' ||
          props.fullscreen === 'true' ||
          props.halfscreen === 'true'
        ? '0px'
        : 'inherit'};
  right: ${(props) => (props.position?.includes('right') ? '0px' : 'inherit')};
  top: ${(props) =>
    props.position?.includes('mid')
      ? 0
      : props.position?.includes('top') ||
          props.fullheight === 'true' ||
          props.fullscreen === 'true' ||
          props.halfscreen === 'true'
        ? '0px'
        : 'inherit'};
  left: ${(props) => (props.position?.includes('left') ? '0px' : 'inherit')};
  /* TODO: needs cleanup */
  margin-bottom: ${(props) =>
    props.minimized === 'true'
      ? '0px'
      : props.position?.includes('mid')
        ? 'auto'
        : props.mobile !== 'true' && props.minimized === 'true' && props.position?.includes('bottom')
          ? '10px'
          : props.fullheight === 'false' &&
              props.fullscreen === 'false' &&
              props.halfscreen === 'false' &&
              props.position?.includes('bottom')
            ? '10px'
            : props.minimized === 'false' &&
                (props.fullheight === 'true' || props.fullscreen === 'true') &&
                props.position?.includes('bottom')
              ? '0px'
              : 'inherit'};
  margin-right: ${(props) =>
    props.minimized === 'true'
      ? '0px'
      : props.position === 'mid-right' && props.minimized === 'true'
        ? '-50px'
        : props.mobile !== 'true' && props.minimized === 'true' && props.position?.includes('right')
          ? '10px'
          : props.fullheight === 'false' &&
              props.fullscreen === 'false' &&
              props.halfscreen === 'false' &&
              props.position?.includes('right')
            ? '10px'
            : props.minimized === 'false' &&
                (props.fullheight === 'true' || (props.fullheight === 'false' && props.fullscreen === 'false')) &&
                props.position?.includes('right')
              ? '0px'
              : 'inherit'};
  margin-top: ${(props) =>
    props.minimized === 'true'
      ? '0px'
      : props.position?.includes('mid')
        ? 'auto'
        : props.mobile !== 'true' && props.minimized === 'true' && props.position?.includes('top')
          ? '10px'
          : props.fullheight === 'false' &&
              props.fullscreen === 'false' &&
              props.halfscreen === 'false' &&
              props.position?.includes('top')
            ? '10px'
            : props.minimized === 'false' &&
                (props.fullheight === 'true' || props.fullscreen === 'true') &&
                props.position?.includes('top')
              ? '0px'
              : 'inherit'};
  margin-left: ${(props) =>
    props.minimized === 'true'
      ? '0px'
      : props.position === 'mid-left' && props.minimized === 'true'
        ? '-50px'
        : props.mobile !== 'true' && props.minimized === 'true' && props.position?.includes('left')
          ? '10px'
          : props.fullheight === 'false' &&
              props.fullscreen === 'false' &&
              props.halfscreen === 'false' &&
              props.position?.includes('left')
            ? '10px'
            : props.minimized === 'false' &&
                (props.fullheight === 'true' || props.fullscreen === 'true') &&
                props.position?.includes('left')
              ? '0px'
              : 'inherit'};

  text-align: ${(props) => (props.position?.includes('left') ? 'left' : 'right')};
  text-align: ${(props) => (props.position?.includes('right') ? '-webkit-right' : '-webkit-left')};
  display: flex;
  flex-direction: ${(props) => (props.position?.includes('mid-right') ? 'row' : 'column')};
  ${(props) => {
    if (props.position?.includes('top')) {
      return css`
        flex-direction: column-reverse;
      `;
    } else if (props.position?.includes('bottom')) {
      return css`
        flex-direction: column;
      `;
    } else if (props.position?.includes('mid-right')) {
      return css`
        flex-direction: row;
      `;
    } else {
      return css`
        flex-direction: row-reverse;
      `;
    }
  }}
  align-items: ${(props) => (props.position?.includes('left') ? 'flex-start' : 'flex-end')};

  > * {
    align-self: ${(props) => (props.position?.includes('mid') ? 'center' : 'auto')};
    height: ${(props) =>
      props.minimized === 'false' &&
      (props.fullheight === 'true' || props.fullscreen === 'true' || props.halfscreen === 'true')
        ? '100%'
        : 'auto'};
    width: ${(props) =>
      (props.fullscreen === 'true' || props.mobile === 'true' || props.halfscreen === 'true') &&
      props.minimized === 'false'
        ? '100%'
        : 'auto'};
  }

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
    background: ${(props) => props.color || cssVariables.zsbCyan};
    padding: 5px;
    border-radius: ${(props) => (props.shape?.includes('circle') ? '50%' : '5px')};
    box-shadow: ${cssVariables.boxShadow};

    &.disableclose {
      cursor: not-allowed;
    }

    > :first-child {
      height: 100%;
      width: 100%;
    }

    &:first-child.anticon-close svg {
      height: 70%;
      width: 70%;
    }

    &.isLogoOnly {
      padding: 0px;
      margin: 0px;
      box-shadow: none;
      cursor: default;
      background: none;
      border: none;
    }
    ${(props) =>
      props.minimized === 'false'
        ? css`
            border-radius: 50%;
            border: 1px solid ${(props) => props.color || cssVariables.zsbCyan};
            width: 40px;
            height: 40px;
            background: ${(props) => props.color || cssVariables.zsbCyan};

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

  img.chat-launcher {
    background: none;
    padding: 0;
    height: 100%;
    width: 50px;
    box-shadow: ${cssVariables.noPaddingShadow};
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

  background: ${(props) => props.color || cssVariables.zsbCyan};
  color: #fff;
  padding: 6px 1px;
  border-radius: ${(props) =>
    !(
      props.mobile === 'true' ||
      props.fullscreen === 'true' ||
      props.fullheight === 'true' ||
      props.halfscreen === 'true'
    )
      ? '10px 10px 0px 0px'
      : '0px'};
  height: ${(props) => (props.fullheight === 'true' || props.fullscreen === 'true' ? '12%' : '100px')};
  max-height: 120px;
  align-items: center;
  text-overflow: ellipsis;
  animation: fadeIn 0.5s ease-in-out;

  > div:not(:last-child) {
    margin: 0 10px;
  }

  ${(props) => {
    return props.mobile === 'true' ||
      props.fullscreen === 'true' ||
      props.fullheight === 'true' ||
      props.halfscreen === 'true'
      ? css`
          width: ${props.fullscreen === 'true' || props.mobile === 'true' || props.halfscreen === 'true'
            ? '100%'
            : props.width || DEFAULT_WIDTH};
        `
      : props.width
        ? css`
            width: ${props.width};
          `
        : css`
            width: ${DEFAULT_WIDTH};
          `;
  }}

  h3,
  h4 {
    color: #fff;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0px 5px;
    margin-left: 0px;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  > :first-child {
    min-width: 16px;
  }

  :first-child,
  :last-child {
    > * + * {
      margin: 0px 5px;
    }
  }
`;

export const StyledMessagesWrapper = styled.div`
  width: 100%;
  display: ${(props) => (props.minimized ? 'none' : 'flex')};
  overflow-y: auto;
  min-height: ${(props) => (props.fullheight === 'true' || props.fullscreen === 'true' ? '5%' : '220px')};
  height: ${(props) =>
    props.fullheight === 'true' || props.fullscreen === 'true' || props.halfscreen === 'true'
      ? '100%'
      : props.minimized !== 'true'
        ? '100%'
        : 'auto'};
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
  font-size: ${(props) => props.$fontsize};
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
  text-align: left;

  > span:first-child {
    max-width: ${(props) => (props.quickreply === 'true' ? '100%' : '80%')};
    padding: ${(props) => (props.quickreply === 'true' ? '6px 8px' : '8px')};
    margin: ${(props) => (props.quickreply === 'true' ? '0px 5px' : '0')};
    cursor: ${(props) => (props.quickreply === 'true' ? 'pointer' : 'auto')};
    width: fit-content;
    border-radius: 10px;
    background: ${(props) => (props.reaction === 'true' ? '#f0f0f0' : props.color || cssVariables.zsbCyan)};
    color: ${(props) => props.textColor || '#fff'};
  }
`;

export const StyledReplyFooter = styled(StyledFlexRowSpaceBetween)`
  margin-left: 30px;
  > em {
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
    background: ${(props) => props.color || cssVariables.zsbCyan} !important;
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
      background: ${(props) => props.dotcolor || cssVariables.zsbCyan} !important;
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

  img {
    background: none;
  }

  img,
  svg {
    padding: 0;
    margin: 0;
    margin-right: 5px;
    margin-left: -10px;
  }

  .anticon-warning,
  .anticon-user {
    padding: 0;
    margin: 0;
    margin-right: 5px;
    margin-left: -10px;
    font-size: 24px;
    display: flex;
    align-self: flex-start;
    margin-top: 12px;
  }

  .anticon-user {
    background: ${(props) => props.widgetthemecolor || cssVariables.zsbCyan};
    padding: 5px;
    border-radius: 50%;
    color: #fff;
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
  background: ${(props) => props.color || cssVariables.zsbCyan} !important;
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

  input {
    & * + * {
      margin: 5px 0px;
    }

    &:active,
    &:focus,
    &:hover {
      border-bottom: 1.5px solid ${cssVariables.grayBorder};
    }
  }

  input:not(:first-child) {
    margin-top: 5px;
  }

  input {
    border-bottom: 1px solid ${cssVariables.grayBorder};
    border-radius: 3px;
  }

  input.ant-input-status-error {
    border-bottom: 1px solid ${cssVariables.redLike};
  }

  form#user-form {
    > .ant-form-item {
      margin-bottom: 5px;
    }

    .ant-form-item-explain-error {
      font-size: 12px;
    }
  }
`;

export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 3px 10px 3px;
  width: 98%;
  border: 1px solid ${cssVariables.grayBorder};
  height: inherit;

  textarea {
    border: none !important;
    resize: none;
    border-radius: 5px;
    width: 100%;
    font-size: 14px;
    line-height: normal;
    padding: 8px 5px;
    font-family: Roboto, sans-serif;
    max-height: 100px;
    margin-left: 5px;
  }

  .anticon-send {
    margin-left: 5px;
    font-size: 24px;
    color: ${(props) => props.color || cssVariables.zsbCyan};
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

    &.disableclose {
      cursor: not-allowed;
    }
  }

  &:has(> span:only-child) {
    margin: 5px;
    justify-content: flex-end;
  }
`;

export const StyledMessageBadge = styled.span`
  text-align: center;
  background: ${cssVariables.redLike};
  display: block;
  height: 20px;
  border-radius: 50%;
  margin-left: -16px;
  margin-top: -10px;
  width: 20px;
  font-size: 12px;
  color: #fff;
`;

export const StyledWSProcessStep = styled.span`
  font-size: 11px;
  color: ${(props) => props.color || cssVariables.zsbCyan};
  font-style: italic;
  text-transform: capitalize;

  > * {
    color: ${(props) => props.color || cssVariables.zsbCyan};
  }
`;

export const StyledChatHeaderAvatar = styled(Avatar)`
  width: 70px;
  margin-left: 5px;
`;

export const StyledChatReplyAvatar = styled(Avatar)`
  height: 43px;
  width: 50px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.color || 'none'};
`;
