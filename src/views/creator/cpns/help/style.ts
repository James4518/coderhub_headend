import styled from 'styled-components';

export const HelpWrapper = styled.div`
  ol {
    list-style-type: none;
    counter-reset: list-counter;
    li {
      counter-increment: list-counter;
      &::before {
        content: counter(list-counter) '. ';
      }
    }
  }
  .active {
    color: #1d7dfa;
  }
  .ant-collapse-content-box {
    a {
    }
  }
`;
