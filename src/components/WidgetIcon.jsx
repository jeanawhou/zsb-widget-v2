import { cloneElement } from 'react'
import PropTypes from 'prop-types';
import useSelector from 'src/store/useSelector';
import { widgetIconSelector } from 'src/store/selectors/ui';

const WidgetIcon = (props) => {
  const { isLogo, ...rest} = props
  const icon = useSelector(widgetIconSelector)
  const classNames = `chat-launcher${isLogo ? ' isLogoOnly' : ''}`;

  return typeof icon === 'string' ? (
    <img src={icon} className={classNames} alt="chat launcher" {...rest} />
  ) : (
    cloneElement(icon, {
      className: classNames,
      ...rest,
    })
  );
}

WidgetIcon.propTypes = {
  isLogo: PropTypes.bool
}

export default WidgetIcon