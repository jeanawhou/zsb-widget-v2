import { isPlainObject } from 'lodash';
import { createSelector } from 'reselect';

export const messagesSelector = (state) => state.messages;

export const lastMessageQuickReplySelector = createSelector(messagesSelector, (messages) => {
  const lastMessage = Array.isArray(messages) ? messages[messages?.length - 1] : {};
  return lastMessage?.quickReply || {};
});

export const lastMessageSelector = createSelector(messagesSelector, (messages) => {
  return Array.isArray(messages) ? messages[messages?.length - 1] : {};
});

export const hasQuickReplySelector = createSelector(lastMessageQuickReplySelector, (lastMessageReplies) => {
  return Boolean(lastMessageReplies.replies?.length);
});

export const shouldShowQuickRepliesSelector = createSelector(
  lastMessageSelector,
  hasQuickReplySelector,
  messagesSelector,
  (lastMessage, hasQuickReply) => {
    // if client already has feedback for the message
    // don't show quick buttons
    if (isPlainObject(lastMessage) && typeof lastMessage?.feedback !== 'undefined') {
      return false;
    }

    // show quick buttons
    // if answer has quick reply or
    // if last message has no feedback/reaction
    // if last message is not an error reply
    else if (
      hasQuickReply ||
      (isPlainObject(lastMessage) &&
        lastMessage.lastUserReplied === 'bot' &&
        typeof lastMessage.text !== 'undefined' &&
        typeof lastMessage?.feedback === 'undefined' &&
        lastMessage?.type !== 'error')
    ) {
      return true;
    }
    return false;
  },
);
