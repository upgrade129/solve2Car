import { FC } from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import Logo from './Logo';

import { ArrowLeftOutlined } from '@ant-design/icons';

// Constants
import { NAV_TYPE_SIDE } from '@/constants/theme';

// Redux
import { onMobileNavToggle } from '@/redux/actions/theme';

// Components
import MenuContent from './MenuContent';
import Flex from '@/components/shared/Flex';

interface MobileNavProps {
  sideNavTheme?: any;
  mobileNav?: any;
  onMobileNavToggle?: any;
  routeInfo?: any;
  hideGroupTitle?: any;
  localization?: boolean;
}

export const MobileNav: FC<MobileNavProps> = ({
  sideNavTheme,
  mobileNav,
  onMobileNavToggle,
  routeInfo,
  hideGroupTitle,
  localization = true,
}) => {
  const props = { sideNavTheme, routeInfo, hideGroupTitle, localization };

  const onClose = () => {
    onMobileNavToggle(false);
  };

  return (
    <Drawer
      placement='left'
      closable={false}
      onClose={onClose}
      visible={mobileNav}
      bodyStyle={{ padding: 5 }}
    >
      <Flex flexDirection='column' className='h-100'>
        <Flex justifyContent='between' alignItems='center'>
          <Logo mobileLogo={true} />
          <div className='nav-close' onClick={() => onClose()}>
            <ArrowLeftOutlined />
          </div>
        </Flex>
        <div className='mobile-nav-menu'>
          <Scrollbars autoHide>
            <MenuContent type={NAV_TYPE_SIDE} {...props} />
          </Scrollbars>
        </div>
      </Flex>
    </Drawer>
  );
};

const mapStateToProps = ({ theme }: any) => {
  const { navCollapsed, sideNavTheme, mobileNav } = theme;
  return { navCollapsed, sideNavTheme, mobileNav };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MobileNav);
