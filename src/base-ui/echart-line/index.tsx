import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface IProps {
  children?: ReactNode;
  dates: string[];
  series: { [key: string]: number[] };
  isGraphic: boolean;
  downloadName: string;
  // updateDownloadName: (name: string) => string;
}

const EchartLine: FC<IProps> = ({
  dates,
  series,
  isGraphic,
  downloadName = '分析报告'
}) => {
  // updateDownloadName && setDownloadName(updateDownloadName(downloadName));
  const option: EChartsOption = {
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
      bottom: '10%',
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
      type: 'value'
    },
    series: Object.keys(series).map((key) => ({
      name: key,
      type: 'line',
      stack: '总量',
      data: series[key]
    })),
    graphic: isGraphic
      ? {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: '请继续加油创作~~',
            fontSize: 24,
            fontWeight: 'bold',
            fill: 'blue'
          }
        }
      : []
  };
  return <ReactECharts option={option} />;
};

export default memo(EchartLine);
