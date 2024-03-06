import { useContext } from 'react';
import { Dropdown } from 'antd';
import {
  ArrowsAltOutlined,
  ClearOutlined,
  ColumnHeightOutlined,
  EllipsisOutlined,
  ExpandOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';

import { Context } from 'src/store/store';
import {
  CLEAR_HISTORY,
  RESTORE_WIDGET_HEIGHT,
  RESTORE_WIDGET_WIDTH,
  SET_WIDGET_TO_FULLSCREEN,
  SET_WIDGET_TO_FULL_HEIGHT,
  SET_WIDGET_WIDTH_TO_HALF_FULLSCREEN,
} from 'src/store/action';
import useSelector from 'src/store/useSelector';
import { isFullHeightSelector, isFullscreenSelector, isWidthHalfFullscreenSelector } from 'src/store/selectors/ui';
import useScreens from '../hooks/useScreens';

const ChatHeaderMenu = () => {
  const [, dispatch] = useContext(Context);
  const { isMobile, isTablet } = useScreens();

  const isFullHeight = useSelector(isFullHeightSelector);
  const isFullscreen = useSelector(isFullscreenSelector);
  const isWidgetHalfFullscreen = useSelector(isWidthHalfFullscreenSelector);

  const handleMenuItemClicked = (e) => {
    const key = e.key;
    switch (key) {
      case 'clear':
        dispatch({ type: CLEAR_HISTORY });
        break;

      case 'fullheight': {
        if (isFullHeight) {
          dispatch({ type: RESTORE_WIDGET_HEIGHT });
        } else {
          dispatch({ type: SET_WIDGET_TO_FULL_HEIGHT });
        }
        break;
      }

      case 'fullscreen':
        if (isFullscreen) {
          dispatch({ type: RESTORE_WIDGET_WIDTH });
        } else {
          dispatch({ type: SET_WIDGET_TO_FULLSCREEN });
        }
        break;

      case 'halfscreen':
        if (isWidgetHalfFullscreen) {
          dispatch({ type: RESTORE_WIDGET_WIDTH });
        } else {
          dispatch({ type: SET_WIDGET_WIDTH_TO_HALF_FULLSCREEN });
        }
        break;

      default:
        break;
    }
  };

  const menu = {
    items: [
      {
        key: 'clear',
        label: 'Clear Chat',
        icon: <ClearOutlined />,
      },
      {
        key: 'display',
        label: 'Chat display',
        icon: <ArrowsAltOutlined />,
        disabled: isMobile && !isTablet,
        hidden: isMobile && !isTablet,
        children: [
          {
            label: isFullHeight ? 'Default height' : 'Full height',
            key: 'fullheight',
            icon: <ColumnHeightOutlined />,
            disabled: isFullscreen || isWidgetHalfFullscreen,
            hidden: isMobile || isTablet,
          },
          {
            label: isWidgetHalfFullscreen ? 'Default width' : 'Half fullscreen',
            key: 'halfscreen',
            icon: <ExpandOutlined />,
            hidden: isMobile,
          },
          {
            label: isFullscreen ? 'Default width' : 'Fullscreen',
            key: 'fullscreen',
            icon: isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />,
          },
        ],
      },
    ],
    onClick: handleMenuItemClicked,
  };

  return (
    <Dropdown menu={menu}>
      <EllipsisOutlined />
    </Dropdown>
  );
};

export default ChatHeaderMenu;
