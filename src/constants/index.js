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
  'avatarPosition',
];

export const PROPS_TO_DEPRECATED = [
  { old: 'openWidget', new: 'autoOpen' },
  { old: 'headerResponseImgUrl', new: 'avatar' },
  { old: 'widgetIconUrl', new: 'launcherLogo' },
  { old: 'bubbleColor', new: 'clientBubbleColor' },
  { old: 'bubbleGradient', new: 'replyBubbleGradient' },
];
