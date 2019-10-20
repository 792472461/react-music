import styled from 'styled-components';
import { $colorTheme, $fontSizeLarge } from '../../common/less/variable';
export const HeaderWrapper = styled.div`
  position: relative;
  height: 44px;
  text-align: center;
  color: ${$colorTheme};
  font-size: 0;
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: ${$fontSizeLarge};
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: 20px;
      color: ${$colorTheme};
    }
  }
`;

export const LogoIcon = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-top: 6px;
  width: 30px;
  height: 32px;
  margin-right: 9px;
  background: url(${(props: any) => props.imgUrl});
  background-size: 30px 32px;
`;
