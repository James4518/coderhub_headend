import { styled } from 'styled-components';

export const RightWrapper = styled.div`
  flex: 1;
  line-height: 50px;
  button[type='primary'] {
    margin: 10px;
  }
  span[role='img'] {
    position: relative;
    top: 2px;
  }
  span[role='img'] svg {
    font-size: 1.6rem;
  }
`;
