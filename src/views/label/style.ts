import { styled } from 'styled-components';

export const LabelWrapper = styled.div`
  .top {
    ul {
      display: flex;
      li {
        display: inline-block;
        margin: 0 10px;
        cursor: pointer;
        &.active {
          background-color: rgb(139 92 246);
        }
      }
    }
  }
`;
