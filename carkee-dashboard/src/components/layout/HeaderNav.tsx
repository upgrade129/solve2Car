import { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from '@ant-design/icons';

// Constants
import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from '@/constants/theme';

// Redux Actions
import { toggleCollapsedNav, onMobileNavToggle } from '@/redux/actions/theme';

// Components
import NavNotification from './NavNotification';
import NavProfile from './NavProfile';
import NavLanguage from './NavLanguage';
import NavPanel from './NavPanel';
import NavSearch from './NavSearch';
import SearchInput from './NavSearch/SearchInput';
import Logo from './Logo';

// Utils
import utils from '@/utils';

const { Header } = Layout;

interface HeaderNavProps {
  navCollapsed?: boolean;
  mobileNav?: boolean;
  navType?: string;
  headerNavColor?: string;
  toggleCollapsedNav?: any;
  onMobileNavToggle?: any;
  isMobile?: boolean;
  currentTheme?: any;
  direction?: string;
}

export const HeaderNav: FC<HeaderNavProps> = ({
  navCollapsed,
  mobileNav,
  navType,
  headerNavColor,
  toggleCollapsedNav,
  onMobileNavToggle,
  isMobile,
  currentTheme,
  direction,
}) => {
  const [searchActive, setSearchActive] = useState(false);

  const onSearchActive = () => {
    setSearchActive(true);
  };

  const onSearchClose = () => {
    setSearchActive(false);
  };

  const onToggle = () => {
    if (!isMobile) {
      toggleCollapsedNav(!navCollapsed);
    } else {
      onMobileNavToggle(!mobileNav);
    }
  };

  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === 'dark' ? '#00000' : '#ffffff',
      );
    }
    return utils.getColorContrast(headerNavColor);
  };
  const navMode = mode();
  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return '0px';
    }
    if (navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };

  useEffect(() => {
    if (!isMobile) {
      onSearchClose();
    }
  });

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: headerNavColor }}
    >
      <div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
        <Logo logoType={navMode} />
        <div className='nav' style={{ width: `calc(100% - ${getNavWidth()})` }}>
          <div className='nav-left'>
            <ul className='ant-menu ant-menu-root ant-menu-horizontal'>
              {isNavTop && !isMobile ? null : (
                <li
                  className='ant-menu-item ant-menu-item-only-child'
                  onClick={() => {
                    onToggle();
                  }}
                >
                  {navCollapsed || isMobile ? (
                    <MenuUnfoldOutlined className='nav-icon' />
                  ) : (
                    <MenuFoldOutlined className='nav-icon' />
                  )}
                </li>
              )}
              {isMobile ? (
                <li
                  className='ant-menu-item ant-menu-item-only-child'
                  onClick={() => {
                    onSearchActive();
                  }}
                >
                  <SearchOutlined />
                </li>
              ) : (
                <li
                  className='ant-menu-item ant-menu-item-only-child'
                  style={{ cursor: 'auto' }}
                >
                  <SearchInput mode={navMode} isMobile={isMobile} />
                </li>
              )}
            </ul>
          </div>
          <div className='nav-right'>
            <NavNotification />
            <NavLanguage />
            <NavProfile />
            <NavPanel direction={direction} />
          </div>
          <NavSearch active={searchActive} close={onSearchClose} />
        </div>
      </div>
    </Header>
  );
};

const mapStateToProps: any = ({ theme }: any) => {
  const {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction,
  } = theme;
  return {
    navCollapsed,
    navType,
    headerNavColor,
    mobileNav,
    currentTheme,
    direction,
  };
};

export default connect(mapStateToProps, {
  toggleCollapsedNav,
  onMobileNavToggle,
})(HeaderNav);
