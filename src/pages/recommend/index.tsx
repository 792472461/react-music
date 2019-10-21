import React, { useState, useEffect, useRef } from 'react';
import Scroll from '../../base/scroll';
import Slider from '../../base/slider/index';
import { RecommendWrapper } from './styles';
import { getRecommend } from '../../api/recommend';
import { ERR_OK } from '../../api/config';

function Banner(recommendList: Array<any>, loadImage:any) {
  function BannerItem(item: any) {
    const _item = item.item
    return (
      <a href={_item.linkUrl}>
        <img onLoad={loadImage} src={_item.picUrl} alt="" />
      </a>
    );
  }
  return recommendList.map(item => {
    return <BannerItem item={item} key={item.id} />;
  });
}

export default function() {
  const [recommendList, setRecommendList] = useState([]);
  const _slider: { current: HTMLElement | null } = useRef(null);
  const _scroll: { current: HTMLElement | null } = useRef(null);
  let checkloaded: boolean = false;

  const _getRecommend:any = async () => {
    const res: any = await getRecommend();
    if (res.code === ERR_OK) {
      setRecommendList(res.data.slider);
    }
  };
  function loadImage() {
    if (!checkloaded) {
      checkloaded = true;
      setTimeout(() => {
        // _scroll && _scroll.current.scroll
      }, 20);
    }
  }

  useEffect(() => {
    _getRecommend();
  }, []);
  return (
    <RecommendWrapper>
      <Scroll className="recommend-content" ref={_scroll}>
        {recommendList.length ? <Slider data={recommendList} loop={true}>{Banner(recommendList, loadImage)}</Slider>: null}
      </Scroll>
    </RecommendWrapper>
  );
}
