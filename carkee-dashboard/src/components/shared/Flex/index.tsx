import { FC, CSSProperties } from 'react';

interface FlexProps {
  className?: string;
  alignItems?: CSSProperties['alignItems'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  mobileFlex?: boolean;
}

const Flex: FC<FlexProps> = ({
  children,
  className = '',
  alignItems,
  justifyContent,
  mobileFlex = true,
  flexDirection = 'row',
}) => {
  const getFlexResponsive = () => (mobileFlex ? 'd-flex' : 'd-md-flex');

  return (
    <div
      className={`${getFlexResponsive()} ${className} ${
        flexDirection ? 'flex-' + flexDirection : ''
      } ${alignItems ? 'align-items-' + alignItems : ''} ${
        justifyContent ? 'justify-content-' + justifyContent : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Flex;
