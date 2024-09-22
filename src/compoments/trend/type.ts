import { styled } from 'styled-components';

export const TrendWrapper = styled.section`
  span {
    display: inline-block;
    border-radius: 8px;
    button {
      padding: 2px 12px;
      line-height: 22px;
      &.active {
        color: #1d7dfa;
        background-color: #fff;
      }
    }
  }
`;
