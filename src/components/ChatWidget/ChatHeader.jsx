import React from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import {
  StyledChatHeader,
  StyledChatHeaderActionIcons,
  StyledChatHeaderAvatar,
  StyledFlexColumnLeft,
  StyledFlexColumnRight,
  StyledFlexColumnSpaceEvenly,
  StyledSubtitle,
} from './StyledComponents';
import useSelector from 'src/store/useSelector';
import {
  chatConfigSelector,
  headerImgPositionSelector,
  isFullscreenSelector,
  isWidthHalfFullscreenSelector,
  widgetThemeColorSelector,
  widgetTitleSelector,
} from 'src/store/selectors/ui';
import ChatHeaderMenu from './ChatHeaderMenu';

const ChatHeader = (props) => {
  const { toggleChat, fullHeight, textColor, width, isMobile } = props;
  const chatConfig = useSelector(chatConfigSelector);
  const widgetThemeColor = useSelector(widgetThemeColorSelector);
  const widgetTitle = useSelector(widgetTitleSelector);
  const isWidgetHalfScreen = useSelector(isWidthHalfFullscreenSelector);
  const headerImgPosition = useSelector(headerImgPositionSelector);
  const isFullscreen = useSelector(isFullscreenSelector);

  const renderHeaderTitleText = () => {
    switch (headerImgPosition) {
      case 'left':
        return (
          <>
            {headerImgPosition ? <StyledChatHeaderAvatar isLogo /> : null}
            <StyledFlexColumnLeft>
              <h3>{widgetTitle}</h3>
              <StyledSubtitle>{chatConfig.subtitle}</StyledSubtitle>
            </StyledFlexColumnLeft>
          </>
        );

      case 'right':
        return (
          <>
            <StyledFlexColumnRight>
              <h3>{widgetTitle}</h3>
              <StyledSubtitle>{chatConfig.subtitle}</StyledSubtitle>
            </StyledFlexColumnRight>
            {headerImgPosition ? <StyledChatHeaderAvatar isLogo /> : null}
          </>
        );

      case 'center':
        return (
          <>
            {headerImgPosition ? <StyledChatHeaderAvatar isLogo /> : null}
            <StyledFlexColumnSpaceEvenly>
              <h3>{widgetTitle}</h3>
              <StyledSubtitle>{chatConfig.subtitle}</StyledSubtitle>
            </StyledFlexColumnSpaceEvenly>
          </>
        );
      default:
        return (
          <StyledFlexColumnSpaceEvenly>
            <h3>{widgetTitle}</h3>
            <StyledSubtitle>{chatConfig.subtitle}</StyledSubtitle>
          </StyledFlexColumnSpaceEvenly>
        );
    }
  };

  return (
    <StyledChatHeader
      fullheight={fullHeight ? 'true' : 'false'}
      fullscreen={isFullscreen ? 'true' : 'false'}
      color={widgetThemeColor}
      textcolor={textColor}
      width={width}
      mobile={isMobile ? 'true' : 'false'}
      halfscreen={isWidgetHalfScreen ? 'true' : 'false'}
    >
      {renderHeaderTitleText()}
      <StyledChatHeaderActionIcons>
        {!chatConfig.showCloseButton && (
          <CloseOutlined onClick={toggleChat} tabIndex={1} onKeyDown={(e) => (e.key === 'Enter' ? toggleChat() : {})} />
        )}
        {chatConfig.hideWidgetMenu ? <div></div> : <ChatHeaderMenu />}
      </StyledChatHeaderActionIcons>
    </StyledChatHeader>
  );
};

ChatHeader.propTypes = {
  toggleChat: PropTypes.func.isRequired,
  showIconOnChatHeader: PropTypes.bool,
  fullHeight: PropTypes.bool,
  launcherAvatar: PropTypes.any,
  textColor: PropTypes.string,
  isMobile: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ChatHeader;
