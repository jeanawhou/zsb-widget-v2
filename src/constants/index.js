export const ALPHANUMBERIC_REGEX = /[^a-zA-Z0-9]/g;

export const MOBILE_USER_AGENT_REGEX = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export const COMPONENT_PROPS = [
  'bot',
  'color',
  'textColor',
  'height',
  'showCloseButton',
  'openWidget',
  'headerResponseImgUrl',
  'widgetIconUrl',
  'fontSize',
  'fontStyle',
  'bubbleColor',
  'bubbleGradient',
  'visitorId',
  'disableClose',
  'hideWidgetMenu',
  'title',
  'subtitle',
  'placeholder',
  'typingExperience',
  'autoOpen',
  'launcherAvatar',
  'responseAvatar',
  'headerAvatar',
  'launcherAvatarType',
  'launcherIconType',
  'responseAvatarType',
  'headerAvatarType',
  'clientBubbleColor',
  'replyBubbleGradient',
  'bgColorWithGradient',
];

export const PROPS_TO_DEPRECATED = [
  { old: 'openWidget', new: 'autoOpen' },
  { old: 'headerResponseImgUrl', new: 'avatar' },
  { old: 'avatar', new: 'headerAvatar' },
  { old: 'headerResponseImgUrl', new: 'headerAvatar' },
  { old: 'widgetIconUrl', new: 'launcherAvatar' },
  { old: 'launcherIcon', new: 'launcherAvatar' },
  { old: 'bubbleColor', new: 'clientBubbleColor' },
  { old: 'bubbleGradient', new: 'replyBubbleGradient' },
  { old: 'launcherIconType', new: 'launcherAvatarType' },
];

export const WIDGET_TYPES = ['chat', 'search'];

export const BRAND = 'Zeroshotbot';

export const PLACEHOLDER = {
  search: 'Search',
  chat: 'Type your query here...',
};

export const ICON_OPTIONS = ['default', 'icon1', 'icon2', 'icon3', 'icon4', 'zsb'];
