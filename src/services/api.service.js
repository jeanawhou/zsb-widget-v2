import axios from 'axios';
import { getLocalStorageItem } from './global.service';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiService = {
  jacPrimeRun: function (data) {
    return axios.request({
      baseURL: BASE_URL,
      url: '/js_public/walker_summon',
      method: 'post',
      data,
    });
  },

  askQuestion: function (input, publicKeys, user, interactionId, integration, ws = null) {
    const { sentinel, key, graph, wlk } = publicKeys;
    const { isAuthenticated, visitorId, sessionId } = user;
    const interactionHistory = getLocalStorageItem('context') || [];

    return this.jacPrimeRun({
      snt: sentinel,
      key,
      nd: graph,
      wlk,
      ctx: {
        text: input,
        metadata: {
          visitor_id: visitorId,
          session_id: sessionId,
          interaction_id: interactionId,
          channel: integration.name,
          isAuthenticated,
        },
        integration,
        api_name: 'ask_question',
        history: interactionHistory,
        ws_target: ws,
      },
    });
  },

  logFeedback: function (publicKeys, feedback, interactionId, user, channel) {
    const { sentinel, key, graph, wlk } = publicKeys;
    const { isAuthenticated, visitorId, sessionId } = user;
    return this.jacPrimeRun({
      snt: sentinel,
      key,
      nd: graph,
      wlk,
      ctx: {
        feedback,
        metadata: {
          channel,
          isAuthenticated,
          visitor_id: visitorId,
          session_id: sessionId,
          interaction_id: interactionId,
        },
        api_name: 'log_feedback',
      },
    });
  },

  logCallback: function (
    key,
    nd,
    snt,
    wlk,
    session_id,
    customer_info,
    channel,
    interactionID,
    hasAlreadySentEmail,
    callbackEmail,
  ) {
    const uuidPrefix = 'urn:uuid:';
    const strippedUUID = nd.split(uuidPrefix).pop();
    return this.jacPrimeRun({
      snt,
      key,
      nd,
      wlk,
      ctx: {
        customer_info,
        session_id,
        api_name: 'log_callback',
        send_email: callbackEmail ? (hasAlreadySentEmail ? false : true) : false,
        interaction_id: interactionID,
        url: `${BASE_URL}/bot/${strippedUUID}/callback-logs?sessionid=${session_id}`,
      },
    });
  },
};
