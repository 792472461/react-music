import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react';
import BScroll from 'better-scroll';

const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';

interface ScrollInterface {
  probeType?: number;
  click?: boolean;
  listenScroll?: boolean;
  data?: Array<any> | null;
  pullup?: boolean;
  beforeScroll?: boolean;
  refreshDelay?: number;
  direction?: string;
  children?: React.FC | HTMLElement | HTMLElement | ReactNode;
  className?: string;
}

const defaultProps: ScrollInterface = {
  probeType: 1,
  click: false,
  listenScroll: false,
  data: null,
  pullup: false,
  beforeScroll: false,
  refreshDelay: 20,
  direction: DIRECTION_V,
};

const Scroll = forwardRef((props: ScrollInterface, ref) => {
  const config: ScrollInterface = Object.assign(defaultProps, props);
  let scroll: BScroll | null = null;
  const wrapper = useRef(null);

  function disable() {
    scroll && scroll.disable();
  }
  function enable() {
    scroll && scroll.enable();
  }
  function refresh() {
    scroll && scroll.refresh();
  }
  function scrollTo() {
    scroll && scroll.scrollTo.apply(scroll, arguments);
  }
  function scrollToElement() {
    scroll && scroll.scrollToElement.apply(scroll, arguments);
  }
  useImperativeHandle(ref, () => ({
    refresh: () => {
      refresh();
    },
    disable: () => {
      disable();
    },
    enable: () => {
      enable();
    },
    scrollTo: () => {
      scrollTo();
    },
    scrollToElement: () => {
      scrollToElement();
    },
  }));
  useEffect(() => {
    refresh();
  }, [props.data]);

  function initScroll() {
    const wrapperCurrent: HTMLElement | null = wrapper.current;
    if (!wrapperCurrent) {
      return;
    }
    const currentScroll = new BScroll(wrapperCurrent, {
      probeType: config.probeType,
      click: config.click,
      eventPassthrough: config.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V,
    });
    if (props.listenScroll) {
      currentScroll.on('scroll', (pos: any) => {
        // props.scroll(pos);
      });
    }

    if (config.pullup) {
      currentScroll.on('scrollEnd', () => {
        if (currentScroll.y <= currentScroll.maxScrollY + 50) {
          // props.scrollToEnd();
        }
      });
    }

    if (config.beforeScroll) {
      currentScroll.on('beforeScrollStart', () => {
        // props.beforeScroll();
      });
    }
    ref = scroll = currentScroll;
    return currentScroll;
  }
  useEffect(() => {
    setTimeout(() => {
      initScroll();
    });
  }, []);

  return (
    <div ref={wrapper} className={props.className}>
      {props.children}
    </div>
  );
});
export default Scroll;
