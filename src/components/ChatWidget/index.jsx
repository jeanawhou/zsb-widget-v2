import PropTypes from 'prop-types';

import { StyledChatWrapper, StyledFlexColumn, StyledWidgetWrapper } from '../StyledComponents';
import useChatWidget from './hooks';
import MessageInput from '../MessageInput';
import ChatHeader from './ChatHeader';
import QuickReplies from '../QuickReplies';
import Launcher from './Launcher';
import MessageWrapper from './messages/MessageWrapper';

const ChatWidget = (props) => {
  const {
    isExpanded,
    toggleChat,
    fullHeight,
    isFullscreen,
    widgetRef,
    chatStyles,
    quickReplies,
    isMobile,
    isWidthHalfFullscreen,
  } = useChatWidget(props);
  const { position, color, shape, textColor, height, showIconOnChatHeader } = chatStyles;

  return (
    <StyledWidgetWrapper
      fullheight={fullHeight && isExpanded ? 'true' : 'false'}
      fullscreen={isFullscreen && isExpanded ? 'true' : 'false'}
      position={position}
      color={color}
      shape={shape}
      height={height}
      ref={widgetRef}
      minimized={!isExpanded ? 'true' : 'false'}
      mobile={isMobile ? 'true' : 'false'}
      style={props.style}
      halfscreen={isWidthHalfFullscreen ? 'true' : 'false'}
      mid={chatStyles.position?.includes('mid') ? 'true' : 'false'}
    >
      <div>
        {isExpanded && (
          <ChatHeader
            isMobile={isMobile}
            fullHeight={fullHeight}
            toggleChat={toggleChat}
            showIconOnChatHeader={showIconOnChatHeader}
          />
        )}
        {isExpanded ? (
          <StyledChatWrapper
            mobile={isMobile ? 'true' : 'false'}
            fullheight={fullHeight && isExpanded ? 'true' : 'false'}
            fullscreen={isFullscreen && isExpanded ? 'true' : 'false'}
            height={height}
            minimized={!isExpanded ? 'true' : 'false'}
            textcolor={textColor}
            halfscreen={isWidthHalfFullscreen ? 'true' : 'false'}
          >
            <MessageWrapper fullHeight={fullHeight} />
            <StyledFlexColumn>
              <QuickReplies quickReplies={quickReplies} />
              <MessageInput />
            </StyledFlexColumn>
          </StyledChatWrapper>
        ) : null}
      </div>
      <Launcher toggleChat={toggleChat} />
    </StyledWidgetWrapper>
  );
};

ChatWidget.propTypes = {
  style: PropTypes.object,
};

export default ChatWidget;
