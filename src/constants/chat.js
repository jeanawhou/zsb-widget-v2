export const ZSB_CHAT_BREAKER_ENCONDING = '&lt;zsb-chat-breaker /&gt;';

export const FALLBACK_WIDGET_LABEL = 'Talk to us!';

export const DEFAULT_AGENT_HANDOVER_MESSAGE = {
  cancelledFormMessage: "You've cancelled the form. Anything else I can help you with?",
  submittedFormMessage:
    'Thank you, your information has been submitted. Next available agent will connect with you shortly.',
  formHeader: 'Please share your details so we can reach out to you.',
};

// eslint-disable-next-line no-undef
export const MAX_DISLIKES = __VITE_MAX_DISLIKES__;

export const REACTIONS = [
  {
    display: 'like',
    reply: 1,
  },
  {
    display: 'dislike',
    reply: 0,
  },
];

export const DEFAULT_USER_FORM_FIELDS = [
  {
    label: 'Name',
    attribute: 'name',
    mandatory: false,
  },
  {
    label: 'Email',
    attribute: 'email',
    mandatory: true,
  },
];

export const EMPTY_QUICK_REPLY = { replies: [] };
export const DEFAULT_FONT_SIZE = '14px';

export const DEFAULT_HEIGHT = '450px';
export const DEFAULT_WIDGET_TYPE = 'chat';
export const DEFAULT_WIDTH = '350px';
export const DEFAULT_LAUNCHER_SHAPE = 'circle';

export const DEFAULT_ERROR_MESSAGE = `Sorry, I'm having trouble to look for the answer. Please try again later.`;
export const SUBMIT_ERROR_MESSAGE = `Sorry, something went wrong while submitting your information. Please contact admin.`;

export const HEADER_LOGO_POSITIONS = ['left', 'right', 'center'];
export const LAUNCHER_ONLY_ICONS = ['default', 'icon1'];
