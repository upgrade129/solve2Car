import { FC } from 'react';
import { Dropdown, DropDownProps, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

interface EllipsisDropdownProps {
  menu?: DropDownProps['overlay'];
  placement?: DropDownProps['placement'];
  trigger?: DropDownProps['trigger'];
}

const EllipsisDropdown: FC<EllipsisDropdownProps> = ({
  menu = <Menu />,
  placement = 'bottomRight',
  trigger = ['click'],
}) => {
  return (
    <Dropdown overlay={menu} placement={placement} trigger={trigger}>
      <div className='ellipsis-dropdown'>
        <EllipsisOutlined />
      </div>
    </Dropdown>
  );
};

export default EllipsisDropdown;
