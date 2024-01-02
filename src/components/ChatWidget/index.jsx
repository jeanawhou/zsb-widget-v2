import { useCallback, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import {
  StyledChatWrapper,
  StyledFlexColumn,
  StyledLauncherWrapper,
  StyledMessageBadge,
  StyledMessagesWrapper,
  StyledWidgetLabel,
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
import { FALLBACK_WIDGET_LABEL } from 'src/constants/chat';

const ChatWidget = (props) => {
  const {
    isExpanded,
    toggleChat,
    messagesRef,
    hideLauncher,
    widgetRef,
    chatStyles,
    quickReplies,
    shouldShowQuickReply,
    newMessageCount,
    handleScroll,
    messages,
  } = useChatWidget(props);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (messagesRef.current) {
        messagesRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const renderQuickReply = useCallback(() => {
    return shouldShowQuickReply ? <QuickReplies quickReplies={quickReplies} /> : <></>;
  }, [quickReplies, shouldShowQuickReply]);

  return (
    <StyledWidgetWrapper
      hideLauncher={hideLauncher}
      ref={widgetRef}
      {...chatStyles}
      minimized={!isExpanded ? 'true' : 'false'}
      style={props.style}
    >
      {(!isExpanded || !hideLauncher) && chatStyles.position?.includes('top') ? (
        <StyledLauncherWrapper onClick={toggleChat} position={chatStyles.position}>
          {isExpanded ? (
            <CloseOutlined onClick={toggleChat} size={30} className="chat-launcher" />
          ) : (
            <WidgetIcon onClick={toggleChat} />
          )}
          {newMessageCount ? <StyledMessageBadge>{newMessageCount}</StyledMessageBadge> : null}
        </StyledLauncherWrapper>
      ) : null}
      {isExpanded ? <ChatHeader hideLauncher={hideLauncher} toggleChat={toggleChat} showLogoOnChat /> : null}
      {isExpanded ? (
        <StyledChatWrapper
          hideLauncher={hideLauncher}
          height={chatStyles.height}
          minimized={!isExpanded ? 'true' : 'false'}
        >
          <StyledMessagesWrapper ref={messagesRef}>
            {messages.map((message, index) => {
              return (
                <div key={`message-${index}`}>
                  {message.text ? <UserMessage message={message} /> : null}
                  {message.reply ? <Reply message={message} key={`reply-message-${index}`} /> : <Typing />}
                </div>
              );
            })}
          </StyledMessagesWrapper>
          <StyledFlexColumn>
            {renderQuickReply()}
            <MessageInput />
          </StyledFlexColumn>
        </StyledChatWrapper>
      ) : null}
      {(!isExpanded || !hideLauncher) && chatStyles.position?.includes('bottom') ? (
        <StyledLauncherWrapper onClick={toggleChat} position={chatStyles.position}>
          {chatStyles.shape?.includes('circle') ? (
            isExpanded ? (
              <CloseOutlined size={30} className="chat-launcher" />
            ) : (
              <WidgetIcon />
            )
          ) : (
            // if shape not circle
            // render the label or fallback
            <StyledWidgetLabel color={chatStyles.color}>{chatStyles.label || FALLBACK_WIDGET_LABEL}</StyledWidgetLabel>
          )}
          {newMessageCount ? <StyledMessageBadge>{newMessageCount}</StyledMessageBadge> : null}
        </StyledLauncherWrapper>
      ) : null}
    </StyledWidgetWrapper>
  );
};

export default ChatWidget;
