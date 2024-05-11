// blackHole ghost Interact-button jump-words
import { styled } from 'styled-components';

export const NotFoundWrapper = styled.div`
  @keyframes wavy {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
    100% {
      transform: translateY(0);
    }
  }
  @keyframes goSmoke {
    0% {
      opacity: 0;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(2, 2) translateY(-20px) rotate(30deg);
    }
  }
  @keyframes goWindow {
    0% {
      background-color: #f5f19a;
    }
    100% {
      background-color: #d3bd54;
    }
  }
  @keyframes goWheels {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes goPackage {
    83% {
      transform: translateX(120px);
    }
    95% {
      transform: translateX(130px) translateY(25px) rotate(90deg);
    }
    100% {
      transform: translateX(130px) translateY(25px) rotate(90deg);
    }
  }
  p {
    span {
      animation: wavy 1s ease-in-out infinite;
      animation-delay: calc(0.1s * var(--i));
    }
  }
  #wraper {
    width: 400px;
    height: 350px;
    margin: 0 auto;
    position: relative;
  }
  .stand {
    width: 10px;
    height: 13px;
    position: absolute;
    background-color: #bcbec0;
    top: 279px;
  }
  #stand1 {
    left: 251px;
  }
  #stand2 {
    left: 321px;
  }
  #band {
    width: 100px;
    height: 13px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    position: absolute;
    background-color: #58595b;
    top: 266px;
    left: 241px;
  }
  .wheel {
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: #414042;
    position: absolute;
    animation: goWheels 0.5s linear infinite normal;
  }
  .wheel:after {
    content: '';
    display: block;
    width: 12px;
    height: 2px;
    background-color: #f5f19a;
    position: absolute;
    top: 5px;
  }
  #wheel1 {
    left: 5px;
    animation: goWheels 0.5s 0.1s linear infinite normal;
  }
  #wheel2 {
    left: 31px;
    animation: goWheels 0.5s 0.2s linear infinite normal;
  }
  #wheel3 {
    left: 56px;
    animation: goWheels 0.5s 0.3s linear infinite normal;
  }
  #wheel4 {
    left: 79px;
    animation: goWheels 0.5s 0.4s linear infinite normal;
  }
  .package {
    width: 20px;
    height: 20px;
    position: absolute;
    background-color: #403f63;
    top: 246px;
    left: 220px;
    animation: goPackage 2s 0.3s linear infinite normal;
  }
  #mainFactory {
    width: 150px;
    height: 100px;
    background-color: #cfb499;
    position: absolute;
    top: 195px;
    left: 91px;
  }
  #door {
    width: 25px;
    height: 40px;
    background-color: #403f63;
    position: absolute;
    top: 255px;
    left: 155px;
  }
  #door:after {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #f5f19a;
    position: absolute;
    top: 21px;
    left: 15px;
  }
  .window {
    width: 25px;
    height: 25px;
    background-color: #f5f19a;
    position: absolute;
    border: 2px solid #403f63;
    transition: background-color 0.3s linear;
    animation: goWindow 3s infinite alternate;
  }
  #window1 {
    top: 216px;
    left: 109px;
  }
  #window2 {
    top: 216px;
    left: 197px;
  }
  #roof1 {
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 0 34px 64px;
    border-color: transparent transparent #403f63 transparent;
    position: absolute;
    top: 162px;
    left: 91px;
  }
  #roof2 {
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 0 44px 86px;
    border-color: transparent transparent #403f63 transparent;
    position: absolute;
    top: 151px;
    left: 155px;
  }
  #chim1 {
    width: 25px;
    height: 80px;
    background-color: #e2c4a5;
    position: absolute;
    top: 115px;
    left: 155px;
  }
  #chim2 {
    width: 25px;
    height: 102px;
    background-color: #e2c4a5;
    position: absolute;
    top: 93px;
    left: 198px;
  }
  .stripe {
    width: 25px;
    height: 10px;
    background-color: #be1e2d;
    position: absolute;
  }
  #stripe1 {
    top: 128px;
    left: 155px;
  }
  #stripe2 {
    top: 145px;
    left: 155px;
  }
  #stripe3 {
    top: 105px;
    left: 198px;
  }
  #stripe4 {
    top: 123px;
    left: 198px;
  }
  .smoke {
    width: 19px;
    height: 18px;
    position: absolute;
    opacity: 0;
  }
  .sCloud {
    width: 60%;
    height: 0.7em;
    background-color: #e6e7e8;
    position: absolute;
    border-radius: 18px;
  }
  #smoke1 {
    top: 91px;
    left: 157px;
    animation: goSmoke 2s 0.3s infinite normal;
    transition: opacity 1s linear;
  }
  #smoke2 {
    top: 71px;
    left: 200px;
    transition: opacity 1s linear;
    animation: goSmoke 2s 1.3s infinite normal;
  }
  #sCloud1,
  #sCloud4 {
    top: 2px;
  }
  #sCloud2,
  #sCloud5 {
    left: 6px;
  }
  #sCloud3,
  #sCloud6 {
    top: 6px;
    left: 7px;
  }
  #tree {
    width: 54px;
    height: 87px;
    position: absolute;
    top: 208px;
    left: 60px;
  }
  #branch {
    width: 9px;
    height: 37px;
    position: absolute;
    background-color: #754c29;
    top: 50px;
    left: 23px;
  }
  .leaves {
    width: 35px;
    height: 35px;
    background-color: #8dc63f;
    position: absolute;
    border-radius: 18px;
  }
  #leaves1 {
    top: 20px;
  }
  #leaves2 {
    left: 10px;
  }
  #leaves3 {
    top: 20px;
    left: 19px;
  }
`;
