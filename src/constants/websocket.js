/* eslint-disable no-undef */
export const API_BASE_URL = __VITE_BASE_URL__;
export const WEBSOCKET_WS = __VITE_WEBSOCKET_WS__;
export const WEBSOCKET_URI = __VITE_WEBSOCKET_URI__;
export const SOCKET_URL = `${WEBSOCKET_WS}${API_BASE_URL.replace('https', '')}${WEBSOCKET_URI}`;

export const UNIT_OF_TIME = 1000;
export const MULTIPLIER = 60;
export const RECONNECT_INTERVAL = UNIT_OF_TIME * MULTIPLIER;
