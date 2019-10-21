import styled from 'styled-components';
import {$colorTextL, $colorTextLl} from '../../common/less/variable'

export const SliderContainer = styled.div`
  min-height: 1px;
`;

export const SliderGroup = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  .slider-item {
    float: left;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }

  a {
    display: block;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
  }
  img {
    display: block;
    width: 100%;
  }
`;

export const Dots = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 12px;
  transform: translateZ(1px);
  text-align: center;
  font-size: 0;
  .dot {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${$colorTextL};
    &.active {
      width: 20px;
      border-radius: 5px;
      background: ${$colorTextLl};
    }
  }
`;
