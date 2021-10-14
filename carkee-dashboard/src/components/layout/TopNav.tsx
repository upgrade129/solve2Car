import { FC } from 'react';
import { connect } from 'react-redux';

// Types
import { NavMenu } from '@/types/nav';

// Constants
import { NAV_TYPE_TOP } from '@/constants/theme';

// Components
import MenuContent from './MenuContent';

// Utils
import utils from '@/utils';

interface TopNavProps {
  routeInfo?: NavMenu;
  topNavColor?: string;
  localization?: boolean;
}

const TopNav: FC<TopNavProps> = ({
  topNavColor = 'light',
  localization = true,
}) => {
  const props = { topNavColor, localization };
  return (
    <div
      className={`top-nav ${utils.getColorContrast(topNavColor)}`}
      style={{ backgroundColor: topNavColor }}
    >
      <div className='top-nav-wrapper'>
        <MenuContent type={NAV_TYPE_TOP} {...props} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ theme }: any) => {
  const { topNavColor } = theme;
  return { topNavColor };
};

export default connect(mapStateToProps)(TopNav);
