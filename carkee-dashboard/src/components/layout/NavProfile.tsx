import { FC } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';

// Redux
import { logout } from '@/redux/actions/auth';
import { useAuth } from '@/hooks';

// Components
// import Icon from '@/components/util/Icon';

const menuItem = [
  {
    title: 'Edit Profile',
    icon: EditOutlined,
    path: '/',
  },

  {
    title: 'Account Setting',
    icon: SettingOutlined,
    path: '/',
  },
  {
    title: 'Billing',
    icon: ShopOutlined,
    path: '/',
  },
  {
    title: 'Help Center',
    icon: QuestionCircleOutlined,
    path: '/',
  },
];

const NavProfile: FC<{}> = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  const profileImg = '/img/avatars/thumb-1.jpg';
  const profileMenu = (
    <div className='nav-profile nav-dropdown'>
      <div className='nav-profile-header'>
        <div className='d-flex'>
          <Avatar size={45} src={profileImg} />
          <div className='pl-3'>
            <h4 className='mb-0'>
              {auth ? auth.currentUser?.userDetails[0]?.fullName : 'username'}
              {/* {auth.token} */}
            </h4>
            <span className='text-muted'>Frontend Developer</span>
          </div>
        </div>
      </div>
      <div className='nav-profile-body'>
        <Menu>
          {/* {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className='mr-3' type={el.icon} />
                  <span className='font-weight-normal'>{el.title}</span>
                </a>
              </Menu.Item>
            );
          })} */}
          <Menu.Item
            key={menuItem.length + 1}
            onClick={() => dispatch(logout())}
          >
            <span>
              <LogoutOutlined className='mr-3' />
              <span className='font-weight-normal'>Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement='bottomRight' overlay={profileMenu} trigger={['click']}>
      <Menu className='d-flex align-item-center' mode='horizontal'>
        <Menu.Item>
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default NavProfile;
