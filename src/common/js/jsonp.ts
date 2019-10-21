import originJsonp from 'jsonp';

export function param(data: any) {
  let url = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}

export default function jsonp(url: string, data: any, option: any) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err: any, data: any) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

