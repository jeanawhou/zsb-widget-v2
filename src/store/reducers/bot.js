import { isEmpty } from 'lodash';
import { DECRYPT_BOT } from '../action';
import { extractPublicKeys } from '../helpers/bot';
import { decrypt } from '../utils';
import { initialPublicKeys } from '../initialState';

export const botReducer = (state, action) => {
  switch (action.type) {
    case DECRYPT_BOT: {
      const { bot } = action.payload;
      const decryptedBot = !isEmpty(bot) ? decrypt(bot) : {};
      const { pubAskedQuestion, url } = decryptedBot;
      const publicKeys = !isEmpty(pubAskedQuestion) ? extractPublicKeys(pubAskedQuestion) : initialPublicKeys;

      return {
        ...state,
        publicKeys,
        isEmptyWidget: isEmpty(pubAskedQuestion),
        configURL: url,
      };
    }

    default:
      return state;
  }
};
