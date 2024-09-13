import { Col, Row } from 'antd';
import React, { FC, memo, ReactNode } from 'react';
import CardItem from '../card-item';
import { ICardItem } from '../card-item/type';
import { CardListWrapper } from './style';

interface IProps {
  children?: ReactNode;
  data: ICardItem[];
}

const CardList: FC<IProps> = ({ data }) => {
  return (
    <CardListWrapper>
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col span={8} key={index}>
            <CardItem
              item={{
                title: item.title,
                currentCount: item.currentCount,
                previousCount: item.previousCount
              }}
            />
          </Col>
        ))}
      </Row>
    </CardListWrapper>
  );
};

export default memo(CardList);
