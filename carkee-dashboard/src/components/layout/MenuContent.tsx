import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Grid } from 'antd';
import { connect } from 'react-redux';

// Constants
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from '@/constants/theme';

// Configs
import navigationConfig from '@/configs/nav';

// Redux
import { onMobileNavToggle } from '@/redux/actions/theme';

// Components
import IntlMessage from '../util/IntlMessage';
import Icon from '../util/Icon';

// Utils
import utils from '@/utils';

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const setLocale = (isLocaleOn: any, localeKey: any) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key: any) => {
  let keyList = [];
  let keyString = '';
  if (key) {
    const arr = key.split('-');
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

interface SideNavContentProps {
  sideNavTheme: any;
  routeInfo: any;
  hideGroupTitle: any;
  localization: any;
  onMobileNavToggle: any;
}

const SideNavContent: FC<SideNavContentProps> = ({
  sideNavTheme,
  routeInfo,
  hideGroupTitle,
  localization,
  onMobileNavToggle,
}) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');
  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false);
    }
  };
  return (
    <Menu
      theme={sideNavTheme === SIDE_NAV_LIGHT ? 'light' : 'dark'}
      mode='inline'
      style={{ height: '100%', borderRight: 0 }}
      defaultSelectedKeys={[routeInfo?.key]}
      defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
      className={hideGroupTitle ? 'hide-group-title' : ''}
    >
      {navigationConfig.map((menu) =>
        menu.submenu.length > 0 ? (
          <Menu.ItemGroup
            key={menu.key}
            title={setLocale(localization, menu.title)}
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  icon={
                    subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon} />
                    ) : null
                  }
                  key={subMenuFirst.key}
                  title={setLocale(localization, subMenuFirst.title)}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      {subMenuSecond.icon ? (
                        <Icon type={subMenuSecond?.icon} />
                      ) : null}
                      <span>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                      <Link
                        onClick={() => closeMobileNav()}
                        to={subMenuSecond.path}
                      />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? <Icon type={subMenuFirst.icon} /> : null}
                  <span>{setLocale(localization, subMenuFirst.title)}</span>
                  <Link
                    onClick={() => closeMobileNav()}
                    to={subMenuFirst.path}
                  />
                </Menu.Item>
              ),
            )}
          </Menu.ItemGroup>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? (
              <Link onClick={() => closeMobileNav()} to={menu.path} />
            ) : null}
          </Menu.Item>
        ),
      )}
    </Menu>
  );
};

interface TopNavContentProps {
  topNavColor: string;
  localization: any;
}

const TopNavContent: FC<TopNavContentProps> = ({
  topNavColor,
  localization,
}) => {
  return (
    <Menu mode='horizontal' style={{ backgroundColor: topNavColor }}>
      {navigationConfig.map((menu) =>
        menu.submenu.length > 0 ? (
          <SubMenu
            key={menu.key}
            popupClassName='top-nav-menu'
            title={
              <span>
                {menu.icon ? <Icon type={menu?.icon} /> : null}
                <span>{setLocale(localization, menu.title)}</span>
              </span>
            }
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  key={subMenuFirst.key}
                  icon={
                    subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon} />
                    ) : null
                  }
                  title={setLocale(localization, subMenuFirst.title)}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      <span>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                      <Link to={subMenuSecond.path} />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? (
                    <Icon type={subMenuFirst?.icon} />
                  ) : null}
                  <span>{setLocale(localization, subMenuFirst.title)}</span>
                  <Link to={subMenuFirst.path} />
                </Menu.Item>
              ),
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? <Link to={menu.path} /> : null}
          </Menu.Item>
        ),
      )}
    </Menu>
  );
};

const MenuContent = (props: any) => {
  return props.type === NAV_TYPE_SIDE ? (
    <SideNavContent {...props} />
  ) : (
    <TopNavContent {...props} />
  );
};

const mapStateToProps = ({ theme }: any) => {
  const { sideNavTheme, topNavColor } = theme;
  return { sideNavTheme, topNavColor };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MenuContent);
