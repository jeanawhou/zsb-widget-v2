import { MAX_DISLIKES } from '../constants/chat';

export const initialHistory = [];

export const initialChatConfig = {
  title: 'ZSB Chat',
  subtitle: '',
  placeholder: 'Type your message...',
  theme: '',
  showIconOnChatHeader: false,
  bot: '',
  autoOpen: false,
  typing: false,
  position: 'bottom-right',
};

export const initialUI = {
  isWidgetExpanded: false,
  widgetType: null,
  newMessageCount: null,
  widgetConfig: {
    chat: initialChatConfig,
  },
};

export const initialPublicKeys = {
  sentinel: null,
  graph: null,
  wlk: null,
  key: null,
};

export const initialWebsocketState = {
  channel: null,
  askQuestionActiveAction: [],
  askQuestionActions: [],
  steps: [],
  generatedAnswer: '',
  sending: false,
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
  maxDislikes: MAX_DISLIKES,
  enableTextToSpeech: false,
  dislikes: 0,
};

export const initialState = {
  history: initialHistory,
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
  websocket: initialWebsocketState,
};
