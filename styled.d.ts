import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      secend: string;
    };
    mixin: {
      textNowrap: string;
    }
  }
}
