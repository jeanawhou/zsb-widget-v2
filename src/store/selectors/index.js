import { createSelector } from 'reselect';

export const configURLSelector = (state) => state.configURL;

export const websocketSelector = (state) => state.websocket;

export const publicKeysSelector = (state) => state.publicKeys;

export const isWidgetReadySelector = (state) => state.isWidgetReady;

export const metadataSelector = (state) => state.metadata;

export const dislikesSelector = createSelector(metadataSelector, (metadata) => metadata.dislikes);

export const isMaxDislikesReachedSelector = createSelector(metadataSelector, (metadata) => {
  if (metadata.maxDislikes && metadata.dislikes) {
    return metadata.dislikes >= Number(metadata.maxDislikes);
  }
  return false;
});
