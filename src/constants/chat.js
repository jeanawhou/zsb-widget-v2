export const ZSB_CHAT_BREAKER_ENCONDING = '&lt;zsb-chat-breaker /&gt;';

export const FALLBACK_WIDGET_LABEL = 'Talk to us!';

export const DEFAULT_AGENT_HANDOVER_MESSAGE = {
  cancelledFormMessage: "You've cancelled the form. Anything else I can help you with?",
  submittedFormMessage:
    'Thank you, your information has been submitted. Next available agent will connect with you shortly.',
  formHeader: 'Please share your details so we can reach out to you.',
};

// eslint-disable-next-line no-undef
export const MAX_DISLIKES = __MAX_DISLIKES__;

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
