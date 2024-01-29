import { MOBILE_USER_AGENT_REGEX } from 'src/constants';
import { WIDTH } from 'src/constants/viewport';
import { useMemo } from 'react';

const useScreens = () => {
  // selectors

  const isMobile = useMemo(() => {
    const parsedMobileWidth = Number(WIDTH.mobile.replace('px', ''));
    const isMobileScreen = window.innerWidth <= parsedMobileWidth;
    return MOBILE_USER_AGENT_REGEX.test(navigator.userAgent) || isMobileScreen;
  }, [navigator?.userAgent, window?.innerWidth]);

  const isTablet = useMemo(() => {
    const parsedMobileWidth = Number(WIDTH.mobile.replace('px', ''));
    const parsedTabletWidth = Number(WIDTH.tablet.replace('px', ''));
    const tablet = window.innerWidth <= parsedTabletWidth;
    const isBiggerThanMobile = window.innerWidth > parsedMobileWidth;
    const isIpad = navigator.userAgent.includes('iPad');

    return isIpad || (tablet && isMobile && isBiggerThanMobile);
  }, [isMobile]);

  return {
    isTablet,
    isMobile,
  };
};

export default useScreens;
