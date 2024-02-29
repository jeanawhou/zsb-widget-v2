import PropTypes from 'prop-types';
import { WarningFilled } from '@ant-design/icons';

import useSelector from 'src/store/useSelector';
import {
  chatConfigSelector,
  fontSizeSelector,
  replyBubbleColorSelector,
  showIconOnReplySelector,
  widgetThemeColorSelector,
} from 'src/store/selectors/ui';
import { cssVariables } from 'src/styles/variables';

import {
  StyledBotReply,
  StyledChatReplyAvatar,
  StyledFlexColumnLeft,
  StyledFlexRowLeft,
  StyledMessage,
  StyledReplyFooter,
  StyledWSProcessStep,
} from './StyledComponents';
import TimeStamp from './TimeStamp';
import ChatBubble from './ChatBubble';
import AgentHandoverForm from './AgentHandoverForm';
import Typing from './Typing';
import { ALPHANUMBERIC_REGEX } from 'src/constants';
import { websocketSelector } from 'src/store/selectors';

const Reply = ({ message }) => {
  const { timeReply, reply, type, feedback, isLastMessage } = message;
  const widgetThemeColor = useSelector(widgetThemeColorSelector);
  const replyBubbleGradient = useSelector(replyBubbleColorSelector);
  const chatConfig = useSelector(chatConfigSelector);
  const showIconOnReply = useSelector(showIconOnReplySelector);
  const fontSize = useSelector(fontSizeSelector);
  const { steps } = useSelector(websocketSelector);

  const WSStepProcess = () => {
    if (steps.length && isLastMessage) {
      return (
        <StyledWSProcessStep color={chatConfig.color}>
          <em>
            {steps[steps.length - 1]}
            {'...'}
          </em>
        </StyledWSProcessStep>
      );
    }
    return <></>;
  };

  const renderBotReply = () => {
    if (reply.text) {
      if (Array.isArray(reply.text)) {
        return reply.text.map((replyText, idx) => {
          // determines which chat bubble should show typing component below
          // showTyping if:
          // - chatConfig is true
          // - not the lastReplyItem (value from reducer)
          // - reply.text.length or show only below the last bubble
          const lastChatBubble = idx === reply.text.length - 1;
          // like or dislike is only visible to last chat bubble
          const theFeedBackIcon = reply?.isLastReplyItem && lastChatBubble ? feedback : undefined;
          const shouldShowTyping = chatConfig.typing && !reply.isLastReplyItem && lastChatBubble;
          // add typing component if reply doesnt contain alphanumeric
          // or only contains special chars
          if (!replyText.replace(ALPHANUMBERIC_REGEX, '').length) {
            if (steps.length) {
              return (
                <StyledFlexColumnLeft key={`chat-bubble-${idx}-ws-step-${steps}`}>
                  <WSStepProcess />
                  <Typing />
                </StyledFlexColumnLeft>
              );
            }
            return <Typing key={idx} />;
          } else if (shouldShowTyping) {
            if (steps.length) {
              return (
                <StyledFlexColumnLeft key={`chat-bubble-${timeReply}-${idx}`}>
                  <WSStepProcess />
                  <ChatBubble content={replyText} feedback={theFeedBackIcon} />
                  <Typing />
                </StyledFlexColumnLeft>
              );
            }
            return (
              <StyledFlexColumnLeft key={`chat-bubble-${timeReply}-${idx}`}>
                <ChatBubble content={replyText} feedback={theFeedBackIcon} />
                <Typing />
              </StyledFlexColumnLeft>
            );
          }
          return <ChatBubble key={`chat-bubble-${timeReply}-${idx}`} content={replyText} feedback={theFeedBackIcon} />;
        });
      } else if (!reply.text.replace(ALPHANUMBERIC_REGEX, '').length) {
        return <Typing />;
      }
      return (
        <StyledFlexColumnLeft>
          <WSStepProcess />
          <ChatBubble key={`chat-bubble-${timeReply}`} content={reply.text} feedback={feedback} />
        </StyledFlexColumnLeft>
      );
    }
    return (
      <StyledFlexRowLeft>
        <WSStepProcess />
        <ChatBubble key={`chat-bubble-${timeReply}`} content={reply} feedback={feedback} />
      </StyledFlexRowLeft>
    );
  };

  const renderErrorReply = () => {
    return <ChatBubble key={`chat-bubble-${timeReply}`} content={reply.text} />;
  };

  const renderAgentHandover = () => {
    if (message.forms) {
      return (
        <>
          <ChatBubble key={`chat-bubble-${timeReply}`} content={reply.show_html || reply.text} />
          <ChatBubble
            key={`chat-bubble-${timeReply}-form`}
            isForm
            content={<AgentHandoverForm message={message} timeReply={timeReply} />}
          />
        </>
      );
    }
    return renderBotReply();
  };

  const renderReply = () => {
    switch (type) {
      case 'text':
        return renderBotReply();
      case 'error':
        return renderErrorReply();
      case 'agent-handover':
        return renderAgentHandover();
      default:
        return renderBotReply();
    }
  };

  return (
    <StyledMessage $fontsize={fontSize}>
      <StyledBotReply color={replyBubbleGradient} widgetthemecolor={widgetThemeColor}>
        <StyledFlexRowLeft>
          {type === 'error' ? (
            <WarningFilled style={{ color: cssVariables.warning }} />
          ) : showIconOnReply ? (
            <StyledChatReplyAvatar isLogo color={widgetThemeColor} />
          ) : null}
          <StyledFlexColumnLeft>{renderReply()}</StyledFlexColumnLeft>
        </StyledFlexRowLeft>
        {reply?.isLastReplyItem ? (
          <StyledReplyFooter>
            <em>
              <TimeStamp time={timeReply} />
            </em>
          </StyledReplyFooter>
        ) : null}
      </StyledBotReply>
    </StyledMessage>
  );
};

Reply.propTypes = {
  message: PropTypes.shape({
    reply: PropTypes.object,
    timeReply: PropTypes.any,
    type: PropTypes.string,
    feedback: PropTypes.number,
    forms: PropTypes.array,
    isLastMessage: PropTypes.bool,
  }),
};

export default Reply;
