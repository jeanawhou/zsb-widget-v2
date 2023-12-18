export const initialMessages = [];

export const initialChat = {
  title: 'ZSB Chat',
  subtitle: '',
  placeholder: 'Type your message...',
  theme: '',
  showLogoOnChat: false,
  bot: '',
  openWidget: false,
};

export const initialUI = {
  isWidgetExpanded: false,
  widgetType: 'chat',
  newMessageCount: null,
  widgetConfig: {
    icon: '/zsb-icon-faded-small.svg',
    chat: initialChat,
  },
};

export const initialPublicKeys = {
  sentinel: null,
  graph: null,
  wlk: null,
  key: null,
};

export const initialUserState = {
  isAuthenticated: false,
  email: null,
  name: null,
  sessionId: null,
};

export const initialMetadata = {
  maxInteraction: null,
  interactionHistory: [],
  maxDislikes: 3 || import.meta.env.VITE_MAX_DISLIKES,
  enableTextToSpeech: false,
  dislikes: 0,
};

export const initialState = {
  messages: initialMessages,
  integration: {},
  ui: initialUI,
  publicKeys: initialPublicKeys,
  configURL: null,
  user: initialUserState,
  isWidgetReady: false,
  fbConfig: {
    fbApiVersion: null,
    fbAccessToken: null,
  },
  metadata: initialMetadata,
};
