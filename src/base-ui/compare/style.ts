import { styled } from 'styled-components';

export const CompareWrapper = styled.p<{ count: number }>`
  .diff::before {
    content: '${(props) =>
      props.count > 0 ? '\u25B2' : props.count < 0 ? '\u25BC' : ''}';
    color: ${(props) =>
      props.count > 0 ? 'blue' : props.count < 0 ? 'green' : 'inherit'};
    margin-right: 5px;
  }
`;
