import { styled } from 'styled-components';

export const PopoverAvatarWrapper = styled.div`
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .username {
    font-size: 14px;
    & > a {
      pointer-events: none;
    }
  }
  :where(.css-dev-only-do-not-override-1pg9a38).ant-popover
    .ant-popover-inner-content {
    display: flex;
    justify-content: center;
  }
  .followbtn {
    width: 80px;
    border-radius: 36px;
    background-color: #e54f00;
    & > span {
      padding: 0 5px;
      border: 1px solid transparent;
      color: #fff;
    }
  }
`;
