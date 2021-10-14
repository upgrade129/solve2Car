import { FC } from 'react';
import { Card } from 'antd';
import { ApexOptions } from 'apexcharts';
import ApexChart, { Props as ApexChartProps } from 'react-apexcharts';

// Constants
import { apexPieChartDefaultOption } from '@/constants/chart';

const defaultOption = apexPieChartDefaultOption;

interface DonutChartWidgetProps extends ApexChartProps {}

const DonutChartWidget: FC<DonutChartWidgetProps> = ({
  series = [],
  customOptions,
  labels = [],
  width = '100%',
  height = 250,
  title = '',
  extra,
  bodyClass,
}) => {
  let options: ApexOptions = {
    ...defaultOption,
    labels,
    plotOptions: {
      pie: {
        donut: {
          labels: {
            total: title,
            show: !!title,
          },
        },
      },
    },
  };

  if (customOptions) {
    options = {
      ...options,
      ...customOptions,
    };
  }

  return (
    <Card>
      <div className={`text-center ${bodyClass}`}>
        <ApexChart
          type='donut'
          options={options}
          series={series}
          width={width}
          height={height}
        />
        {extra}
      </div>
    </Card>
  );
};

export default DonutChartWidget;
