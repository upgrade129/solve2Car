import { FC, ElementType } from 'react';
import { Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface StatisticWidgetProps {
  title: string | JSX.Element;
  value: string;
  subtitle: string;
  status: number;
  prefix?: ElementType;
}

const StatisticWidget: FC<StatisticWidgetProps> = ({
  title,
  value,
  status,
  subtitle,
  prefix,
}) => {
  return (
    <Card>
      {title && <h4 className='mb-0'>{title}</h4>}
      <div className={`${prefix ? 'd-flex' : ''} ${title ? 'mt-3' : ''}`}>
        {prefix ? <div className='mr-2'>{prefix}</div> : null}
        <div>
          <div className='d-flex align-items-center'>
            <h1 className='mb-0 font-weight-bold'>{value}</h1>
            {status ? (
              <span
                className={`font-size-md font-weight-bold ml-3 ${
                  status !== 0 && status > 0 ? 'text-success' : 'text-danger'
                }`}
              >
                {status}
                {status !== 0 && status > 0 ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                )}
              </span>
            ) : null}
          </div>
          {subtitle && <div className='text-gray-light mt-1'>{subtitle}</div>}
        </div>
      </div>
    </Card>
  );
};

export default StatisticWidget;
