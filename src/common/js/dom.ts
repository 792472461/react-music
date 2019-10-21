export function hasClass(el: HTMLElement | Element, className: string): boolean {
  return el.classList.contains(className);
}

export function addClass(el: HTMLElement | Element, className: string): void {
  el.classList.add(className);
}

export function getData(el: HTMLElement | Element, name: string, val: string) {
  const prefix = 'data-';
  if (val) {
    return el.setAttribute(prefix + name, val);
  }
  return el.getAttribute(prefix + name);
}

let elementStyle: CSSStyleDeclaration = document.createElement('div').style;

let vendor = (() => {
  interface TransformNamesInterface {
    webkit: string;
    Moz: string;
    O: string;
    ms: string;
    standard: string;
    [key: string]: any;
  }
  let transformNames: TransformNamesInterface = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform',
  };

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
})();

export function prefixStyle(style: string) {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
