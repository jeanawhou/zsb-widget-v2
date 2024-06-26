import { isPlainObject } from 'lodash';
import { useContext } from 'react';
import { ADD_ERROR_REPLY, ADD_ANSWER } from 'src/store/action';
import { historySelector } from 'src/store/selectors/history';
import { typingExperienceEnabledSelector } from 'src/store/selectors/ui';
import { Context } from 'src/store/store';
import useSelector from 'src/store/useSelector';
import { getMessageReplies } from 'src/utils/messages';

const useReply = () => {
  const [, dispatch] = useContext(Context);
  const allHistory = useSelector(historySelector);
  const typingExperienceEnabled = useSelector(typingExperienceEnabledSelector);

  const addReply = (messageReplies, msg, index, answerObj) => {
    const { context, ...restOfResponse } = answerObj;
    if (typingExperienceEnabled) {
      setTimeout(
        () => {
          dispatch({
            type: ADD_ANSWER,
            payload: {
              ...restOfResponse,
              context: context || {},
              // text prop will be the bot's answer
              text: msg,
              newMessageCount: index + 1,
              isLastReplyItem: index === messageReplies.length - 1,
            },
          });
        },
        (index + 1) * 1200,
      ); // Slightly more than 2s to account for the typing effect
    } else {
      dispatch({
        type: ADD_ANSWER,
        payload: {
          context: {},
          // text prop will be the bot's answer
          text: msg,
          newMessageCount: index + 1,
          isLastReplyItem: index === messageReplies.length - 1,
        },
      });
    }
  };

  const addResponse = (answer) => {
    if (isPlainObject(answer)) {
      const { context } = answer;
      const messageReplies = getMessageReplies(context);
      messageReplies.forEach((msg, index) => {
        addReply(messageReplies, msg, index, answer);
      });
    }
    // if answer is string
    // we'll assume its an answerId
    else if (typeof answer === 'string') {
      // find the message with same answer
      const messageWithMatchedAnswer = allHistory.find((msg) => msg?.answerId === answer);
      // get the reply prop
      const messageReplies = messageWithMatchedAnswer?.reply?.text;
      messageReplies.forEach((msg, index) => {
        addReply(messageReplies, msg, index, answer);
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
