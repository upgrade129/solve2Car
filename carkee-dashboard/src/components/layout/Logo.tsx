import { FC } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'antd';

// Constants
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_TOP,
} from '@/constants/theme';

// Configs
import { APP_NAME } from '@/configs/app';

// Utils
import utils from '@/utils';

interface LogoProps {
  navType?: string;
  navCollapsed?: boolean;
  logoType?: string;
  mobileLogo?: any;
}

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (
  { navCollapsed, navType, mobileLogo }: Partial<LogoProps>,
  isMobile: boolean,
) => {
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  if (isMobile && !mobileLogo) {
    return 0;
  }
  if (isNavTop) {
    return 'auto';
  }
  if (navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
  } else {
    return `${SIDE_NAV_WIDTH}px`;
  }
};

const getLogo = ({ navCollapsed, logoType }: Partial<LogoProps>): string => {
  if (logoType === 'light') {
    if (navCollapsed) {
      return '/img/logo-sm-white.png';
    }
    return '/img/logo-white.png';
  }

  if (navCollapsed) {
    return '/img/logo-sm.png';
  }
  return '/img/logo.png';
};

const getLogoDisplay = (isMobile: boolean, mobileLogo: any): string => {
  if (isMobile && !mobileLogo) {
    return 'd-none';
  } else {
    return 'logo';
  }
};

export const Logo: FC<LogoProps> = (props) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg');
  return (
    <div
      className={getLogoDisplay(isMobile, props.mobileLogo)}
      style={{ width: `${getLogoWidthGutter(props, isMobile)}` }}
    >
      <img src={getLogo(props)} alt={`${APP_NAME} logo`} />
    </div>
  );
};

const mapStateToProps = ({ theme }: any) => {
  const { navCollapsed, navType } = theme;
  return { navCollapsed, navType };
};

export default connect(mapStateToProps)(Logo);
