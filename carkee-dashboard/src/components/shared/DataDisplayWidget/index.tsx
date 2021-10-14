import { FC } from 'react';
import { Card, Avatar, AvatarProps } from 'antd';

// Components
import Flex from '../Flex';
import CustomStatistic from '../CustomStatistic';

interface DataDisplayWidgetProps {
  size?: string;
  value: any;
  title: any;
  icon: AvatarProps['icon'];
  color: string;
  avatarSize?: AvatarProps['size'];
  vertical?: boolean;
}

const DataDisplayWidget: FC<DataDisplayWidgetProps> = ({
  size,
  value,
  title,
  icon,
  color,
  avatarSize = 50,
  vertical = false,
}) => {
  return (
    <Card>
      <Flex alignItems='center' flexDirection={vertical ? 'column' : 'row'}>
        <Avatar
          size={avatarSize}
          shape='square'
          icon={icon}
          className={`ant-avatar-${color}`}
        />
        <div className={vertical ? 'mt-3 text-center' : 'ml-3'}>
          <CustomStatistic size={size} value={value} title={title} />
        </div>
      </Flex>
    </Card>
  );
};

export default DataDisplayWidget;
