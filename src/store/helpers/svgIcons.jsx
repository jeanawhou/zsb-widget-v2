import { icon1, icon3, icon2, icon4, defaultIcon } from 'src/svg/Icons';

export const extractUserIcon = (icon, color) => {
  switch (icon) {
    case 'icon1': {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2.9 24 30" width={45} height={48}>
          {icon1(color)}
        </svg>
      );
    }

    case 'icon2': {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2.2 -1.8 28 25" width={45} height={48}>
          {icon2(color)}
        </svg>
      );
    }

    case 'icon3': {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 1 35 24" width={45} height={48}>
          {icon3(color)}
        </svg>
      );
    }

    case 'icon4': {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4.5 -.5 33 30" width={45} height={48}>
          {icon4(color)}
        </svg>
      );
    }
    case 'default': {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 6 45 20" width={40} height={40}>
          {defaultIcon(color)}
        </svg>
      );
    }
    default:
      return icon;
  }
};
