import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Context } from 'src/store/store';
import { DECRYPT_BOT, SET_VISITOR_ID, SET_WIDGET_CONFIG } from 'src/store/action';
import ChatWidget from './ChatWidget';
import { fingerPrintJs } from 'src/services/global.service';
import useSelector from 'src/store/useSelector';
import { configURLSelector, isWidgetReadySelector } from 'src/store/selectors';

const ZSBWidget = (props) => {
  const isChatWidget = props?.type === 'chat' || !props?.type;
  const [, dispatch] = useContext(Context);
  const configURL = useSelector(configURLSelector);
  const isWidgetReady = useSelector(isWidgetReadySelector);

  const fetchConfigProps = () => {
    fetch(configURL)
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: SET_WIDGET_CONFIG,
          payload: { configJSON: res, widgetProps: props },
        });
      });
  };

  useEffect(() => {
    if (configURL) {
      fetchConfigProps();
    }
  }, [configURL]);

  useEffect(() => {
    if (props.visitorid && props.visitorid !== (null || 'null') && props.visitorid !== (undefined || 'undefined')) {
      dispatch({ type: SET_VISITOR_ID, payload: props.visitorid });
    } else {
      fingerPrintJs().then((visitorId) => {
        dispatch({ type: SET_VISITOR_ID, payload: visitorId });
      });
    }
  }, [props?.visitorid]);

  useEffect(() => {
    dispatch({ type: DECRYPT_BOT, payload: props });
  }, []);

  return isWidgetReady ? isChatWidget ? <ChatWidget {...props} /> : <div {...props}>ZSBWidget</div> : <div></div>;
};

ZSBWidget.defaultProps = {
  title: '',
  subtitle: '',
  placeholder: 'Type your message...',
  bot: 'U2FsdGVkX1/beTGimooLgFsiDn9wgA2VG8iN1GFGr1S3HgNptSgDT/9/jLdsl8pX7nxxsFO0SqSwTZHo4B2KDYWKyBntVwpeQnp/T7mvfdhnHByIeA3tBbKAwSVKKuz05NLxOHR5qMA16qlHX6ywf5Aqqdj48+cKtVVmpfVkAW+UM/obcIrlnZ6Fas4hfHh66vkc/g1E1xuHm8Zg4GDyDfZyXkMF7JKHpswnPE8WQrSKz52a+wnKl/B/VDuKS5pHAS/CQVDhFiAGt/qEBOGcGsFRzVEvDJr/FsAV7QHTI41tySI0bVkG+8FZsuu7ZUZ5HCjfgvDYjjjGaoPZA6LxKqPw3G5Enx5uipzFBAJInHj2KulRLMPVjX6Kn66XPPunGrIQc8YvaQmkmoJ7iiVIVhU9UistTqXdgv8DT8gM5IebvAac5Fl2ZmCx9GF1eSdOuhTCG/MRiUVQahIq6RJtLt3+jnqep4qPfxCTm7MKD4SmIN5DGE9sB0HwGvdnmCjoNIkFBEBWnNw5NkzS3TI+MQ==',
};

ZSBWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.any,
  configProps: PropTypes.object,
  handleSendMessage: PropTypes.func,
  handleAddReply: PropTypes.func,
  bot: PropTypes.string,
  visitorid: PropTypes.string,
  type: PropTypes.string,
};

export default ZSBWidget;
