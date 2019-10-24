import React, { useState, useEffect, useRef, useMemo } from 'react';
import Scroll from '../../base/scroll';
import Slider from '../../base/slider/index';
import { RecommendWrapper, RecommendList, RecommendListUl } from './styles';
import { getRecommend, getDiscList } from '../../api/recommend';
import { ERR_OK } from '../../api/config';
export default function() {
  const [recommendList, setRecommendList] = useState([]);
  const [discList, setDiscList] = useState([]);

  const _scroll = useRef({});
  let checkloaded: boolean = false;

  const _getRecommend: any = async () => {
    const res: any = await getRecommend();
    if (res.code === ERR_OK) {
      setRecommendList(res.data.slider);
    }
  };

  const _getDiscList = async () => {
    const res = await getDiscList();
    if (res.code === ERR_OK) {
      setDiscList(res.data.list);
      _getRecommend();
    }
  };

  function loadImage() {
    if (!checkloaded) {
      checkloaded = true;
      setTimeout(() => {
        _scroll.current && _scroll.current.refresh();
      }, 20);
    }
  }

  function BannerItem(item: any) {
    return (
      <a href={item.linkUrl}>
        <img onLoad={loadImage} src={item.picUrl} alt="" />
      </a>
    );
  }
  function DiscItem(disc: any) {

    return (
      <li className="item">
        <div className="icon">
          <img width="60" height="60" src={disc.imgurl} />
        </div>
        <div className="text">
          <h2 className="name" dangerouslySetInnerHTML={{ __html: disc.creator.name }} />
          <p className="desc" dangerouslySetInnerHTML={{ __html: disc.dissname }} />
        </div>
      </li>
    );
  }

  useEffect(() => {
    _getDiscList();
  }, []);

  return (
    <RecommendWrapper>
      <Scroll className="recommend-content" ref={_scroll} data={discList}>
        <div>
          {/* tslint:disable-next-line: jsx-no-multiline-js */}
          {recommendList.length ? (
            <Slider data={recommendList} loop={true}>
              {recommendList.map((item:any) => <BannerItem {...item} key={item.id} />)}
            </Slider>
          ) : null}
          <RecommendList>
            <h1 className="list-title">热门歌单推荐</h1>
            <RecommendListUl>
              {discList.map((disc, index) => <DiscItem key={index} {...disc}/>)}
            </RecommendListUl>
          </RecommendList>
        </div>
      </Scroll>
    </RecommendWrapper>
  );
}
