import { createSelector } from 'reselect';

import { DEFAULT_FONT_SIZE, HEADER_LOGO_POSITIONS } from 'src/constants/chat';
import { convertRGBA, isHexColor } from 'src/utils/colors';
import { websocketSelector } from '.';
import { zsbIcon } from 'src/svg/Icons';

export const uiSelector = (state) => state.ui;

export const isWidgetExpandedSelector = createSelector(uiSelector, (ui) => ui.isWidgetExpanded);

export const widgetConfigSelector = createSelector(uiSelector, (ui) => ui.widgetConfig);

export const chatConfigSelector = createSelector(widgetConfigSelector, (widgetConfig) => widgetConfig.chat);
export const widgetTypeSelector = createSelector(uiSelector, (ui) => ui.widgetType);
export const isChatWidgetSelector = createSelector(widgetTypeSelector, (widgetType) => widgetType === 'chat');
export const widgetTitleSelector = createSelector(chatConfigSelector, (chatConfig) => {
  return chatConfig.title || chatConfig.identifier || chatConfig.botTitle;
});

export const chatStylesSelector = createSelector(chatConfigSelector, (chatConfig) => {
  return Object.fromEntries(
    Object.entries(chatConfig).map(([key, value]) =>
      // filter out null, object and array types
      [key, value == null || typeof value === 'object' || Array.isArray(value) ? false : value].filter(Boolean),
    ),
  );
});

export const widgetThemeColorSelector = createSelector(chatConfigSelector, (chat) => chat.color);
export const avatarPositionSelector = createSelector(chatConfigSelector, (chat) =>
  chat.avatarPosition === 'header' ? 'header' : 'chat',
);
export const clientBubbleColorSelector = createSelector(
  chatConfigSelector,
  widgetThemeColorSelector,
  // fallback is the widgetThemeColor
  (chat, widgetThemeColor) => chat?.clientBubbleColor || widgetThemeColor,
);
export const replyBubbleColorSelector = createSelector(
  chatConfigSelector,
  clientBubbleColorSelector,
  widgetThemeColorSelector,
  (chat, clientBubbleColor, widgetThemeColor) =>
    // convert only to rgba if replyBubbleGradient AND clientBubbleColor
    // is not null AND clientBubbleColor isHex
    chat?.replyBubbleGradient && clientBubbleColor && isHexColor(clientBubbleColor)
      ? `rgba(${convertRGBA(clientBubbleColor)}, ${chat?.replyBubbleGradient})`
      : // else use current theme color
        widgetThemeColor,
);
export const widgetHeightSelector = createSelector(chatConfigSelector, ({ height }) => {
  if (typeof height === 'string' && height?.endsWith('px')) {
    return height;
  }
  return `${height}px`;
});

export const avatarSelector = createSelector(
  widgetConfigSelector,
  chatConfigSelector,
  (widget) => widget.avatar || zsbIcon(),
);
export const fontSizeSelector = createSelector(chatConfigSelector, (chat) =>
  chat?.fontSize ? (chat.fontSize.includes('px') ? chat.fontSize : `${chat.fontSize}`) : DEFAULT_FONT_SIZE,
);

export const showIconOnChatHeaderSelector = createSelector(
  avatarSelector,
  avatarPositionSelector,
  (avatar, position) => {
    return Boolean(avatar) && position === 'header';
  },
);

export const headerImgPositionSelector = createSelector(
  showIconOnChatHeaderSelector,
  chatConfigSelector,
  avatarPositionSelector,
  (showChatHeaderIcon, chat, position) => {
    return !position || position === 'header'
      ? showChatHeaderIcon
        ? chat.headerLogoPosition && HEADER_LOGO_POSITIONS.includes(chat.headerLogoPosition)
          ? chat.headerLogoPosition
          : 'left'
        : !chat.headerLogoPosition
          ? 'left'
          : null
      : null;
  },
);

export const showIconOnReplySelector = createSelector(avatarSelector, avatarPositionSelector, (avatar, position) => {
  return Boolean(avatar) && position === 'chat';
});
export const launcherIconSelector = createSelector(chatConfigSelector, avatarSelector, (chat) => {
  return chat.launcherIcon;
});
export const isCircleLauncherSelector = createSelector(
  chatConfigSelector,
  (chat) => !chat.shape || chat.shape?.toLowerCase() === 'circle',
);

export const handOffLabelSelector = createSelector(chatConfigSelector, (chat) => chat.handoffLabel);
export const shouldSendCallbackEmailSelector = createSelector(chatConfigSelector, (chat) => chat.callbackEmail);

export const newMessageCountSelector = createSelector(uiSelector, (ui) => ui.newMessageCount);
export const userStyleSelector = createSelector(uiSelector, (ui) => ui.userStyle);

export const typingExperienceEnabledSelector = createSelector(
  chatConfigSelector,
  (chat) => chat.typingExperience || false,
);
export const isTypingSelector = createSelector(
  chatConfigSelector,
  typingExperienceEnabledSelector,
  websocketSelector,
  (chat, typingExperienceEnabled, websocket) => {
    const isTyping = typingExperienceEnabled && chat.typing;
    // hasn't got the answer yet
    // hence, we're showing typing/loading indicator
    if (websocket?.steps?.length && chat.typing) {
      return true;
    }
    // should only be true
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
