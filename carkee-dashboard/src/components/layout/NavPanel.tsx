import { FC, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import { connect } from 'react-redux';

// Constants
import { DIR_RTL } from '@/constants/theme';

// Components
import ThemeConfigurator from './ThemeConfigurator';

interface NavPanelProps {
  direction?: string;
}

const NavPanel: FC<NavPanelProps> = ({ direction }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleOpen = (): void => {
    setVisible(true);
  };

  const handleClose = (): void => {
    setVisible(false);
  };

  return (
    <>
      <Menu mode='horizontal'>
        <Menu.Item onClick={handleOpen}>
          <SettingOutlined className='nav-icon mr-0' />
        </Menu.Item>
      </Menu>
      <Drawer
        title='Theme Config'
        placement={direction === DIR_RTL ? 'left' : 'right'}
        width={350}
        onClose={handleClose}
        visible={visible}
      >
        <ThemeConfigurator />
      </Drawer>
    </>
  );
};

const mapStateToProps = ({ theme }: any) => {
  const { locale } = theme;
  return { locale };
};

export default connect(mapStateToProps)(NavPanel);
