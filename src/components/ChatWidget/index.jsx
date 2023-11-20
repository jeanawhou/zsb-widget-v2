import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import {
  StyledChatWrapper,
  StyledMessagesWrapper,
  StyledWidgetWrapper,
} from '../StyledComponents';
import useChatWidget from './hooks';
import UserMessage from '../UserMessage';
import Reply from '../Reply';
import Typing from '../Typing';
import MessageInput from '../MessageInput';
import ChatHeader from './ChatHeader';
import QuickReplies from '../QuickReplies';
import WidgetIcon from '../WidgetIcon';

const ChatWidget = (props) => {
  const { isExpanded, messages, toggleChat, widgetRef, isViewportBelow50 } =
  useChatWidget(props);

  const quickReplies = [
    {
      label: 'hello',
      value: 'hello',
    },
    {
      label: 'hi',
      value: 'hi',
    },
  ];

  return (
    <StyledWidgetWrapper
      minimized={!isExpanded ? 'true' : 'false'}
      style={props.style}
    >
      {isExpanded ? <ChatHeader toggleChat={toggleChat} showLogoOnChat={true} /> : null}
      {isExpanded && (
        <StyledChatWrapper minimized={!isExpanded ? 'true' : 'false'}>
          <StyledMessagesWrapper ref={widgetRef}>
            {messages.map((message, index) => {
              return (
                <div key={`message-${index}`}>
                  {message.text ? <UserMessage message={message} /> : null}
                  {message.reply ? (
                    <Reply message={message} key={`reply-message-${index}`} />
                  ) : (
                    <Typing />
                  )}
                </div>
              );
            })}
          </StyledMessagesWrapper>
          <QuickReplies quickReplies={quickReplies} />
          <MessageInput />
        </StyledChatWrapper>
      )}
      {isViewportBelow50 && isExpanded ? null : isExpanded ? <CloseOutlined
          onClick={toggleChat}
          size={30}
          className="chat-launcher"
        /> : <WidgetIcon onClick={toggleChat} />}
    
    </StyledWidgetWrapper>
  );
};

export default ChatWidget;
