import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { StyledActionButtonsWrapper } from './StyledComponents';
import { Button, Form, Input } from 'antd';
import useSelector from 'src/store/useSelector';
import { shouldSendCallbackEmailSelector, widgetThemeColorSelector } from 'src/store/selectors/ui';
import { apiService } from 'src/services/api.service';
import { publicKeysSelector } from 'src/store/selectors';
import { Context } from 'src/store/store';
import {
  ADD_ERROR_REPLY,
  AGENT_HANDOVER_SUBMIT_FAIL,
  CANCEL_AGENT_HANDOVER,
  SUBMIT_AGENT_HANDOVER_FORM,
} from 'src/store/action';
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
  const [sending, setSending] = useState(false);

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
    setSending(true);
    try {
      const res = await apiService.logCallback(
        publicKeys,
        formValues,
        message?.interactionId,
        hasSubmittedUserDetails,
        shouldSendCallbackEmail,
        user,
      );

      if (res.data.success) {
        await dispatch({
          type: SUBMIT_AGENT_HANDOVER_FORM,
          payload: {
            user: formValues,
          },
        });
      } else {
        await dispatch({
          type: AGENT_HANDOVER_SUBMIT_FAIL,
        });
      }
    } catch (error) {
      await dispatch({
        type: ADD_ERROR_REPLY,
      });
    }
    setFormValues([]);
    setSending(false);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    dispatch({
      type: CANCEL_AGENT_HANDOVER,
    });
  };

  return (
    <Form onFinish={handleSubmit} name="user-form">
      {message.forms.map((form, idx) => {
        const isMobileForm = form?.label?.toLowerCase()?.includes('number');
        const isEmailForm = form?.label?.toLowerCase()?.includes('email');
        return (
          <Form.Item
            rules={[
              {
                required: form.mandatory === 'true' || form.mandatory ? true : false,
                message: `${form.label} is required`,
              },
            ]}
            key={`chat-bubble-${timeReply}-form-${idx}`}
            name={form.attribute}
          >
            <Input
              placeholder={form?.label}
              onChange={(e) => handleFormChange(e, form)}
              bordered={false}
              type={isMobileForm ? 'tel' : isEmailForm ? 'email' : 'text'}
            />
          </Form.Item>
        );
      })}
      <StyledActionButtonsWrapper>
        <Button onClick={handleCancel} type="default">
          {'Cancel'}
        </Button>
        <Form.Item>
          <Button loading={sending} style={{ background: widgetThemeColor, color: '#fff' }} htmlType="submit">
            {'Submit'}
          </Button>
        </Form.Item>
      </StyledActionButtonsWrapper>
    </Form>
  );
};

AgentHandoverForms.propTypes = {
  message: PropTypes.object,
  timeReply: PropTypes.instanceOf(Date),
};

export default AgentHandoverForms;
