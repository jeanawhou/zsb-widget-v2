import PropTypes from 'prop-types';
import { UserOutlined, WarningFilled } from '@ant-design/icons';
import { isPlainObject } from 'lodash';

import useSelector from 'src/store/useSelector';
import { chatConfigSelector, widgetThemeColorSelector } from 'src/store/selectors/ui';
import { cssVariables } from 'src/styles/variables';

import {
  StyledBotReply,
  StyledFlexColumnLeft,
  StyledFlexRowLeft,
  StyledMessage,
  StyledReplyFooter,
} from './StyledComponents';
import TimeStamp from './TimeStamp';
import ChatBubble from './ChatBubble';
import AgentHandoverForm from './AgentHandoverForm';
import Typing from './Typing';

const Reply = ({ message }) => {
  const { timeReply, reply, type, feedback } = message;
  const widgetThemeColor = useSelector(widgetThemeColorSelector);
  const chatConfig = useSelector(chatConfigSelector);

  const renderBotReply = () => {
    if (typeof reply === 'string') {
      return <ChatBubble key={`chat-bubble-${timeReply}`} content={reply} feedback={feedback} />;
    } else if (isPlainObject(reply)) {
      if (reply?.text && Array.isArray(reply.text)) {
        return reply.text.map((replyText, idx) => {
          // determines which chat bubble should show typing component below
          const shouldShowTyping = chatConfig.typing && !reply.isLastReplyItem && idx === reply.text?.length - 1;
          if (shouldShowTyping) {
            return (
              <StyledFlexColumnLeft key={`chat-bubble-${timeReply}-${idx}`}>
                <ChatBubble content={replyText} feedback={reply?.isLastReplyItem ? feedback : undefined} />
                <Typing />
              </StyledFlexColumnLeft>
            );
          }
          return <ChatBubble key={`chat-bubble-${timeReply}-${idx}`} content={replyText} feedback={feedback} />;
        });
      }
      return <ChatBubble key={`chat-bubble-${timeReply}`} content={reply?.text} feedback={feedback} />;
    }
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
  }),
};

export default Reply;
