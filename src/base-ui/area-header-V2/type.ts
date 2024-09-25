import styled from 'styled-components';

export const AreaHeaderV2Wrapper = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    color: #8a919f;
    .title {
      display: inline-block;
      padding: 12px;
      font-weight: 500;
      cursor: pointer;
      &.active {
        color: ${(props) => props.theme.color.secend};
        border-bottom: 2px solid ${(props) => props.theme.color.secend};
      }
    }
  }
`;
