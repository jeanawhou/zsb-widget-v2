import { cloneElement } from 'react';
import PropTypes from 'prop-types';
import useSelector from 'src/store/useSelector';
import { isCircleLauncherSelector, widgetIconSelector } from 'src/store/selectors/ui';

const WidgetIcon = (props) => {
  const { isLogo, ...rest } = props;
  const icon = useSelector(widgetIconSelector);
  const isCircleLauncher = useSelector(isCircleLauncherSelector);
  const classNames = `chat-launcher${isLogo ? ' isLogoOnly' : ''}`;

  // we assume that if the icon is typeof string
  // it is a url
  return typeof icon === 'string' && isCircleLauncher ? (
    <img src={icon} className={classNames} alt="chat launcher" {...rest} />
  ) : (
    cloneElement(icon, {
      className: classNames,
      ...rest,
    })
  );
};

WidgetIcon.propTypes = {
  isLogo: PropTypes.bool,
};

export default WidgetIcon;
