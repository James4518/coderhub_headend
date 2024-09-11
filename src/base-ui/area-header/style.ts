import styled from 'styled-components';

export const AreaHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #e5e6eb;
  .right {
    font-size: 14px;
    line-height: 24px;
    color: #86909c;
    align-items: center;
    &::after {
      content: '\003E';
    }
  }
`;
