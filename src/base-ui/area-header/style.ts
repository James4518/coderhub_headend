import { styled } from 'styled-components';

export const AreaHeaderWrapper = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  border-bottom: 1px solid #e5e6eb;
  #overview-title {
    display: flex;
    justify-content: center;
  }
  a {
    align-items: center;
    font-size: 14px;
    color: #86909c;
    &::after {
      content: '\\003E';
    }
  }
`;
