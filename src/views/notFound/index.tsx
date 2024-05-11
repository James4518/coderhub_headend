import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { NotFoundWrapper } from './styld';

interface IProps {
  children?: ReactNode;
}

const NotFound: FC<IProps> = () => {
  const title = '您来到了一片荒漠~';
  return (
    <NotFoundWrapper className="relative">
      <div className="mt-32">
        <p className="relative m-2 text-center text-3xl wavy">
          {title.split('').map((char, index) => {
            return (
              <span
                key={index}
                className="relative inline-block"
                style={{ '--i': index + 1 } as React.CSSProperties}
              >
                {char}
              </span>
            );
          })}
        </p>
        <div id="wraper">
          <div id="stand1" className="stand"></div>
          <div id="stand2" className="stand"></div>
          <div id="band">
            <div id="wheel1" className="wheel"></div>
            <div id="wheel2" className="wheel"></div>
            <div id="wheel3" className="wheel"></div>
            <div id="wheel4" className="wheel"></div>
          </div>
          <div id="package1" className="package"></div>
          <div id="mainFactory"></div>
          <div id="door"></div>
          <div id="window1" className="window"></div>
          <div id="window2" className="window"></div>
          <div id="chim1"></div>
          <div id="chim2"></div>
          <div id="roof1"></div>
          <div id="roof2"></div>
          <div id="stripe1" className="stripe"></div>
          <div id="stripe2" className="stripe"></div>
          <div id="stripe3" className="stripe"></div>
          <div id="stripe4" className="stripe"></div>
          <div id="smoke1" className="smoke">
            <div id="sCloud1" className="sCloud"></div>
            <div id="sCloud2" className="sCloud"></div>
            <div id="sCloud3" className="sCloud"></div>
          </div>
          <div id="smoke2" className="smoke">
            <div id="sCloud4" className="sCloud"></div>
            <div id="sCloud5" className="sCloud"></div>
            <div id="sCloud6" className="sCloud"></div>
          </div>
          <div id="tree">
            <div id="branch"></div>
            <div id="leaves1" className="leaves"></div>
            <div id="leaves2" className="leaves"></div>
            <div id="leaves3" className="leaves"></div>
          </div>
        </div>
      </div>
    </NotFoundWrapper>
  );
};

export default memo(NotFound);
