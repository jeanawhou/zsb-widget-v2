import { isPlainObject } from 'lodash';
import { useContext } from 'react';
import { ADD_ERROR_REPLY, ADD_REPLY } from 'src/store/action';
import { historySelector } from 'src/store/selectors/history';
import { Context } from 'src/store/store';
import useSelector from 'src/store/useSelector';
import { getMessageReplies } from 'src/utils/messages';

const useReply = () => {
  const [, dispatch] = useContext(Context);
  const allHistory = useSelector(historySelector);

  const addResponse = (answer) => {
    if (isPlainObject(answer)) {
      const { context, ...restOfResponse } = answer;
      const messageReplies = getMessageReplies(context);
      messageReplies.forEach((msg, index) => {
        setTimeout(
          () => {
            dispatch({
              type: ADD_REPLY,
              payload: {
                ...restOfResponse,
                context: {
                  ...context,
                },
                // text prop will be the bot's answer
                text: msg,
                newMessageCount: index + 1,
                isLastReplyItem: index === messageReplies.length - 1,
              },
            });
          },
          (index + 1) * 1200,
        ); // Slightly more than 2s to account for the typing effect
      });
    } else if (typeof answer === 'string') {
      // find the message with same answer
      const messageWithMatchedAnswer = allHistory.find((msg) => msg?.answerId === answer);
      // get the reply prop
      const messageReplies = messageWithMatchedAnswer?.reply?.text;
      messageReplies.forEach((msg, index) => {
        setTimeout(
          () => {
            dispatch({
              type: ADD_REPLY,
              payload: {
                context: {},
                // text prop will be the bot's answer
                text: msg,
                newMessageCount: index + 1,
                isLastReplyItem: index === messageReplies.length - 1,
              },
            });
          },
          (index + 1) * 1200,
        ); // Slightly more than 2s to account for the typing effect
      });
    } else {
      dispatch({
        type: ADD_ERROR_REPLY,
      });
    }
  };

  return {
    addResponse,
  };
};

export default useReply;
