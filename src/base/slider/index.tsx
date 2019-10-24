import React, { ReactNode, useEffect, useRef, useState } from 'react';
import BScroll from 'better-scroll';
import { addClass, hasClass } from '../../common/js/dom';
import { SliderContainer, SliderGroup, Dots } from './styles';

interface SliderPorps {
  data?: any;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  scrollX?: boolean;
  scrollY?: boolean;
  momentum?: boolean;
  snap?: any;
  children?: React.FC | HTMLElement | HTMLElement | ReactNode;
}

const defaultProps: SliderPorps = {
  loop: false,
  autoPlay: true,
  interval: 4000,
  scrollX: true,
  scrollY: false,
  momentum: false,
};

export default function(props: SliderPorps) {
  const config: SliderPorps = Object.assign(defaultProps, props, {
    snap: {
      loop: props.loop || defaultProps.loop,
      threshold: 0.3,
      speed: 400,
    },
  });
  let sliderInstance: BScroll | null = null;
  // const [sliderInstance, initSlider] = useState<BScroll | null>(null);
  let timer: null | number = null;
  let resizeTimer: null | any = null;
  const [dots, setDots] = useState<Array<any>>([]);
  const [currentPageIndex, changeCurrentPage] = useState<number>(0);
  const sliderGroup: { current: HTMLElement | null } = useRef(null);
  const slider: { current: HTMLElement | null } = useRef(null);
  function refresh() {
    if (slider) {
      _setSliderWidth(true);
      sliderInstance && sliderInstance.refresh();
    }
  }

  function _setSliderWidth(isResize?: boolean) {
    const sliderGroupRef = sliderGroup.current as HTMLElement;
    const sliderRef: HTMLElement = sliderGroup.current as HTMLElement;

    if (!sliderGroupRef || !sliderRef) {
      return;
    }
    const children: HTMLCollection = sliderGroupRef.children;
    let width = 0;
    let sliderWidth = sliderRef.clientWidth;
    for (let i = 0; i < children.length; i++) {
      let child: any = children[i];

      addClass(child, 'slider-item');

      child.style.width = sliderWidth + 'px';
      width += sliderWidth;
    }
    if (config.loop && !isResize) {
      width += 2 * sliderWidth;
    }
    sliderGroupRef.style.width = width + 'px';
  }
  function _initSlider(): BScroll | null {
    const sliderRef = slider.current as HTMLElement;
    if (!sliderRef) {
      return null;
    }
    sliderInstance = new BScroll(sliderRef, config);
    sliderInstance.on('scrollEnd', _onScrollEnd);
    sliderInstance.on('touchEnd', () => {
      if (config.autoPlay) {
        _play();
      }
    });

    sliderInstance.on('beforeScrollStart', () => {
      if (config.autoPlay) {
        timer && clearTimeout(timer);
      }
    });
    return sliderInstance;
  }
  function _onScrollEnd() {
    if (sliderInstance) {
      let pageIndex = sliderInstance.getCurrentPage().pageX;
      changeCurrentPage(pageIndex);
      if (config.autoPlay) {
        _play();
      }
    }
  }
  function _initDots() {
    const sliderGroupRef = sliderGroup.current as HTMLElement;
    if (!sliderGroupRef) {
      return;
    }
    const children: HTMLCollection = sliderGroupRef.children;
    const _dots = Array.prototype.slice.call(children).map(item => null);

    setDots(_dots);
  }
  function _play() {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      sliderInstance && sliderInstance.next();
    }, config.interval);
  }
  useEffect(() => {
    setTimeout(() => {
      _setSliderWidth();
      _initDots();
      _initSlider();
      if (config.autoPlay) {
        _play();
      }
    }, 20);
    window.addEventListener('resize', () => {
      if (!sliderInstance || !sliderInstance.enabled) {
        return;
      }
      resizeTimer && clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (sliderInstance.isInTransition) {
          _onScrollEnd();
        } else {
          if (config.autoPlay) {
            _play();
          }
        }
        refresh();
      }, 60);
    });
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);
  return (
    <SliderContainer ref={slider}>
      <SliderGroup ref={sliderGroup}>{props.children}</SliderGroup>
      <Dots>
        {dots.map((item, index) => (<span key={index} className={`dot${currentPageIndex === index ? ' active' : ''}`} />))}
      </Dots>
    </SliderContainer>
  );
}
