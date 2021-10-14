import { FC, useRef, useEffect, CSSProperties } from 'react';
import { Card } from 'antd';
import { ApexOptions } from 'apexcharts';
import ApexChart, { Props } from 'react-apexcharts';
import ReactResizeDetector from 'react-resize-detector';

// Constants
import {
  apexLineChartDefaultOption,
  apexBarChartDefaultOption,
  apexAreaChartDefaultOption,
} from '@/constants/chart';
import { DIR_RTL } from '@/constants/theme';

const titleStyle: Partial<CSSProperties> = {
  position: 'absolute',
  zIndex: 1,
};

const extraStyle: Partial<CSSProperties> = {
  position: 'absolute',
  zIndex: 1,
  right: 0,
  top: '-2px',
};

const getChartTypeDefaultOption = (type: Props['type']): ApexOptions => {
  switch (type) {
    case 'line':
      return apexLineChartDefaultOption;
    case 'bar':
      return apexBarChartDefaultOption;
    case 'area':
      return apexAreaChartDefaultOption;
    default:
      return apexLineChartDefaultOption;
  }
};

interface ChartWidgetProps extends Props {}

const ChartWidget: FC<ChartWidgetProps> = ({
  title,
  series = [],
  width = '100%',
  height = 300,
  xAxis,
  customOptions,
  card = true,
  type = 'line',
  extra,
  direction,
  bodyClass,
}) => {
  const extraRef = useRef<any>(null);
  const chartRef = useRef<any>(null);

  let options: ApexOptions = getChartTypeDefaultOption(type);
  const isMobile = window.innerWidth < 768;
  const setLegendOffset = () => {
    if (chartRef.current) {
      const lengend = chartRef.current.querySelectorAll(
        'div.apexcharts-legend',
      )[0];
      lengend.style.marginRight = `${
        isMobile ? 0 : extraRef.current?.offsetWidth
      }px`;
      if (direction === DIR_RTL) {
        lengend.style.right = 'auto';
        lengend.style.left = '0';
      }
      if (isMobile) {
        lengend.style.position = 'relative';
        lengend.style.top = 0;
        lengend.style.justifyContent = 'start';
        lengend.style.padding = 0;
      }
    }
  };

  useEffect(() => {
    setLegendOffset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  options.xaxis!.categories = xAxis;
  if (customOptions) {
    options = { ...options, ...customOptions };
  }

  const onResize = () => {
    setTimeout(() => {
      setLegendOffset();
    }, 600);
  };

  const renderChart = () => (
    <ReactResizeDetector onResize={onResize}>
      <div
        style={direction === DIR_RTL ? { direction: 'ltr' } : {}}
        className='chartRef'
        ref={chartRef}
      >
        <ApexChart
          options={options}
          type={type}
          series={series}
          width={width}
          height={height}
        />
      </div>
    </ReactResizeDetector>
  );

  return (
    <>
      {card ? (
        <Card>
          <div className={`position-relative ${bodyClass}`}>
            {<div style={!isMobile ? titleStyle : {}}>{title}</div> && (
              <h4
                className='font-weight-bold'
                style={!isMobile ? titleStyle : {}}
              >
                {title}
              </h4>
            )}
            {extra && (
              <div ref={extraRef} style={!isMobile ? extraStyle : {}}>
                {extra}
              </div>
            )}
            {renderChart()}
          </div>
        </Card>
      ) : (
        renderChart()
      )}
    </>
  );
};

export default ChartWidget;
