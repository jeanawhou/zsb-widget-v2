import { useContext } from 'react';
import { Dropdown } from 'antd';
import { ClearOutlined, EllipsisOutlined } from '@ant-design/icons';

import { Context } from 'src/store/store';
import { CLEAR_CHAT_MESSAGES } from 'src/store/action';

const ChatHeaderMenu = () => {
  const [, dispatch] = useContext(Context);

  const handleMenuItemClicked = (e) => {
    const key = e.key;
    switch (key) {
      case '1':
        dispatch({ type: CLEAR_CHAT_MESSAGES });
        break;

      default:
        break;
    }
  };

  const menu = {
    items: [
      {
        key: '1',
        label: 'Clear Chat',
        icon: <ClearOutlined />,
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
