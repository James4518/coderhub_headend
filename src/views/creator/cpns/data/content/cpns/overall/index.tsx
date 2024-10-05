import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import { IDays } from '@/store/modules/data/type';
import { fetchDaysAction } from '@/store/modules/data';
import Trend from '@/compoments/trend';
import { IContentData } from './type';

interface IProps {
  children?: ReactNode;
}

const ContentOverall: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const [currentDays, setCurrentDays] = useState<IDays>('7days');
  const data = useAppSelector((state) => state.data, useAppShallowEqual);
  const currentData = data[currentDays];
  const formartCurrentData = useMemo(
    () => ({
      viewCount: currentData.series.viewCount,
      likeCount: currentData.series.likeCount,
      commentCount: currentData.series.commentCount,
      collectCount: currentData.series.collectCount,
      publishCount: currentData.series.publishCount
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
    (obj: IContentData) => {
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
    <Trend
      data={formartCurrentData}
      axisX={currentData.dates}
      allZero={isAllZero(formartCurrentData)}
      downloadName={downloadName}
      currentDays={currentDays}
      updatedDays={updateCurrentDays}
    />
  );
};
export default memo(ContentOverall);
