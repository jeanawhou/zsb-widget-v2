import { createSelector } from 'reselect';

import { DEFAULT_FONT_SIZE, DEFAULT_HEIGHT, HEADER_LOGO_POSITIONS } from 'src/constants/chat';
import { convertRGBA, isHexColor } from 'src/utils/colors';
import { websocketSelector } from '.';
import { ICON_OPTIONS, PLACEHOLDER } from 'src/constants';
import { isEmpty } from 'lodash';
import { zsbIcon } from 'src/svg/Icons';
import { getChatWidgetAvatar, shouldShowChatWidgetAvatar } from '../utils';

export const uiSelector = (state) => state.ui;

export const isWidgetExpandedSelector = createSelector(uiSelector, (ui) => ui.isWidgetExpanded);

export const widgetConfigSelector = createSelector(uiSelector, (ui) => ui.widgetConfig);

export const widgetTypeSelector = createSelector(uiSelector, (ui) => ui.widgetType);
export const isChatWidgetSelector = createSelector(widgetTypeSelector, (widgetType) => widgetType === 'chat');
export const isSearchWidgetSelector = createSelector(widgetTypeSelector, (widgetType) => widgetType === 'search');

export const searchConfigSelector = createSelector(
  widgetConfigSelector,
  isSearchWidgetSelector,
  (widgetConfig, isSearchWidget) => (isSearchWidget ? widgetConfig.search : {}),
);

export const chatConfigSelector = createSelector(
  widgetConfigSelector,
  isChatWidgetSelector,
  (widgetConfig, isChatWidget) => {
    return isChatWidget ? widgetConfig.chat : {};
  },
);

export const widgetTitleSelector = createSelector(chatConfigSelector, (chatConfig) => {
  return chatConfig.title || chatConfig.identifier || chatConfig.botTitle;
});

export const widgetPropsSelector = createSelector(
  isSearchWidgetSelector,
  chatConfigSelector,
  searchConfigSelector,
  (isSearchWidget, chatConfig, searchConfig) => {
    return isSearchWidget ? searchConfig : chatConfig;
  },
);

export const widgetThemeColorSelector = createSelector(widgetConfigSelector, (widget) => widget.color);

export const avatarPositionSelector = createSelector(widgetPropsSelector, (config) => {
  return config.avatarPosition ? (config.avatarPosition === 'header' ? 'header' : 'chat') : null;
});

export const clientBubbleColorSelector = createSelector(
  widgetPropsSelector,
  widgetThemeColorSelector,
  // fallback is the widgetThemeColor
  (config, widgetThemeColor) => config?.clientBubbleColor || widgetThemeColor,
);
export const replyBubbleColorSelector = createSelector(
  widgetPropsSelector,
  clientBubbleColorSelector,
  widgetThemeColorSelector,
  (config, clientBubbleColor, widgetThemeColor) =>
    // convert only to rgba if replyBubbleGradient AND clientBubbleColor
    // is not null AND clientBubbleColor isHex
    config?.replyBubbleGradient && clientBubbleColor && isHexColor(clientBubbleColor)
      ? `rgba(${convertRGBA(clientBubbleColor)}, ${config?.replyBubbleGradient})`
      : // else use current theme color
        widgetThemeColor,
);
export const widgetHeightSelector = createSelector(widgetPropsSelector, ({ height }) => {
  if (typeof height === 'string' && height?.endsWith('px')) {
    return height;
  }
  return height ? `${height}px` : DEFAULT_HEIGHT;
});

const avatarSelector = createSelector(widgetPropsSelector, (config) => {
  return !isEmpty(config.avatar)
    ? (typeof config.avatar === 'string' &&
        config.avatar.toLowerCase() !== 'none' &&
        config.avatar.toLowerCase() !== 'custom') ||
      (typeof config.avatar === 'object' && !isEmpty(config.avatar))
      ? config.avatar
      : null
    : null;
});

export const launcherAvatarSelector = createSelector(widgetPropsSelector, avatarSelector, (config, oldAvatarProp) => {
  return config.launcherAvatar
    ? typeof config.launcherAvatar === 'string' && config.launcherAvatar.toLowerCase() === 'none'
      ? zsbIcon(config.color)
      : config.launcherAvatar
    : oldAvatarProp;
});

export const launcherAvatarTypeSelector = createSelector(widgetPropsSelector, (config) => {
  return config.launcherAvatarType;
});

export const isLauncherAnIconSelector = createSelector(
  launcherAvatarSelector,
  launcherAvatarTypeSelector,
  (launcherAvatar, launcherAvatarType) => {
    return launcherAvatarType === 'icon' || ICON_OPTIONS.includes(launcherAvatar);
  },
);

export const headerAvatarTypeSelector = createSelector(
  widgetPropsSelector,
  avatarPositionSelector,
  (config, oldAvatarPositionProp) => {
    return !config.headerAvatarType || oldAvatarPositionProp?.toLowerCase() === 'chat'
      ? 'none'
      : config.headerAvatarType ?? 'none';
  },
);

