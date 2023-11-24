import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import {
  StyledChatWrapper,
  StyledMessagesWrapper,
  StyledWidgetWrapper,
} from '../StyledComponents';
import { cssVariables } from 'styles/variables';
import useChatWidget from './hooks';
import UserMessage from '../UserMessage';
import Reply from '../Reply';
import Typing from '../Typing';
import MessageInput from '../MessageInput';
import ChatHeader from './ChatHeader';
import QuickReplies from '../QuickReplies';
import WidgetIcon from '../WidgetIcon';

const ChatWidget = (props) => {
  const {
    placeholder,
    style,
    configProps,
    bot,
  } = props;
  const { isExpanded, messages, toggleChat, widgetRef, isViewportBelow50 } =
    useChatWidget({ bot });
  const { showLogoOnChat } = configProps;

  const renderChatLauncher = () => {
    if (isExpanded) {
      return (
        <CloseOutlined
          onClick={toggleChat}
          size={30}
          className="chat-launcher"
        />
      );
    } else {
      return <WidgetIcon onClick={toggleChat} />
    }
  };

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
      style={style}
    >
      {isExpanded ? <ChatHeader toggleChat={toggleChat} showLogoOnChat={showLogoOnChat} /> : null}
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
          <MessageInput placeholder={placeholder} />
        </StyledChatWrapper>
      )}
      {isViewportBelow50 && isExpanded ? null : renderChatLauncher()}
    </StyledWidgetWrapper>
  );
};

ChatWidget.defaultProps = {
  title: 'ZSB Chat',
  subtitle: '',
  placeholder: 'Type your message...',
  widgetColor: cssVariables.zsbCyan,
  configProps: {
    showLogoOnChat: true,
  },
  launcherIcon:
    'https://logosandtypes.com/wp-content/uploads/2022/07/openai.svg',
  showLogoOnChat: false,
  bot: ''
};

ChatWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  widgetColor: PropTypes.string,
  launcherIcon: PropTypes.any,
  style: PropTypes.any,
  showLogoOnChat: PropTypes.bool,
  configProps: PropTypes.object,
  handleSendMessage: PropTypes.func,
  handleAddReply: PropTypes.func,
  bot: PropTypes.string,
};

export default ChatWidget;
