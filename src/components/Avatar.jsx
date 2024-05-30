import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import useSelector from 'src/store/useSelector';
import {
  isCircleLauncherSelector,
  headerAvatarSelector,
  responseAvatarSelector,
  launcherAvatarSelector,
} from 'src/store/selectors/ui';
import { isEmpty } from 'lodash';

const Avatar = (props) => {
  const { isLogo, source, isHeader, isChatResponse, ...rest } = props;
  const headerAvatar = useSelector(headerAvatarSelector);
  const responseAvatar = useSelector(responseAvatarSelector);
  const launcherAvatar = useSelector(launcherAvatarSelector);
  const isCircleLauncher = useSelector(isCircleLauncherSelector);
  const classNames = `chat-launcher${isLogo ? ' isLogoOnly' : ''}`;
  const avatar =
    // priority is the `source`
    // then check which avatar position from the prop to render
    typeof source !== 'undefined' ? source : isHeader ? headerAvatar : isChatResponse ? responseAvatar : launcherAvatar;

  return !isEmpty(avatar) ? (
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
      ) : (
        <></>
      )
    ) : (
      cloneElement(avatar, {
        className: classNames,
        ...rest,
      })
    )
  ) : (
    <></>
  );
};

Avatar.propTypes = {
  isLogo: PropTypes.bool,
  isHeader: PropTypes.bool,
  isChatResponse: PropTypes.bool,
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default Avatar;
