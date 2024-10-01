import styled from 'styled-components';

export const DataContentWrapper = styled.div`
  #area-right {
    font-size: 10px;
    &:hover {
      color: ${(props) => props.theme.color.secend};
    }
  }
  .ant-tooltip-inner {
    width: 180px;
    background-color: rgba(0, 0, 0, 0.65);
  }
`;
