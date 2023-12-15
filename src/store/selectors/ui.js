import { createSelector } from 'reselect';

export const uiSelector = (state) => state.ui;

export const isWidgetExpandedSelector = createSelector(uiSelector, (ui) => ui.isWidgetExpanded);

export const widgetConfigSelector = createSelector(uiSelector, (ui) => ui.widgetConfig);

export const chatConfigSelector = createSelector(widgetConfigSelector, (widgetConfig) => widgetConfig.chat);

export const widgetIconSelector = createSelector(widgetConfigSelector, (widget) => widget.icon);

export const newMessageCountSelector = createSelector(uiSelector, (ui) => ui.newMessageCount);
