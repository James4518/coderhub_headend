import { styled } from 'styled-components';

export const PopoverAvatarWrapper = styled.div`
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
