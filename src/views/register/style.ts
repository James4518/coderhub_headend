import { styled } from 'styled-components';

export const RegisterWrapper = styled.section`
  #register {
    margin: 0 auto;
    padding: 50px 0;
  }
  h2 {
    text-align: center;
    font-size: 1.8rem;
  }
  .strength-meter-bar {
    position: relative;
    width: 200px;
    height: 6px;
    margin: 10px;
    border-radius: 6px;
    background-color: rgb(0 0 0 / 25%);
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 10;
      width: 20%;
      height: inherit;
      border-width: 0 5px;
      border-style: solid;
      border-color: #fff;
      background-color: transparent;
    }
    &::before {
      left: 20%;
    }
    &::after {
      right: 20%;
    }
    &--fill {
      position: absolute;
      width: 0;
      height: inherit;
      transition:
        width 0.5s ease-in-out,
        background 0.25s;
      border-radius: inherit;
      background-color: transparent;
      &[data-score='0'] {
        width: 20%;
        background-color: darken(#e74242, 10%);
      }
      &[data-score='1'] {
        width: 40%;
        background-color: #e74242;
      }
      &[data-score='2'] {
        width: 60%;
        background-color: #efbd47;
      }
      &[data-score='3'] {
        width: 80%;
        background-color: fade(#55d187, 50%);
      }
      &[data-score='4'] {
        width: 100%;
        background-color: #55d187;
      }
    }
  }
`;
