import React, { memo, useCallback, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import MyList from '@/compoments/list';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import {
  fetchLabelMomentsAction,
  fetchLabelsAction
} from '@/store/modules/label';
import { LabelWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Label: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const { labels, labelMoments } = useAppSelector(
    (state) => ({
      labels: state.label.labels,
      labelMoments: state.label.labelMoments
    }),
    useAppShallowEqual
  );
  const [currentLabel, setCurrentLabel] = useState<string>(labels[0]?.name || '');
  useEffect(() => {
    if (labels.length == 0) {
      dispatch(fetchLabelsAction({}));
    }
  }, [labels.length]);
  useEffect(() => {
    if (labels.length > 0 && currentLabel== '') {
      setCurrentLabel(labels[0].name);
      dispatch(fetchLabelMomentsAction(labels[0].name));
    }
  }, [labels.length]);
  const changeLabel = useCallback((labelName: string) => {
    setCurrentLabel(labelName);
    dispatch(fetchLabelMomentsAction(labelName));
  },[]);
  return (
    <LabelWrapper>
      <div className="top">
        <ul>
          {labels.map((label) => (
            <li
              key={label.id}
              onClick={() => changeLabel(label.name)}
            >
              {label.name}
            </li>
          ))}
        </ul>
      </div>
      <MyList
        dataList={labelMoments[currentLabel]}
        fetchAction={() => dispatch(fetchLabelMomentsAction(currentLabel))}
      />
    </LabelWrapper>
  );
};

export default memo(Label);
