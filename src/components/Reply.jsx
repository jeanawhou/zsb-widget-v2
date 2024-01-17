import PropTypes from 'prop-types';
import { UserOutlined, WarningFilled } from '@ant-design/icons';
import { isPlainObject, trim } from 'lodash';

import useSelector from 'src/store/useSelector';
import { chatConfigSelector, widgetThemeColorSelector } from 'src/store/selectors/ui';
import { cssVariables } from 'src/styles/variables';

import {
  StyledBotReply,
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
  const chatConfig = useSelector(chatConfigSelector);
  const { steps } = useSelector(websocketSelector);

  const WSStepProcess = () => {
    if (steps.length && isLastMessage) {
      return (
        <StyledWSProcessStep>
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
          const shouldShowTyping = chatConfig.typing && !reply.isLastReplyItem && idx === reply.text.length - 1;
          // add typing component if reply doesnt contain alphanumeric
          // or only contains special chars
          if (!replyText.replace(ALPHANUMBERIC_REGEX, '').length) {
            if (steps.length) {
              return (
                <StyledFlexColumnLeft key={`ws-step-${idx}`}>
                  <WSStepProcess key={idx} />
                  <Typing key={idx} />
                </StyledFlexColumnLeft>
              );
            }
            return <Typing key={idx} />;
          } else if (shouldShowTyping) {
            if (steps.length) {
              return (
                <StyledFlexColumnLeft key={`chat-bubble-${timeReply}-${idx}`}>
                  <WSStepProcess />
                  <ChatBubble
                    content={replyText}
                    feedback={reply?.isLastReplyItem && idx === reply.text?.length - 1 ? feedback : undefined}
                  />
                  <Typing />
                </StyledFlexColumnLeft>
              );
            }
            return (
              <StyledFlexColumnLeft key={`chat-bubble-${timeReply}-${idx}`}>
                <ChatBubble
                  content={replyText}
                  feedback={reply?.isLastReplyItem && idx === reply.text?.length - 1 ? feedback : undefined}
                />
                <Typing />
              </StyledFlexColumnLeft>
            );
          }
          return <ChatBubble key={`chat-bubble-${timeReply}-${idx}`} content={replyText} feedback={feedback} />;
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
        return renderAgentHandover();
    }
  };

  return (
    <StyledMessage>
      <StyledBotReply color={widgetThemeColor}>
        <StyledFlexRowLeft>
          {type === 'error' ? <WarningFilled style={{ color: cssVariables.warning }} /> : <UserOutlined />}
          <StyledFlexColumnLeft>{renderReply()}</StyledFlexColumnLeft>
        </StyledFlexRowLeft>
        <StyledReplyFooter>
          <em>
            <TimeStamp time={timeReply} />
          </em>
        </StyledReplyFooter>
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
