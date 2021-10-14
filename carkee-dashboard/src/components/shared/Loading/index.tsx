import { FC } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

interface LoadingProps {
  align?: string;
  cover?: string;
}

const Loading: FC<LoadingProps> = ({ align = 'center', cover = 'inline' }) => {
  return (
    <div className={`loading text-${align} cover-${cover}`}>
      <Spin indicator={Icon} />
    </div>
  );
};

export default Loading;
