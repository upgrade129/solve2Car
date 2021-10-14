import { FC } from 'react';

interface ValueProps {
  size: string;
  value: any;
}

const Value: FC<ValueProps> = ({ size, value }) => {
  switch (size) {
    case 'lg':
      return <h1 className='mb-0 font-weight-bold'>{value}</h1>;
    case 'md':
      return <h2 className='mb-0 font-weight-bold'>{value}</h2>;
    case 'sm':
      return <h3 className='mb-0 font-weight-bold'>{value}</h3>;
    default:
      return <h3 className='mb-0 font-weight-bold'>{value}</h3>;
  }
};

interface CustomStatisticProps {
  size?: string;
  value: any;
  title: any;
}

const CustomStatistic: FC<CustomStatisticProps> = ({
  size = 'md',
  value,
  title,
}) => {
  return (
    <div>
      <Value value={value} size={size} />
      <p className='mb-0 text-muted'>{title}</p>
    </div>
  );
};

export default CustomStatistic;
