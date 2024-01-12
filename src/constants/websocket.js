export const API_BASE_URL = import.meta.env.VITE_BASE_URL;
export const WEBSOCKET_WS = import.meta.env.VITE_WEBSOCKET_WS;
export const WEBSOCKET_URI = import.meta.env.VITE_WEBSOCKET_URI;
export const SOCKET_URL = `${WEBSOCKET_WS}${API_BASE_URL.replace('https', '')}${WEBSOCKET_URI}`;

export const RECONNECT_INTERVAL_IN_MS = 1000;

export const RECONNECT_MESSAGE = `Socket is closed. Reconnect will be attempted in ${
  RECONNECT_INTERVAL_IN_MS / 1000
} second.`;
