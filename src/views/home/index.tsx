import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Home: FC<IProps> = () => {
  return (
    <section>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </section>
  );
};

export default memo(Home);
