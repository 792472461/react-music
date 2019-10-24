import React from 'react';
import styled from 'styled-components';
import { $fontSizeMedium, $colorTheme, $colorText, $colorTextD } from '@/common/less/variable';

export const RecommendWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
  }
`;

export const RecommendList = styled.div`
  .list-title {
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: ${$fontSizeMedium};
    color: ${$colorTheme};
  }
`;

export const RecommendListUl = styled.ul`
  li.item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
    .icon {
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      font-size: ${$fontSizeMedium};
    }
    .name {
      margin-bottom: 10px;
      color: ${$colorText};
    }

    .desc {
      color: ${$colorTextD};
    }
  }
`;
