import { styled } from 'styled-components';

export const TrendWrapper = styled.section`
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      border-radius: 8px;
      button {
        padding: 2px 12px;
        line-height: 22px;
        &.active {
          color: #1d7dfa;
          background-color: #fff;
        }
        &:hover {
          background: #fafafa;
        }
      }
    }
    .right {
      display: inline-block;
      color: #86909c;
      padding: 3px 8px;
      cursor: pointer;
      text-decoration: none;
    }
  }
`;
