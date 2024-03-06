import { isPlainObject } from 'lodash';
import { createSelector } from 'reselect';

export const historySelector = (state) => state.history;

export const lastMessageQuickReplySelector = createSelector(historySelector, (history) => {
  const lastMessage = Array.isArray(history) ? history[history?.length - 1] : {};
  return lastMessage?.quickReply || {};
});

export const lastMessageSelector = createSelector(historySelector, (history) => {
  return Array.isArray(history) ? history[history?.length - 1] : {};
});

export const hasQuickReplySelector = createSelector(lastMessageQuickReplySelector, (lastMessageReplies) => {
  return Boolean(lastMessageReplies.replies?.length);
});

export const shouldShowQuickRepliesSelector = createSelector(
  lastMessageSelector,
  hasQuickReplySelector,
  historySelector,
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
      (hasQuickReply && Boolean(lastMessage?.reply?.isLastReplyItem)) ||
      (isPlainObject(lastMessage) &&
        lastMessage.lastUserReplied === 'bot' &&
        typeof lastMessage.text !== 'undefined' &&
        typeof lastMessage?.feedback === 'undefined' &&
        lastMessage?.type !== 'error' &&
        Boolean(lastMessage?.reply?.isLastReplyItem))
    ) {
      return true;
    }
    return false;
  },
);
