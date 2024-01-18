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
import { chatConfigSelector, widgetThemeColorSelector, widgetTitleSelector } from 'src/store/selectors/ui';
import ChatHeaderMenu from './ChatHeaderMenu';

const ChatHeader = (props) => {
  const { toggleChat, showLogoOnChat, hideLauncher, ...rest } = props;
  const chatConfig = useSelector(chatConfigSelector);
  const widgetThemeColor = useSelector(widgetThemeColorSelector);
  const widgetTitle = useSelector(widgetTitleSelector);

  return (
    <StyledChatHeader hideLauncher={hideLauncher} color={widgetThemeColor} {...rest}>
      {showLogoOnChat ? <WidgetIcon isLogo /> : null}
      <StyledFlexColumnSpaceEvenly>
        <h3>{widgetTitle}</h3>
        <StyledSubtitle>{chatConfig.subtitle}</StyledSubtitle>
      </StyledFlexColumnSpaceEvenly>
      <StyledChatHeaderActionIcons>
        <CloseOutlined onClick={toggleChat} tabIndex={1} onKeyDown={(e) => (e.key === 'Enter' ? toggleChat() : {})} />
        <ChatHeaderMenu />
      </StyledChatHeaderActionIcons>
    </StyledChatHeader>
  );
};

ChatHeader.propTypes = {
  toggleChat: PropTypes.func.isRequired,
  showLogoOnChat: PropTypes.bool,
  hideLauncher: PropTypes.bool,
  launcherIcon: PropTypes.any,
};

export default ChatHeader;
