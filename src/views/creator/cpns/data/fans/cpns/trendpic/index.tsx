import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import Trend from '@/compoments/trend';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { fetchDaysAction } from '@/store/modules/data';
import { IDays } from '@/store/modules/data/type';
import { IFansData } from './type';

interface IProps {
  children?: ReactNode;
}

const DataFansTrendPic: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const [currentDays, setCurrentDays] = useState<IDays>('7days');
  const data = useAppSelector((state) => state.data, useAppShallowEqual);
  const currentData = data[currentDays];
  const formartCurrentData = useMemo(
    () => ({
      fansCount: currentData.series.fansCount,
      newFansCount: currentData.series.newFansCount,
      unfollowCount: currentData.series.unfollowCount,
      netfollowCount: currentData.series.netfollowCount
    }),
    [currentData]
  );
  const hasResult = useMemo(() => {
    return (
      currentData.dates.length > 0 ||
      Object.values(currentData.series).some((arr) => arr.length > 0)
    );
  }, [currentData]);
  const isAllZero = useCallback(
    (obj: IFansData) => {
      return Object.values(obj).every((arr) =>
        arr.every((num: number) => num === 0)
      );
    },
    [formartCurrentData]
  );
  useEffect(() => {
    !hasResult && dispatch(fetchDaysAction(currentDays));
  }, [currentDays]);
  const updateCurrentDays = (days: IDays) => {
    setCurrentDays(days);
  };
  const downloadName = useMemo(() => {
    const day = parseInt(currentDays.match(/\d+/)?.[0] ?? '7');
    return `整体分析-用户-最近${day}天`;
  }, [currentDays]);
  return (
    <>
      <h2 style={{ margin: '20px 0 10px' }}>数据趋势</h2>
      <Trend
        data={formartCurrentData}
        axisX={currentData.dates}
        allZero={isAllZero(formartCurrentData)}
        downloadName={downloadName}
        currentDays={currentDays}
        updatedDays={updateCurrentDays}
      />
    </>
  );
};

export default memo(DataFansTrendPic);
