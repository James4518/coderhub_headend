import styled from 'styled-components';

export const MyListWrapper = styled.div`
  #scrollContent {
    padding: 0 16px;
    border: 1px solid rgba(140, 140, 140, 0.35);
  }
  .ant-list-item-meta-avatar > span {
    cursor: pointer;
  }
  .labels {
    float: right;
    position: relative;
    top: 15px;
    .label {
      display: inline-block;
      width: 50px;
      height: 20px;
      text-align: center;
    }
  }
`;
