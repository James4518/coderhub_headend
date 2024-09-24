import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import { ECharts, EChartsOption, init } from 'echarts';
import * as XLSX from 'xlsx';
import { EchartLineRef, IProps } from './type';

const EchartLine = forwardRef<EchartLineRef, IProps>(
  ({ dates, series, isGraphic, echartEle, onSelect }, ref) => {
    const instanceRef = useRef<ECharts | null>(null);
    const [selectedSeries, setSelectedSeries] = useState<string[]>([
      Object.keys(series)[0]
    ]);
    const graphicOption = useMemo(() => {
      if (selectedSeries.length === 0) {
        return {
          type: 'text',
          left: 'center',
          top: 'middle',
          cursor: 'text',
          style: {
            text: '请选择数据~~',
            fontSize: 24,
            fontWeight: 'bold',
            fill: '#8a919f'
          }
        };
      } else if (isGraphic === true) {
        return {
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
        };
      }
      return undefined;
    }, [selectedSeries, isGraphic]);
    const option: EChartsOption = useMemo(() => {
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 'bottom',
          data: Object.keys(series),
          selected: Object.keys(series).reduce(
            (acc, key) => {
              acc[key] = selectedSeries.includes(key);
              return acc;
            },
            {} as { [key: string]: boolean }
          ),
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
        graphic: graphicOption
      };
    }, [dates, series, selectedSeries, graphicOption]);
    useEffect(() => {
      if (echartEle && !instanceRef.current) {
        const chartInstance = init(echartEle);
        instanceRef.current = chartInstance;
        chartInstance.setOption(option, true);
        const handleLegendSelectChanged = (params: {
          type: 'legendselectchanged';
          name: string;
          selected: { [name: string]: boolean };
        }) => {
          const selected = Object.keys(params.selected).filter(
            (key) => params.selected[key]
          );
          setSelectedSeries(selected);
          onSelect && onSelect(selected);
        };
        chartInstance.on('legendselectchanged', handleLegendSelectChanged);
        return () => {
          chartInstance.off('legendselectchanged', handleLegendSelectChanged);
          chartInstance.dispose();
        };
      }
    }, [echartEle]);
    useEffect(() => {
      if (instanceRef.current) {
        instanceRef.current.setOption(option, true);
      }
    }, [option]);
    const convertDataToExcel = (filename: string) => {
      if (!dates.length || !Object.keys(series).length) {
        return;
      }
      const header = ['Date', ...Object.keys(series)];
      const data = dates.map((date, index) => [
        date,
        ...Object.keys(series).map((key) => series[key][index] ?? null)
      ]);
      const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Chart Data');
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });
      const blob = new Blob([excelBuffer], {
        type: 'application/octet-stream'
      });
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = `${filename}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    useImperativeHandle(ref, () => ({
      setDownloadName: (filename: string) => {
        if (instanceRef.current) {
          convertDataToExcel(filename);
        }
      }
    }));
    return null;
  }
);

export default memo(EchartLine);
