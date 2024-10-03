import styled from 'styled-components';

export const MomentWrapper = styled.div`
  span.title {
    display: inline-block;
    padding: 0 16px;
    font-size: 12px;
    line-height: 22px;
    color: #86909c;
    border-right: 1px solid #e5e6eb;
    &.active {
      color: #1d7dfa;
    }
    &:hover {
      cursor: pointer;
    }
    .count {
      margin: 0 8px;
    }
  }
`;
