import { useContext } from 'react';
import { ADD_REPLY } from 'src/store/action';
import { Context } from 'src/store/store';
import { getMessageReplies } from 'src/utils/messages';

const useReply = () => {
  const [, dispatch] = useContext(Context);

  const addResponse = (fullResponse) => {
    const { context, ...restOfResponse } = fullResponse;
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
  };

  return {
    addResponse,
  };
};

export default useReply;
