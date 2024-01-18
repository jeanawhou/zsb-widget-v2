/* eslint-disable no-undef */
export const API_BASE_URL = __BASE_URL__;
export const WEBSOCKET_WS = __WEBSOCKET_WS__;
export const WEBSOCKET_URI = __WEBSOCKET_URI__;
export const SOCKET_URL = `${WEBSOCKET_WS}${API_BASE_URL.replace('https', '')}${WEBSOCKET_URI}`;

export const RECONNECT_INTERVAL_IN_MS = 1000;
