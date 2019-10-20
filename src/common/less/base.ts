import { $colorBackground, $colorText } from './variable';
import { createGlobalStyle } from 'styled-components';

export const BaseStyled = createGlobalStyle`body, html {
  line-height: 1;
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: ${$colorBackground};
  color: ${$colorText};
}`;

