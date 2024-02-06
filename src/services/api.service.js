import axios from 'axios';
import { getLocalStorageItem } from './global.service';
import { omit } from 'lodash';
// eslint-disable-next-line no-undef
const BASE_URL = __VITE_BASE_URL__;

export const apiService = {
  jacPrimeRun: function (data) {
    return axios.request({
      baseURL: BASE_URL,
      url: '/js_public/walker_summon',
      method: 'post',
      data,
    });
  },

  askQuestion: function (input, publicKeys, user, interactionId, integration, ws) {
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
        ws_target: ws || null,
        integration,
        api_name: 'ask_question',
        history: interactionHistory,
      },
      is_async: ws ? true : false,
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

  logCallback: function (publicKeys, customerInfo, interactionID, hasAlreadySentEmail, callbackEmail, user) {
    const uuidPrefix = 'urn:uuid:';
    const { sentinel, key, graph, wlk } = publicKeys;
    const { sessionId } = user;
    const strippedUUID = graph.split(uuidPrefix).pop();
    const EXCLUDED_FORM_INFO = ['mandatory', 'label', 'attribute'];
    const filteredCustomerInfo = customerInfo.reduce((acc, info) => {
      return Object.assign(acc, omit(info, EXCLUDED_FORM_INFO));
    }, {});
    return this.jacPrimeRun({
      snt: sentinel,
      key,
      nd: graph,
      wlk,
      ctx: {
        customer_info: filteredCustomerInfo,
        session_id: sessionId,
        api_name: 'log_callback',
        send_email: callbackEmail ? (hasAlreadySentEmail ? false : true) : false,
        interaction_id: interactionID,
        url: `${BASE_URL}/bot/${strippedUUID}/callback-logs?sessionid=${sessionId}`,
      },
    });
  },
};
