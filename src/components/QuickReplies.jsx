import PropTypes from 'prop-types';

import {
  StyledClientMessage,
  StyledFlexRowSpaceEvenly,
} from './StyledComponents';
import { useContext } from 'react';
import { Context } from 'src/store/store';
import { SEND_NEW_MESSAGE } from 'src/store/action';
import { apiService } from 'src/services/api.service';

const QuickReplies = (props) => {
  const { quickReplies } = props;
  const [state, dispatch] = useContext(Context);

  const handleClickBubble = async (message) => {
    const res = await apiService.askQuestion()
    dispatch({ type: SEND_NEW_MESSAGE, payload: { newMessage: message } });
  }

  return (
    <StyledFlexRowSpaceEvenly style={{ paddingTop: 5 }}>
      {quickReplies.map((qr, idx) => (
        <StyledClientMessage quickreply="true" key={`quick-reply ${idx}`} onClick={() => handleClickBubble(qr.value)}>
          <span>
            {qr.label}
          </span>
        </StyledClientMessage>
      ))}
    </StyledFlexRowSpaceEvenly>
  );
};

QuickReplies.propTypes = {
  quickReplies: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  onClick: PropTypes.func,
};

export default QuickReplies;
