import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledActionButtonsWrapper } from './StyledComponents';
import { Button, Input } from 'antd';
import useSelector from 'src/store/useSelector';
import { shouldSendCallbackEmailSelector, widgetThemeColorSelector } from 'src/store/selectors/ui';
import { apiService } from 'src/services/api.service';
import { publicKeysSelector } from 'src/store/selectors';
import { Context } from 'src/store/store';
import { ADD_ERROR_REPLY, CANCEL_AGENT_HANDOVER, SUBMIT_AGENT_HANDOVER_FORM } from 'src/store/action';
import { hasSubmittedUserDetailsSelector, userSelector } from 'src/store/selectors/user';

const AgentHandoverForms = (props) => {
  const { message, timeReply } = props;
  const [, dispatch] = useContext(Context);
  const widgetThemeColor = useSelector(widgetThemeColorSelector);
  const publicKeys = useSelector(publicKeysSelector);
  const user = useSelector(userSelector);
  const hasSubmittedUserDetails = useSelector(hasSubmittedUserDetailsSelector);
  const shouldSendCallbackEmail = useSelector(shouldSendCallbackEmailSelector);

  const [formValues, setFormValues] = useState(message.forms);

  const handleFormChange = (e, form) => {
    const updated = formValues.map((f) => {
      if (f.attribute === form.attribute) {
        return {
          ...f,
          [f.attribute]: e.target.value,
        };
      }
      return f;
    });
    setFormValues(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.logCallback(
        publicKeys,
        formValues,
        message?.interactionId,
        hasSubmittedUserDetails,
        shouldSendCallbackEmail,
        user,
      );

      dispatch({
        type: SUBMIT_AGENT_HANDOVER_FORM,
        payload: {
          user: formValues,
        },
      });
    } catch (error) {
      dispatch({
        type: ADD_ERROR_REPLY,
      });
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    dispatch({
      type: CANCEL_AGENT_HANDOVER,
    });
  };

  return (
    <>
      {message.forms.map((form, idx) => {
        return (
          <Input
            key={`chat-bubble-${timeReply}-form-${idx}`}
            placeholder={form?.label}
            onChange={(e) => handleFormChange(e, form)}
            required={form.mandatory}
            bordered={false}
          />
        );
      })}
      <StyledActionButtonsWrapper>
        <Button onClick={handleCancel} type="default">
          {'Cancel'}
        </Button>
        <Button onClick={handleSubmit} style={{ background: widgetThemeColor, color: '#fff' }}>
          {'Submit'}
        </Button>
      </StyledActionButtonsWrapper>
    </>
  );
};

AgentHandoverForms.propTypes = {
  message: PropTypes.object,
  timeReply: PropTypes.instanceOf(Date),
};

export default AgentHandoverForms;
