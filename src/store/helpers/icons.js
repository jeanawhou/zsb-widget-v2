// helpers related to reducer

import { ICON_OPTIONS } from 'src/constants';
import { cssVariables } from 'src/styles/variables';

export const getIconColor = (icon, widgetThemeColor, isChatWidget, iconColor) => {
  if (ICON_OPTIONS.includes(icon)) {
    if (!isChatWidget) {
      return iconColor || widgetThemeColor || cssVariables.zsbCyan;
    }
    return iconColor || cssVariables.defaultIconColor;
  }
  // user's custom icon, so no color.
  return icon ? 'none' : cssVariables.defaultIconColor;
};
