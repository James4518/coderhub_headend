import { styled } from 'styled-components';

export const OverviewWrapper = styled.div`
  margin-top: 20px;
  .icon {
    margin-left: 5px;
    cursor: pointer;
  }
  #overview-title .title {
    font-size: 18px;
  }
  .item-content .title {
    font-size: 18px;
  }
  .ant-tooltip-arrow {
    left: 3px;
  }
  .ant-tooltip-inner {
    width: 180px;
    background-color: rgba(0, 0, 0, 0.65);
  }
  .content {
    margin-top: 10px;
    padding: 10px 20px;
  }
`;
