import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { DownloadOutlined } from '@ant-design/icons';
import EchartLine from '@/base-ui/echart-line';
import { EchartLineRef } from '@/base-ui/echart-line/type';
import { IDays } from '@/store/modules/data/type';
import { TrendWrapper } from './style';

interface IProps {
  children?: ReactNode;
  data: { [key: string]: number[] };
  axisX: string[];
  allZero: boolean;
  downloadName: string;
  currentDays: IDays;
  updatedDays: (name: IDays) => void;
}

const Trend: FC<IProps> = ({
  data,
  axisX,
  allZero,
  downloadName,
  currentDays,
  updatedDays
}) => {
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const echartContainerRef = useRef<HTMLDivElement>(null);
  const echartRef = useRef<EchartLineRef>(null);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const buttons: { text: string; value: IDays }[] = useMemo(
    () => [
      { text: '最近7天', value: '7days' },
      { text: '最近14天', value: '14days' },
      { text: '最近30天', value: '30days' }
    ],
    []
  );
  useEffect(() => {
    if (echartContainerRef.current) {
      setShouldRender(true);
    }
  }, [echartContainerRef.current]);
  const onClick = (filename: string) => {
    echartRef.current?.setDownloadName(filename);
  };
  const handleSelectedSeries = (selected: string[]) => {
    setSelectedSeries(selected);
  };
  return (
    <TrendWrapper>
      <div className="top">
        <div className="left">
          {buttons.map((button) => (
            <button
              className={currentDays === button.value ? 'active' : ''}
              onClick={() => updatedDays(button.value)}
              key={button.text}
            >
              {button.text}
            </button>
          ))}
        </div>
        <a className="right" onClick={() => onClick(downloadName)}>
          导出数据
          <DownloadOutlined size={14} style={{ marginLeft: '6px' }} />
        </a>
      </div>
      <div>
        <div ref={echartContainerRef} className="chart-content" />
        {shouldRender && (
          <EchartLine
            ref={echartRef}
            dates={axisX}
            series={data}
            isGraphic={allZero}
            echartEle={echartContainerRef.current!}
            onSelect={handleSelectedSeries}
            selectedSeries={selectedSeries}
          />
        )}
      </div>
    </TrendWrapper>
  );
};

export default memo(Trend);