export const responseAvatarTypeSelector = createSelector(
  widgetPropsSelector,
  avatarPositionSelector,
  (config, oldAvatarPositionProp) => {
    return !config.responseAvatarType || oldAvatarPositionProp?.toLowerCase() === 'header'
      ? 'none'
      : config.responseAvatarType;
  },
);

export const headerAvatarSelector = createSelector(
  widgetPropsSelector,
  headerAvatarTypeSelector,
  launcherAvatarSelector,
  isLauncherAnIconSelector,
  (config, headerAvatarType, launcherAvatar, isLauncherAnIcon) => {
    const headerAvatar = config.headerAvatar || '';
    return getChatWidgetAvatar(headerAvatar, headerAvatarType, launcherAvatar, isLauncherAnIcon);
  },
);

export const responseAvatarSelector = createSelector(
  widgetPropsSelector,
  responseAvatarTypeSelector,
  launcherAvatarSelector,
  isLauncherAnIconSelector,
  (config, responseAvatarType, launcherAvatar, isLauncherAnIcon) => {
    const responseAvatar = config.responseAvatar || '';
    return getChatWidgetAvatar(responseAvatar, responseAvatarType, launcherAvatar, isLauncherAnIcon);
  },
);

export const fontSizeSelector = createSelector(widgetPropsSelector, (config) =>
  config?.fontSize ? (config.fontSize.includes('px') ? config.fontSize : `${config.fontSize}`) : DEFAULT_FONT_SIZE,
);

export const showIconOnChatHeaderSelector = createSelector(
  headerAvatarSelector,
  headerAvatarTypeSelector,
  avatarPositionSelector,
  (avatar, type) => {
    return shouldShowChatWidgetAvatar(avatar, type);
  },
);

export const headerImgPositionSelector = createSelector(
  showIconOnChatHeaderSelector,
  widgetPropsSelector,
  avatarPositionSelector,
  (showChatHeaderIcon, config) => {
    if (showChatHeaderIcon) {
      if (config.headerLogoPosition && HEADER_LOGO_POSITIONS.includes(config.headerLogoPosition)) {
        return config.headerLogoPosition;
      }
      return 'center';
    }
    return null;
  },
);

export const showIconOnReplySelector = createSelector(
  responseAvatarSelector,
  responseAvatarTypeSelector,
  (avatar, type) => shouldShowChatWidgetAvatar(avatar, type),
);

export const isCircleLauncherSelector = createSelector(widgetPropsSelector, (chat) => {
  return !chat.shape || chat.shape?.toLowerCase() === 'circle';
});

export const handOffLabelSelector = createSelector(widgetPropsSelector, (chat) => chat.handoffLabel);
export const shouldSendCallbackEmailSelector = createSelector(widgetPropsSelector, (chat) => chat.callbackEmail);

export const newMessageCountSelector = createSelector(uiSelector, (ui) => ui.newMessageCount);
export const userStyleSelector = createSelector(uiSelector, (ui) => ui.userStyle);

export const typingExperienceEnabledSelector = createSelector(
  widgetPropsSelector,
  (chat) => chat.typingExperience || false,
);
export const isTypingSelector = createSelector(
  widgetPropsSelector,
  typingExperienceEnabledSelector,
  websocketSelector,
  (config, typingExperienceEnabled, websocket) => {
    const isTyping = typingExperienceEnabled && config.typing;
    // hasn't got the answer yet
    // hence, we're showing typing/loading indicator
    if (websocket?.steps?.length && config.typing) {
      return true;
    }
    return isTyping || false;
  },
);

export const isFullHeightSelector = createSelector(
  widgetConfigSelector,
  isWidgetExpandedSelector,
  (widget, isExpanded) => (isExpanded && (widget.isFullHeight || widget.isFullscreen)) || false,
);

export const isFullscreenSelector = createSelector(
  widgetConfigSelector,
  isWidgetExpandedSelector,
  (widget, isExpanded) => (isExpanded && widget.isFullscreen) || false,
);

export const isWidthHalfFullscreenSelector = createSelector(
  widgetConfigSelector,
  isWidgetExpandedSelector,
  (widget, isExpanded) => (isExpanded && widget.isWidthHalfFullscreen) || false,
);

export const placeholderSelector = createSelector(widgetConfigSelector, widgetTypeSelector, (widgetConfig, type) => {
  if (widgetConfig.placeholder) {
    return widgetConfig?.placeholder;
  } else {
    if (type === 'search') {
      return PLACEHOLDER.search;
    }
    return PLACEHOLDER.chat;
  }
});

export const isSearchingSelector = createSelector(searchConfigSelector, (search) => Boolean(search?.loading));

export const hasSearchErrorSelector = createSelector(searchConfigSelector, (search) => Boolean(search.error));
