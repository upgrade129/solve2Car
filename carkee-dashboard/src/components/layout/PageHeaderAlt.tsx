import {
  FC,
  useRef,
  useEffect,
  useState,
  ReactNode,
  CSSProperties,
} from 'react';
import { connect } from 'react-redux';

// Constants
import { NAV_TYPE_TOP } from '@/constants/theme';

interface PageHeaderAltProps {
  children?: ReactNode;
  background?: string;
  className?: string;
  overlap?: boolean;
  navType?: string;
}

const PageHeaderAlt: FC<PageHeaderAltProps> = ({
  children,
  background,
  className,
  overlap,
  navType,
}) => {
  const [widthOffset, setWidthOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navType === NAV_TYPE_TOP) {
      const windowSize = window.innerWidth;

      if (ref.current) {
        const pageHeaderSize = ref.current.offsetWidth;
        setWidthOffset((windowSize - pageHeaderSize) / 2);
      }
    }
  }, [navType]);

  const getStyle = () => {
    let style: CSSProperties = {
      backgroundImage: background ? `url(${background})` : 'none',
    };
    if (navType === NAV_TYPE_TOP) {
      style.marginRight = -widthOffset;
      style.marginLeft = -widthOffset;
      style.paddingLeft = 0;
      style.paddingRight = 0;
    }
    return style;
  };

  return (
    <div
      ref={ref}
      className={`page-header-alt ${className ? className : ''} ${
        overlap && 'overlap'
      }`}
      style={getStyle()}
    >
      {navType === NAV_TYPE_TOP ? (
        <div className='container'>{children}</div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

const mapStateToProps = ({ theme }: any) => {
  const { navType } = theme;
  return { navType };
};

export default connect(mapStateToProps, {})(PageHeaderAlt);
