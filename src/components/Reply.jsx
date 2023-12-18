import PropTypes from 'prop-types';
import { UserOutlined, WarningFilled } from '@ant-design/icons';
import { isPlainObject } from 'lodash';

import useSelector from 'src/store/useSelector';
import { ZSB_CHAT_BREAKER_ENCONDING } from 'src/store/constants/chat';
import { widgetThemeColorSelector } from 'src/store/selectors/ui';
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
import Typing from './Typing';
import AgentHandoverForm from './AgentHandoverForm';

const Reply = ({ message }) => {
  const { timeReply, reply, type, feedback } = message;
  const widgetThemeColor = useSelector(widgetThemeColorSelector);

  const renderLoader = () => <Typing />;

  const renderSplittedBubble = (value) => {
    if (hasZSBChatBreakerEncoding(value)) {
      const splitted = value?.split(ZSB_CHAT_BREAKER_ENCONDING);
      return splitted.map((answer, idx) => {
        const isLastMessage = idx === splitted.length - 1;
        return (
          <ChatBubble
            bubbleIndex={idx}
            key={`chat-bubble-${timeReply + '-' + idx}`}
            content={answer}
            feedback={isLastMessage ? feedback : undefined}
          />
        );
      });
    }
  };

  const hasZSBChatBreakerEncoding = (value) => {
    if (value && typeof value === 'string') {
      return value.includes(ZSB_CHAT_BREAKER_ENCONDING);
    }
    return false;
  };

  const renderShowHTML = () => {
    if (Array.isArray(reply.show_html)) {
      return reply.show_html.map((html, idx) => {
        const isLastMessage = idx === reply?.show_html?.length - 1;
        if (hasZSBChatBreakerEncoding(html)) {
          return renderSplittedBubble(html);
        }
        return (
          <ChatBubble
            bubbleIndex={idx}
            key={`chat-bubble-${timeReply + '-' + idx}`}
            content={html}
            feedback={isLastMessage ? feedback : undefined}
          />
        );
      });
    } else if (typeof reply.show_html === 'string') {
      if (hasZSBChatBreakerEncoding(reply.show_html)) {
        return renderSplittedBubble(reply.show_html);
      }
      return <ChatBubble key={`chat-bubble-${timeReply}`} content={reply.show_html} feedback={feedback} />;
    }
    // return show_text if no show_html
    else if (!reply.show_html && reply.show_text) {
      return renderShowText();
    }
    // render text if no html or show_Text
    else return renderTextOnly();
  };

  const renderShowText = () => {
    if (Array.isArray(reply.show_text)) {
      return reply.show_text.map((showText, idx) => {
        if (hasZSBChatBreakerEncoding(showText)) {
          return renderSplittedBubble(showText);
        }
        renderLoader();

        return (
          <ChatBubble
            bubbleIndex={idx}
            key={`chat-bubble-${timeReply + '-' + idx}`}
            content={showText}
            feedback={feedback}
          />
        );
      });
    } else if (typeof reply.show_text === 'string') {
      if (hasZSBChatBreakerEncoding(reply.show_text)) {
        return renderSplittedBubble(reply.show_text);
      }
      return <ChatBubble key={`chat-bubble-${timeReply}`} content={reply.show_text} feedback={feedback} />;
    }
  };

  const renderTextOnly = () => {
    if (typeof reply === 'string') {
      return <ChatBubble key={`chat-bubble-${timeReply}`} content={reply} feedback={feedback} />;
    } else if (isPlainObject(reply)) {
      return <ChatBubble key={`chat-bubble-${timeReply}`} content={reply.text} feedback={feedback} />;
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
    return renderShowHTML();
  };

  const renderReply = () => {
    switch (type) {
      case 'show_html':
        return renderShowHTML();
      case 'show_text':
        return renderShowText();
      case 'text':
        return renderTextOnly();
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
