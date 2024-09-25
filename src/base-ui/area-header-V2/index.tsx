import React, { FC, memo, ReactNode, useState } from 'react';
import classNames from 'classnames';
import { AreaHeaderV2Wrapper } from './type';

interface IProps {
  children?: ReactNode;
  titles: string[];
  right?: ReactNode;
  components: ReactNode[];
}

const AreaHeaderV2: FC<IProps> = ({ titles, right = '', components }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
