import { FC } from 'react';
import { connect } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

// Components
import SearchInput from './SearchInput';

// Utils
import utils from '@/utils';

interface NavSearchProps {
  active: boolean;
  close: any;
  headerNavColor: string;
}

const NavSearch: FC<NavSearchProps> = ({ active, close, headerNavColor }) => {
  const mode = utils.getColorContrast(headerNavColor);

  return (
    <div
      className={`nav-search ${active ? 'nav-search-active' : ''} ${mode}`}
      style={{ backgroundColor: headerNavColor }}
    >
      <div className='d-flex align-items-center w-100'>
        <SearchInput close={close} active={active} />
      </div>
      <div className='nav-close' onClick={close}>
        <CloseOutlined />
      </div>
    </div>
  );
};

const mapStateToProps = ({ theme }: any) => {
  const { headerNavColor } = theme;
  return { headerNavColor };
};

export default connect(mapStateToProps, {})(NavSearch);
