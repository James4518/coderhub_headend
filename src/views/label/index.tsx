import React, { memo, useEffect, useRef, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import MyList from '@/compoments/list';
import { useAppDispatch, useAppSelector, useAppShallowEqual } from '@/store';
import {
  fetchLabelMomentsAction,
  fetchLabelsAction
} from '@/store/modules/label';
import { ILabel } from '@/network/features/label/type';
import { LabelWrapper } from './style';

interface IProps {
  children?: ReactNode;
}

const Label: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { labelName } = useParams();
  const [currentLabel, setCurrentLabel] = useState<ILabel | null>(null);
  const previousLabelRef = useRef<ILabel | null>(null);
  const fetchedLabelsRef = useRef<Set<string>>(new Set());
  const { labels, labelMoments } = useAppSelector(
    (state) => state.label,
    useAppShallowEqual
  );
  useEffect(() => {
    labels.length === 0 && dispatch(fetchLabelsAction({}));
  }, []);
  useEffect(() => {
    if (labels.length > 0) {
      const selectedLabel = labelName
        ? labels.find((label) => label.name === labelName)
        : labels[0];
      setCurrentLabel(selectedLabel || labels[0]);
    }
  }, [labels.length, labelName]);
  useEffect(() => {
    if (currentLabel) {
      navigate(`/label/${currentLabel.name}`, { replace: true });
      if (previousLabelRef.current !== currentLabel) {
        if (!fetchedLabelsRef.current.has(currentLabel.name)) {
          dispatch(fetchLabelMomentsAction(currentLabel.name));
          fetchedLabelsRef.current.add(currentLabel.name);
        }
        previousLabelRef.current = currentLabel;
      }
    }
  }, [currentLabel]);
  return (
    <LabelWrapper>
      <nav className="top">
        <ul>
          {labels.map((label) => (
            <li
              key={label.id}
              onClick={() => navigate(`/label/${label.name}`)}
              className={classNames({
                active: currentLabel?.name === label.name
              })}
            >
              {label.name}
            </li>
          ))}
        </ul>
      </nav>
      {currentLabel && (
        <MyList
          key={currentLabel.id}
          dataList={labelMoments[currentLabel.id!]?.moments}
          totalCount={labelMoments[currentLabel.id!]?.totalCount}
          hasFetched={true}
          fetchAction={() => fetchLabelMomentsAction(currentLabel.name)}
        />
      )}
    </LabelWrapper>
  );
};

export default memo(Label);
