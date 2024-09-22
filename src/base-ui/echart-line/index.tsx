import React, { memo, useEffect, useMemo, useRef } from 'react';
import type { FC, ReactNode } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface IProps {
  children?: ReactNode;
  dates: string[];
  series: { [key: string]: number[] };
  isGraphic: boolean;
  downloadName: string;
}

const EchartLine: FC<IProps> = ({
  dates,
  series,
  isGraphic,
  downloadName = '分析报告'
}) => {
  const chartRef = useRef<ReactECharts>(null);
  const option: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        top: 'bottom',
        data: Object.keys(series),
        itemGap: 16,
        itemWidth: 16,
        itemHeight: 16,
        icon: 'path://M2,2 L18,2 L18,18 L2,18 L2,2 M5,10 L9,14 L15,6',
        textStyle: {
          color: '#000'
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '20%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: '下载图表',
            name: downloadName
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: !isGraphic
        }
      },
      series: Object.keys(series).map((key) => ({
        name: key,
        type: 'line',
        stack: '总量',
        data: series[key],
        smooth: true,
        animationDuration: 2000
      })),
      graphic: isGraphic
        ? {
            type: 'text',
            left: 'center',
            top: 'middle',
            cursor: 'text',
            style: {
              text: '请继续加油创作~~',
              fontSize: 24,
              fontWeight: 'bold',
              fill: '#8a919f'
            }
          }
        : undefined
    };
  }, [dates, series, isGraphic, downloadName]);
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().setOption(option, true);
    }
  }, [option]);
  return <ReactECharts ref={chartRef} option={option} />;
};

export default memo(EchartLine);
