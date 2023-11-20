import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import { Context } from 'src/store/store';
import { DECRYPT_BOT, SET_VISITOR_ID, SET_WIDGET_CONFIG } from 'src/store/action';
import ChatWidget from './ChatWidget';
import { fingerPrintJs } from 'src/services/global.service';
import useSelector from 'src/store/useSelector';
import { configURLSelector, isWidgetReadySelector } from 'src/store/selectors';

const ZSBWidget = props => {
  const isChatWidget = props?.type === 'chat' || !props?.type
  const [state, dispatch] = useContext(Context);
  const configURL = useSelector(configURLSelector);
  const isWidgetReady = useSelector(isWidgetReadySelector);

  const fetchConfigProps = () => {
   fetch(configURL).then((res) => res.json()).then((res) => {
    dispatch({
      type: SET_WIDGET_CONFIG,
      payload: { configJSON: res, widgetProps: props },
    });
   })
  }

  useEffect(() => {
    if (configURL) {
      fetchConfigProps();
    }
  }, [configURL]);

  useEffect(() => {
    if (props.visitorid &&
        props.visitorid !== (null || 'null') &&
        props.visitorid !== (undefined || 'undefined')
      ) {
      dispatch({ type: SET_VISITOR_ID, payload: props.visitorid })
    } else {
     fingerPrintJs().then((visitorId) => {
        dispatch({ type: SET_VISITOR_ID, payload: visitorId })
      })
    }
  }, [props?.visitorid])

  useEffect(() => {
    dispatch({ type: DECRYPT_BOT, payload: props })
  }, []);
  
  return isWidgetReady ? isChatWidget ? <ChatWidget {...props} /> : <div {...props}>ZSBWidget</div> : <div></div>
}

ZSBWidget.defaultProps = {
  title: '',
  subtitle: '',
  placeholder: 'Type your message...',
  icon: 'https://logosandtypes.com/wp-content/uploads/2022/07/openai.svg',
  showLogoOnChat: false,
  bot: 'U2FsdGVkX18lc0B/UjkATKeCdufcpi4B7H56BYxDQKiCZEdEH7/Q+yZ7ET/jipOmV6qtvqULs5aA+7Plh5HRUzl4a4qstEjB3SUiYBm96qaSTToEPffvZBDxceKokMVfbkhuHmOMPkCpGj6bVWsSMWtFgAAOX4z4DnMnVIexsbm6KpTKSpw5q8SxLIbc333xJ17YzdTYkJhQaTFi6AhNt9lJ01vjP1CoxAtN1bbLRw6kn0XzlUuFyIQOyp3lXoXwffTUcey3Gj/grYCwrfPwye2Xp33Om1qohk0N1NYnODGwd9msFSo+M5v0LZ69fk8MLQ98UGBDXFndeFBUFgRW5d9bk4hMIfmDIXPZuC+TMNsbFMnSbVZisPzb+8F0836Vmr7humPKx5u8+2+QeI70cc/ZfDhEjILX/CE4QNccZ3tvGHaWtWZ8SWtIcs1yuk7w31AlkPh4NOnFFLErVyfbvXRpkHDPgpEWBrLnuEE++nkMUV7vPvKRIjcB1775n8wGuGFTsFiKo+bIawRuCsDyew==',
};

ZSBWidget.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.any,
  showLogoOnChat: PropTypes.bool,
  configProps: PropTypes.object,
  handleSendMessage: PropTypes.func,
  handleAddReply: PropTypes.func,
  bot: PropTypes.string,
};

export default ZSBWidget