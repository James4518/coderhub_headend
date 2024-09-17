import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
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
  const navigate = useNavigate();
  const { labelName } = useParams();
  const { labels, labelMoments } = useAppSelector(
    (state) => ({
      labels: state.label.labels,
      labelMoments: state.label.labelMoments
    }),
    useAppShallowEqual
  );
  const [currentLabel, setCurrentLabel] = useState<string>(
    labelName || labels[0]?.name || ''
  );
  useEffect(() => {
    if (labels.length == 0) {
      dispatch(fetchLabelsAction({}));
    }
  }, [labels.length]);
  useEffect(() => {
    if (labels.length > 0 && currentLabel == '') {
      setCurrentLabel(labels[0].name);
    }
    dispatch(fetchLabelMomentsAction(currentLabel));
  }, [labels.length, currentLabel]);
  const changeLabel = (labelName: string) => {
    navigate(`/label/${labelName}`);
    setCurrentLabel(labelName);
    dispatch(fetchLabelMomentsAction(labelName));
  };
  return (
    <LabelWrapper>
      <nav className="top">
        <ul>
          {labels.map((label) => (
            <li
              key={label.id}
              onClick={() => changeLabel(label.name)}
              className={classNames({ active: currentLabel === label.name })}
            >
              {label.name}
            </li>
          ))}
        </ul>
      </nav>
      <MyList
        dataList={labelMoments[currentLabel]}
        fetchAction={() => fetchLabelMomentsAction(currentLabel)}
      />
    </LabelWrapper>
  );
};

export default memo(Label);
