import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';

import { StyledClientMessage, StyledQuickReplyWrapper } from './StyledComponents';
import { Context } from 'src/store/store';
import {
  ADD_REACTION_TO_LAST_RESPONSE,
  RETRIGGER_AGENT_HANDOVER,
  SEND_NEW_MESSAGE,
  SHOW_AGENT_HANDOVER_FORM,
} from 'src/store/action';
import useSelector from 'src/store/useSelector';
import {
  hasQuickReplySelector,
  lastHistorySelector,
  shouldShowQuickRepliesSelector,
} from 'src/store/selectors/history';
import { apiService } from 'src/services/api.service';
import { isMaxDislikesReachedSelector, publicKeysSelector } from 'src/store/selectors';
import { hasSubmittedUserDetailsSelector, userSelector } from 'src/store/selectors/user';
import { integrationSelector } from 'src/store/selectors/integration';
import { REACTIONS } from 'src/constants/chat';
import { cssVariables } from 'src/styles/variables';
import { handOffLabelSelector, widgetThemeColorSelector } from 'src/store/selectors/ui';
import { generateUUID } from 'src/store/utils';
import useReply from '../hooks/useReply';

const QuickReplies = (props) => {
  const { quickReplies } = props;
  const [, dispatch] = useContext(Context);
  const { addResponse } = useReply();
  const hasQuickReply = useSelector(hasQuickReplySelector);
  const publicKeys = useSelector(publicKeysSelector);
  const user = useSelector(userSelector);
  const integration = useSelector(integrationSelector);
  const lastMessage = useSelector(lastHistorySelector);
  const maxDislikesReached = useSelector(isMaxDislikesReachedSelector);
  const widgetThemeColor = useSelector(widgetThemeColorSelector);
  const handoffLabel = useSelector(handOffLabelSelector);
  const shouldShowQuickReplies = useSelector(shouldShowQuickRepliesSelector);
  const hasSubmittedUserDetails = useSelector(hasSubmittedUserDetailsSelector);

  const handleAddQuickReply = async (reply) => {
    dispatch({
      type: SEND_NEW_MESSAGE,
      payload: { userInput: reply.display, interactionId: lastMessage.interactionId },
    });
    if (reply.answer) {
      setTimeout(() => {
        addResponse(reply.answer);
      }, 500);
    }
  };

  const requestAgent = async () => {
    await dispatch({
      type: SEND_NEW_MESSAGE,
      payload: {
        userInput: handoffLabel,
        interactionId: generateUUID(),
        type: hasSubmittedUserDetails ? 'agent-handover' : undefined,
      },
    });
    if (!hasSubmittedUserDetails) {
      dispatch({
        type: SHOW_AGENT_HANDOVER_FORM,
      });
    } else {
      dispatch({ type: RETRIGGER_AGENT_HANDOVER });
    }
  };

  useEffect(() => {
    if (maxDislikesReached) {
      dispatch({
        type: SHOW_AGENT_HANDOVER_FORM,
      });
    }
  }, [maxDislikesReached]);

  const handleAddFeedback = async (reply) => {
    apiService.logFeedback(publicKeys, reply, lastMessage.interactionId || '', user, integration.name);
    dispatch({
      type: ADD_REACTION_TO_LAST_RESPONSE,
      payload: reply,
    });
  };

  const renderReaction = (display) => {
    switch (display) {
      case 'like':
        return <LikeFilled style={{ color: cssVariables.blueLike }} />;
      case 'dislike':
        return <DislikeFilled style={{ color: cssVariables.redLike }} />;
      default:
        return display;
    }
  };

  return shouldShowQuickReplies ? (
    <StyledQuickReplyWrapper>
      {hasQuickReply ? (
        quickReplies.replies.map((qr, idx) => (
          <StyledClientMessage
            color={widgetThemeColor}
            quickreply="true"
            key={`quick-reply-${idx}`}
            onClick={() => handleAddQuickReply(qr)}
          >
            <span>{qr.display}</span>
          </StyledClientMessage>
        ))
      ) : // if return default answer
      // render agent handover option
      lastMessage?.type === 'default' ? (
        <StyledClientMessage color={widgetThemeColor} quickreply="true" onClick={requestAgent}>
          <span>{handoffLabel}</span>
        </StyledClientMessage>
      ) : // if lastmessage is agent handover message
      lastMessage?.type === 'agent-handover' ? null : (
        REACTIONS.map((qr, idx) => (
          <StyledClientMessage
            color={widgetThemeColor}
            reaction="true"
            quickreply="true"
            key={`quick-reply-${idx}`}
            onClick={() => handleAddFeedback(qr.reply)}
          >
            <span>{renderReaction(qr.display)}</span>
          </StyledClientMessage>
        ))
      )}
    </StyledQuickReplyWrapper>
  ) : (
    <></>
  );
};

QuickReplies.propTypes = {
  quickReplies: PropTypes.object,
  onClick: PropTypes.func,
};

export default QuickReplies;
