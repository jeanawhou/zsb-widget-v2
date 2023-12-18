import { createSelector } from 'reselect';

export const userSelector = (state) => state.user;

export const visitorIdSelector = createSelector(userSelector, (user) => user.visitorId);

export const sessionIdSelector = createSelector(userSelector, (user) => user.sessionId);

export const hasSubmittedUserDetailsSelector = createSelector(userSelector, (user) => user.hasSubmittedUserDetails);
