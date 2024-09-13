import { styled } from 'styled-components';

export const RightWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  & * {
    margin: 5px;
  }
  .search {
    max-width: 250px;
  }
  span[role='img'] {
    position: relative;
    top: 2px;
  }
  span[role='img'] svg {
    font-size: 1.6rem;
  }
  :where(.css-dev-only-do-not-override-1pg9a38).ant-input-search
    > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    width: 1rem;
  }
`;
