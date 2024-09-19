import styled from 'styled-components';

export const UserInfoWrapper = styled.div`
  display: flex;
  .container {
    display: flex;
    margin: 0 auto;
    padding: 20px;
    max-width: 960px;
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px 0;
      .username {
        margin-left: 14px;
        max-width: 225px;
        font-weight: 500;
        font-size: 20px;
        & > a {
          display: inline-block;
          width: 100%;
          height: 100%;
          text-decoration: none;
        }
      }
      & p {
        & a {
          display: inline-block;
          padding: 0 12px;
          border-right: 1px solid #c2c8d1;
          text-decoration: none;
          color: #8a919f;
          & .count {
            margin-right: 5px;
            color: black;
          }
        }
        & a:last-of-type {
          border: none;
          & .count {
            margin: 5px;
          }
        }
      }
    }
  }
`;
