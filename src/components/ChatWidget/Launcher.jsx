import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { StyledLauncherWrapper, StyledMessageBadge, StyledWidgetLabel } from './StyledComponents';
import Avatar from '../Avatar';
import useSelector from 'src/store/useSelector';
import {
  chatStylesSelector,
  isCircleLauncherSelector,
  isWidgetExpandedSelector,
  launcherIconSelector,
  newMessageCountSelector,
} from 'src/store/selectors/ui';
import { FALLBACK_WIDGET_LABEL } from 'src/constants/chat';

const Launcher = (props) => {
  const { toggleChat } = props;
  const chatStyles = useSelector(chatStylesSelector);
  const newMessageCount = useSelector(newMessageCountSelector);
  const isExpanded = useSelector(isWidgetExpandedSelector);
  const isCircleLauncher = useSelector(isCircleLauncherSelector);
  const launcherIcon = useSelector(launcherIconSelector);
  const disableClose = chatStyles.disableClose && isExpanded;
  // TODO: needs more accurate computation
  const adjustment =
    2 * chatStyles.label?.length +
    (chatStyles.label?.length > 30
      ? chatStyles.label?.length - 2
      : chatStyles.label?.length <= 10
        ? chatStyles.label?.length - 20
        : chatStyles.label?.length <= 20
          ? chatStyles.label?.length - 14
          : chatStyles.label?.length <= 30
            ? chatStyles.label?.length
            : -1);

  const noOperation = () => {};

  return (
    <StyledLauncherWrapper
      onClick={() => (disableClose ? noOperation() : toggleChat())}
      position={chatStyles.position}
      disableclose={disableClose ? 'true' : 'false'}
      minimized={isExpanded ? 'false' : 'true'}
      adjustment={adjustment}
    >
      {isCircleLauncher ? (
        isExpanded ? (
          <CloseOutlined size={30} className={`chat-launcher ${disableClose ? 'disableclose' : ''}`} />
        ) : (
          <Avatar source={launcherIcon} />
        )
      ) : (
        // if shape not circle
        // render the label or fallback
        <StyledWidgetLabel color={chatStyles.color}>{chatStyles.label || FALLBACK_WIDGET_LABEL}</StyledWidgetLabel>
      )}
      {newMessageCount ? <StyledMessageBadge>{newMessageCount}</StyledMessageBadge> : null}
    </StyledLauncherWrapper>
  );
};

Launcher.propTypes = {
  toggleChat: PropTypes.func,
};

export default Launcher;
