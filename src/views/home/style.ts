import { styled } from 'styled-components';

export const HomeWrapper = styled.section`
  .momentList {
    overflowy: auto;
    .ant-list-item-meta-avatar > span {
      display: flex;
      width: 3rem;
      height: 3rem;
    }
    .ant-list-item-meta-content h4[class='ant-list-item-meta-title'] {
      padding: 0;
      margin: 0;
    }
  }
`;
