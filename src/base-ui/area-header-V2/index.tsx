import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AreaHeaderV2Wrapper } from './type';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
  titles: string[];
  urls?: string[];
  right?: ReactNode;
  components: ReactNode[];
}

const AreaHeaderV2: FC<IProps> = ({ titles, urls, right = '', components }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (urls && urls.length > 0) {
      navigate(urls[currentIndex]);
    }
  }, [currentIndex, urls]);
  const titleClick = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <AreaHeaderV2Wrapper>
      <div className="top">
        <div className="left">
          {titles.map((title, index) => {
            return (
              <strong
                className={classNames('title', {
                  active: currentIndex == index
                })}
                onClick={() => titleClick(index)}
                key={title}
              >
                {title}
              </strong>
            );
          })}
        </div>
        <div className="right">{right}</div>
      </div>
      {components[currentIndex]}
    </AreaHeaderV2Wrapper>
  );
};

export default memo(AreaHeaderV2);
