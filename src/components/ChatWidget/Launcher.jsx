import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { StyledLauncherWrapper, StyledMessageBadge, StyledWidgetLabel } from './StyledComponents';
import Avatar from '../Avatar';
import useSelector from 'src/store/useSelector';
import {
  chatConfigSelector,
  isCircleLauncherSelector,
  isWidgetExpandedSelector,
  launcherAvatarSelector,
  newMessageCountSelector,
  widgetThemeColorSelector,
} from 'src/store/selectors/ui';
import { FALLBACK_WIDGET_LABEL } from 'src/constants/chat';

const Launcher = (props) => {
  const { toggleChat } = props;
  const chatStyles = useSelector(chatConfigSelector);
  const newMessageCount = useSelector(newMessageCountSelector);
  const isExpanded = useSelector(isWidgetExpandedSelector);
  const isCircleLauncher = useSelector(isCircleLauncherSelector);
  const launcherAvatar = useSelector(launcherAvatarSelector);
  const themeColor = useSelector(widgetThemeColorSelector);

  const disableClose = chatStyles.disableClose && isExpanded;
  // TODO: needs more accurate computation
  const adjustment =
    2 * Number(chatStyles.label?.length) ||
    1 +
      (chatStyles.label?.length > 30
        ? chatStyles.label?.length - 2
        : chatStyles.label?.length <= 10
          ? chatStyles.label?.length - 20
          : chatStyles.label?.length <= 20
            ? chatStyles.label?.length - 14
            : chatStyles.label?.length <= 30
              ? chatStyles.label?.length
              : -1) ||
    0;

  const noOperation = () => {};

  return (
    <StyledLauncherWrapper
      onClick={() => (disableClose ? noOperation() : toggleChat())}
      position={chatStyles.position}
      disableclose={disableClose ? 'true' : 'false'}
      minimized={isExpanded ? 'false' : 'true'}
      adjustment={String(adjustment)}
    >
      {isCircleLauncher ? (
        isExpanded ? (
          <CloseOutlined size={30} className={`chat-launcher ${disableClose ? 'disableclose' : ''}`} />
        ) : (
          <Avatar source={launcherAvatar} />
        )
      ) : (
        // if shape not circle
        // render the label or fallback
        <StyledWidgetLabel color={themeColor}>{chatStyles.label || FALLBACK_WIDGET_LABEL}</StyledWidgetLabel>
      )}
      {newMessageCount ? <StyledMessageBadge>{newMessageCount}</StyledMessageBadge> : null}
    </StyledLauncherWrapper>
  );
};

Launcher.propTypes = {
  toggleChat: PropTypes.func,
};

export default Launcher;
