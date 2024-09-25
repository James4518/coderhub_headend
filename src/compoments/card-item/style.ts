import { styled } from 'styled-components';

export const CardItemWrapper = styled.div`
  .item-content {
    margin: 0 auto;
    padding: 16px 20px;
    background-color: ${(props) => props.theme.color.primary};
    .title {
      color: #4e5969;
      line-height: 22px;
    }
    .current {
      color: #1d2129;
      font-weight: 600;
      font-size: 32px;
      line-height: 42px;
      margin-bottom: 4px;
      white-space: nowrap;
    }
  }
`;
