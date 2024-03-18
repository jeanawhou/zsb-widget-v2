import React from 'react';
import PropTypes from 'prop-types';

import { StyledChatWrapper, StyledFlexColumn, StyledWidgetWrapper } from './StyledComponents';
import useChatWidget from './hooks';
import MessageInput from '../MessageInput';
import ChatHeader from './ChatHeader';
import QuickReplies from './QuickReplies';
import Launcher from './Launcher';
import MessageWrapper from './messages/MessageWrapper';
import Watermark from '../Watermark';

const ChatWidget = (props) => {
  const {
    height,
    isExpanded,
    toggleChat,
    fullHeight,
    isFullscreen,
    widgetRef,
    chatStyles,
    quickReplies,
    isMobile,
    isWidthHalfFullscreen,
    themeColor,
  } = useChatWidget(props);
  const { position, shape, textColor, showIconOnChatHeader, showCloseButton } = chatStyles;

  return (
    <StyledWidgetWrapper
      fullheight={fullHeight && isExpanded ? 'true' : 'false'}
      fullscreen={isFullscreen && isExpanded ? 'true' : 'false'}
      position={position}
      color={themeColor}
      shape={shape}
      height={height}
      id="zsb-widget-wrapper"
      ref={widgetRef}
      minimized={!isExpanded ? 'true' : 'false'}
      mobile={isMobile ? 'true' : 'false'}
      style={props.style}
      halfscreen={isWidthHalfFullscreen ? 'true' : 'false'}
      mid={chatStyles.position?.includes('mid') ? 'true' : 'false'}
    >
      <StyledFlexColumn>
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
              <Watermark />
            </StyledFlexColumn>
          </StyledChatWrapper>
        ) : null}
      </StyledFlexColumn>
      {(isFullscreen || fullHeight || isWidthHalfFullscreen || !showCloseButton) && isExpanded ? null : (
        <Launcher toggleChat={toggleChat} />
      )}
    </StyledWidgetWrapper>
  );
};

ChatWidget.propTypes = {
  style: PropTypes.object,
};

export default ChatWidget;
