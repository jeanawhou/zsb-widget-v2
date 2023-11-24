import PropTypes from 'prop-types'
import { StyledChatHeader, StyledChatHeaderActionIcons, StyledFlexColumnSpaceEvenly, StyledSubtitle } from '../StyledComponents';
import { CloseOutlined, EllipsisOutlined } from '@ant-design/icons';
import WidgetIcon from '../WidgetIcon';

const ChatHeader = props => {
  const { toggleChat, showLogoOnChat, ...rest } = props

  return (
    <StyledChatHeader {...rest}>
      {showLogoOnChat ? <WidgetIcon isLogo /> : null}
      <StyledFlexColumnSpaceEvenly>
        <h3>ZSB Chat ZSB ChatZSB Chat ZSB</h3>
        <StyledSubtitle>Im a subtitle</StyledSubtitle>
      </StyledFlexColumnSpaceEvenly>
      <StyledChatHeaderActionIcons>
        <CloseOutlined
          onClick={toggleChat}
          tabIndex={1}
          onKeyDown={(e) => (e.key === 'Enter' ? toggleChat() : ({}))}
        />
        <EllipsisOutlined />
      </StyledChatHeaderActionIcons>
    </StyledChatHeader>
  );
}

ChatHeader.propTypes = {
  toggleChat: PropTypes.func.isRequired,
  showLogoOnChat: PropTypes.bool,
  launcherIcon: PropTypes.any,
};

export default ChatHeader