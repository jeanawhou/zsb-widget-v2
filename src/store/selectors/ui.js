import { createSelector } from 'reselect';

export const uiSelector = (state) => state.ui;

export const isWidgetExpandedSelector = createSelector(uiSelector, (ui) => ui.isWidgetExpanded);

export const widgetConfigSelector = createSelector(uiSelector, (ui) => ui.widgetConfig);

export const chatConfigSelector = createSelector(widgetConfigSelector, (widgetConfig) => widgetConfig.chat);

export const chatStylesSelector = createSelector(chatConfigSelector, (chatConfig) => {
  console.log('chatConfig', chatConfig);
  return Object.fromEntries(
    Object.entries(chatConfig).map(([key, value]) =>
      // filter out null, object and array types
      [key, value == null || typeof value === 'object' || Array.isArray(value) ? false : value].filter(Boolean),
    ),
  );
});

export const widgetThemeColorSelector = createSelector(chatConfigSelector, (chat) => chat.color);

export const widgetIconSelector = createSelector(widgetConfigSelector, (widget) => widget.icon);

export const handOffLabelSelector = createSelector(chatConfigSelector, (chat) => chat.handoffLabel);
export const shouldSendCallbackEmailSelector = createSelector(chatConfigSelector, (chat) => chat.callbackEmail);

export const newMessageCountSelector = createSelector(uiSelector, (ui) => ui.newMessageCount);
