import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import {
  StyledChatHeader,
  StyledChatHeaderActionIcons,
  StyledFlexColumnSpaceEvenly,
  StyledSubtitle,
} from '../StyledComponents';
import WidgetIcon from '../WidgetIcon';
import useSelector from 'src/store/useSelector';
import {
  chatConfigSelector,
  isFullscreenSelector,
  isWidthHalfFullscreenSelector,
  widgetThemeColorSelector,
  widgetTitleSelector,
} from 'src/store/selectors/ui';
import ChatHeaderMenu from './ChatHeaderMenu';

const ChatHeader = (props) => {
  const { toggleChat, showIconOnChatHeader, fullHeight, textColor, width, isMobile } = props;
  const chatConfig = useSelector(chatConfigSelector);
  const widgetThemeColor = useSelector(widgetThemeColorSelector);
  const widgetTitle = useSelector(widgetTitleSelector);
  const isWidgetHalfScreen = useSelector(isWidthHalfFullscreenSelector);
  const isFullscreen = useSelector(isFullscreenSelector);

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
      {showIconOnChatHeader ? <WidgetIcon isLogo /> : null}
      <StyledFlexColumnSpaceEvenly>
        <h3>{widgetTitle}</h3>
        <StyledSubtitle>{chatConfig.subtitle}</StyledSubtitle>
      </StyledFlexColumnSpaceEvenly>
      <StyledChatHeaderActionIcons>
        {chatConfig.showCloseButton ? null : (
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
  launcherIcon: PropTypes.any,
  textColor: PropTypes.string,
  isMobile: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ChatHeader;
