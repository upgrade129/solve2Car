import { FC, createElement } from 'react';

interface IconProps {
  className?: string;
  type?: any;
}

const Icon: FC<IconProps> = ({ className, type }) => {
  return createElement(type, { className: className });
};

export default Icon;
