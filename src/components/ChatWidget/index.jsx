import { useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import { StyledChatWrapper, StyledMessagesWrapper, StyledWidgetWrapper } from '../StyledComponents';
import useChatWidget from './hooks';
import UserMessage from '../UserMessage';
import Reply from '../Reply';
import Typing from '../Typing';
import MessageInput from '../MessageInput';
import ChatHeader from './ChatHeader';
import QuickReplies from '../QuickReplies';
import WidgetIcon from '../WidgetIcon';
import useSelector from 'src/store/useSelector';
import {
  shouldShowQuickRepliesSelector,
  lastMessageQuickReplySelector,
  messagesSelector,
} from 'src/store/selectors/messages';

const ChatWidget = (props) => {
  const { isExpanded, toggleChat, widgetRef, isViewportBelow50 } = useChatWidget(props);
  const messages = useSelector(messagesSelector);
  const quickReplies = useSelector(lastMessageQuickReplySelector);
  const shouldShowQuickReply = useSelector(shouldShowQuickRepliesSelector);

  const renderQuickReply = useCallback(() => {
    return shouldShowQuickReply ? <QuickReplies quickReplies={quickReplies} /> : <></>;
  }, [quickReplies, shouldShowQuickReply]);

  return (
    <StyledWidgetWrapper minimized={!isExpanded ? 'true' : 'false'} style={props.style}>
      {isExpanded ? <ChatHeader toggleChat={toggleChat} showLogoOnChat={true} /> : null}
      {isExpanded && (
        <StyledChatWrapper minimized={!isExpanded ? 'true' : 'false'}>
          <StyledMessagesWrapper ref={widgetRef}>
            {messages.map((message, index) => {
              return (
                <div key={`message-${index}`}>
                  {message.text ? <UserMessage message={message} /> : null}
                  {message.reply ? <Reply message={message} key={`reply-message-${index}`} /> : <Typing />}
                </div>
              );
            })}
          </StyledMessagesWrapper>
          {renderQuickReply()}
          <MessageInput />
        </StyledChatWrapper>
      )}
      {isViewportBelow50 && isExpanded ? null : isExpanded ? (
        <CloseOutlined onClick={toggleChat} size={30} className="chat-launcher" />
      ) : (
        <WidgetIcon onClick={toggleChat} />
      )}
    </StyledWidgetWrapper>
  );
};

export default ChatWidget;
