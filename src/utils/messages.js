import { isEmpty } from 'lodash';
import { ZSB_CHAT_BREAKER_ENCONDING } from 'src/constants/chat';

export const getMessageReplies = (replyContext = {}) => {
  if (!isEmpty(replyContext?.show_html)) {
    const fullReply = replyContext.show_html.flatMap((html) => {
      if (String(html).includes(ZSB_CHAT_BREAKER_ENCONDING)) {
        const splitted = html.split(ZSB_CHAT_BREAKER_ENCONDING);
        return splitted;
      }
      return html;
    });
    return fullReply;
  } else if (!isEmpty(replyContext?.show_text)) {
    const fullReply = replyContext.show_text.flatMap((text) => {
      if (text?.type === 'text' && text?.value?.length && String(text).includes(ZSB_CHAT_BREAKER_ENCONDING)) {
        const splitted = text.value.split(ZSB_CHAT_BREAKER_ENCONDING);
        return splitted;
      } else if (typeof text === 'string') {
        return text.split(ZSB_CHAT_BREAKER_ENCONDING);
      }
      return text;
    });
    return fullReply;
  } else {
    // convert to an array
    // to handle all message reply in same data type
    return [replyContext.text];
  }
};
