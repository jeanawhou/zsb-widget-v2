import { createSelector } from 'reselect';

export const botSelector = (state) => state.bot;

export const botIdentifierSelector = createSelector(botSelector, (bot) => bot.identifier);
