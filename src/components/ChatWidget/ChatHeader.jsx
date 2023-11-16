import { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { StyledChatHeader, StyledChatHeaderActionIcons, StyledFlexColumnSpaceEvenly, StyledSubtitle } from '../StyledComponents';
import { CloseOutlined, EllipsisOutlined } from '@ant-design/icons';

const ChatHeader = props => {
  const { toggleChat, launcherIcon, showLogoOnChat, ...rest } = props
  const renderChatLogo = () => {
    const classNames = `chat-launcher isLogoOnly`;

    if (typeof launcherIcon === 'string') {
      return (
        <img
          src={launcherIcon}
          alt="chat launcher"
          className={classNames}
        />
      );
    } else {
      return cloneElement(launcherIcon, {
        className: classNames,
      });
    }
  }
  return (
    <StyledChatHeader {...rest}>
      {showLogoOnChat ? renderChatLogo() : null}
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