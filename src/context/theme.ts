import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  color: {
    primary: '#f2f3f5',
    secend: '#1e80ff'
  },
  mixin: {
    textNowrap: `
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `
  }
};
export default theme;
