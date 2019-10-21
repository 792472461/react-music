import styled from 'styled-components';
import { $fontSizeMedium, $colorTextL, $colorTheme } from '../../common/less/variable';

export const TabContainer = styled.div`
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: ${$fontSizeMedium};
  .tab-item {
    flex: 1;
    text-align: center;
  }
`;
export const TabLink = styled.a`
  padding-bottom: 5px;
  color: ${$colorTextL};
  &.router-link-active {
    color: ${$colorTheme};
    border-bottom: 2px solid ${$colorTheme};
  }
`;
