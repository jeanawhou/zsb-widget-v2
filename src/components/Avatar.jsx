import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import useSelector from 'src/store/useSelector';
import { isCircleLauncherSelector, avatarSelector } from 'src/store/selectors/ui';

const Avatar = (props) => {
  const { isLogo, source, ...rest } = props;
  const icon = useSelector(avatarSelector);
  const isCircleLauncher = useSelector(isCircleLauncherSelector);
  const classNames = `chat-launcher${isLogo ? ' isLogoOnly' : ''}`;
  const avatar = source || icon;

  console.log('types', typeof avatar);

  return avatar ? (
    typeof avatar === 'string' ? (
      avatar.toLowerCase() !== 'none' ? (
        isCircleLauncher ? (
          // we assume that if the avatar is typeof string
          // && !== 'none' it is a url
          <img src={avatar} className={classNames} alt="chat launcher" {...rest} />
        ) : (
          cloneElement(avatar, {
            className: classNames,
            ...rest,
          })
        )
      ) : null
    ) : (
      cloneElement(avatar, {
        className: classNames,
        ...rest,
      })
    )
  ) : null;
};

Avatar.propTypes = {
  isLogo: PropTypes.bool,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default Avatar;
