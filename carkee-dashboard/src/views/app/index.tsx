import { FC, lazy, Suspense, memo } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { Layout, Grid } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';

// Constants
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_SIDE,
  NAV_TYPE_TOP,
  DIR_RTL,
  DIR_LTR,
} from '@/constants/theme';

// Configs
import navigationConfig from '@/configs/nav';

// Utils
import utils from '@/utils';

// Custom Hooks
import { useTheme } from '@/hooks';

// Components
import Loading from '@/components/shared/Loading';
import {
  SideNav,
  TopNav,
  MobileNav,
  HeaderNav,
  PageHeader,
  Footer,
} from '@/components/layout';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AppView: FC<RouteComponentProps> = ({ location }) => {
  const { navCollapsed, navType, direction } = useTheme();
  const currentRouteInfo: any = utils.getRouteInfo(
    navigationConfig,
    location.pathname,
  );
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('lg');
  const isNavSide = navType === NAV_TYPE_SIDE;
  const isNavTop = navType === NAV_TYPE_TOP;
  const getLayoutGutter = () => {
    if (isNavTop || isMobile) {
      return 0;
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH;
  };

  const { status } = useThemeSwitcher();

  if (status === 'loading') {
    return <Loading cover='page' />;
  }

  const getLayoutDirectionGutter = () => {
    if (direction === DIR_LTR) {
      return { paddingLeft: getLayoutGutter() };
    }
    if (direction === DIR_RTL) {
      return { paddingRight: getLayoutGutter() };
    }
    return { paddingLeft: getLayoutGutter() };
  };

  return (
    <Layout>
      <HeaderNav isMobile={isMobile} />
      {isNavTop && !isMobile ? <TopNav routeInfo={currentRouteInfo} /> : null}
      <Layout className='app-container'>
        {isNavSide && !isMobile ? (
          <SideNav routeInfo={currentRouteInfo} />
        ) : null}
        <Layout className='app-layout' style={getLayoutDirectionGutter()}>
          <div className={`app-content ${isNavTop ? 'layout-top-nav' : ''}`}>
            {currentRouteInfo && (
              <PageHeader
                display={currentRouteInfo.breadcrumb}
                title={currentRouteInfo.title}
              />
            )}
            <Content>
              <Suspense fallback={<Loading cover='content' />}>
                <Switch>
                  <Route
                    path={`/`}
                    exact
                    component={lazy(() => import('./HomeView'))}
                  />
                  <Route
                    path={`/logs`}
                    component={lazy(() => import('./LogView'))}
                  />
                  <Route
                    path={`/ads`}
                    component={lazy(() => import('./AdView'))}
                  />
                  <Route
                    path={`/payments`}
                    component={lazy(() => import('./PaymentView'))}
                  />
                  <Route
                    path={`/accounts`}
                    component={lazy(() => import('./AccountView'))}
                  />
                  <Route
                    path={`/members`}
                    component={lazy(() => import('./MemberView'))}
                  />
                  <Route
                    path={`/vendors`}
                    component={lazy(() => import('./VendorView'))}
                  />
                  <Route
                    path={`/sponsors`}
                    component={lazy(() => import('./SponsorView'))}
                  />
                  <Route
                    path={`/listings`}
                    component={lazy(() => import('./ListingView'))}
                  />
                  <Route
                    path={`/news`}
                    component={lazy(() => import('./NewsView'))}
                  />
                  <Route
                    path={`/events`}
                    component={lazy(() => import('./EventView'))}
                  />
                  <Route
                    path={`/banners`}
                    component={lazy(() => import('./BannerView'))}
                  />
                  <Route
                    path={`/clubs`}
                    component={lazy(() => import('./ClubView'))}
                  />
                  <Route
                    path={`/admins`}
                    component={lazy(() => import('./AdminView'))}
                  />
                </Switch>
              </Suspense>
            </Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
      {isMobile && <MobileNav />}
    </Layout>
  );
};

export default memo(AppView);
