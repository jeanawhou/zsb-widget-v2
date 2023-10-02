import { createSelector } from 'reselect';

export const uiSelector = (state) => state.ui;

export const isExpandedChatSelector = createSelector(uiSelector, ui => ui.isExpandedChat)
