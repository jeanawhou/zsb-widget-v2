import { MAX_DISLIKES } from '../constants/chat';
import DEFAULT_ZSB_ICON from '@assets/zsb-icon-faded-small.svg';

export const initialMessages = [];

export const initialChat = {
  title: 'ZSB Chat',
  subtitle: '',
  placeholder: 'Type your message...',
  theme: '',
  showLogoOnChat: false,
  bot: '',
  openWidget: false,
  typing: false,
};

export const initialUI = {
  isWidgetExpanded: false,
  widgetType: 'chat',
  newMessageCount: null,
  widgetConfig: {
    icon: DEFAULT_ZSB_ICON,
    chat: initialChat,
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
  websocket: initialWebsocketState,
};
