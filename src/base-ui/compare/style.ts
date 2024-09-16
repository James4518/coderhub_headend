import { styled } from 'styled-components';

export const CompareWrapper = styled.p<{ $count: number }>`
  .diff {
    margin-left: 5px;
    &:: before {
      content: '${(props) =>
        props.$count > 0 ? '\u25B2' : props.$count < 0 ? '\u25BC' : ''}';
      color: ${(props) =>
        props.$count > 0 ? 'blue' : props.$count < 0 ? 'green' : 'inherit'};
    }
  }
`;
