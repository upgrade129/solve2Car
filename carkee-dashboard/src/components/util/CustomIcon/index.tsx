import { FC, forwardRef } from 'react';
import Icon from '@ant-design/icons';

interface CustomIconProps {
  className?: string;
  svg: any;
}

const CustomIcon: FC<CustomIconProps> = forwardRef(({ className, svg }, _) => (
  <Icon component={svg} className={className} />
));

export default CustomIcon;
