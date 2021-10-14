import { FC } from 'react';
import Frame from 'react-frame-component';

interface DemoFrameProps {
  className: string;
  height: any;
  children: any;
}

const DemoFrame: FC<DemoFrameProps> = ({ className, height, children }) => {
  return (
    <Frame
      style={{ height: `${height ? height : '200px'}` }}
      head={
        <link type='text/css' rel='stylesheet' href='/css/light-theme.css' />
      }
    >
      <div className={className}>{children}</div>
    </Frame>
  );
};

export default DemoFrame;
