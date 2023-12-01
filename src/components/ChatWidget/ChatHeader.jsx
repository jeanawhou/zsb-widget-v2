import PropTypes from 'prop-types';
import {
  StyledChatHeader,
  StyledChatHeaderActionIcons,
  StyledFlexColumnSpaceEvenly,
  StyledSubtitle,
} from '../StyledComponents';
import { CloseOutlined, EllipsisOutlined } from '@ant-design/icons';
import WidgetIcon from '../WidgetIcon';
import useSelector from 'src/store/useSelector';
import { chatConfigSelector } from 'src/store/selectors/ui';

const ChatHeader = (props) => {
  const { toggleChat, showLogoOnChat, ...rest } = props;
  const chatConfig = useSelector(chatConfigSelector);

  return (
    <StyledChatHeader {...rest}>
      {showLogoOnChat ? <WidgetIcon isLogo /> : null}
      <StyledFlexColumnSpaceEvenly>
        <h3>{chatConfig.identifier || chatConfig.botTitle}</h3>
        <StyledSubtitle>{chatConfig.subtitle}</StyledSubtitle>
      </StyledFlexColumnSpaceEvenly>
      <StyledChatHeaderActionIcons>
        <CloseOutlined onClick={toggleChat} tabIndex={1} onKeyDown={(e) => (e.key === 'Enter' ? toggleChat() : {})} />
        <EllipsisOutlined />
      </StyledChatHeaderActionIcons>
    </StyledChatHeader>
  );
};

ChatHeader.propTypes = {
  toggleChat: PropTypes.func.isRequired,
  showLogoOnChat: PropTypes.bool,
  launcherIcon: PropTypes.any,
};

export default ChatHeader;
