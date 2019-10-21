import jsonp from '../common/js/jsonp';
import { commonParams, options } from './config';

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 792472461,
  });
  return jsonp(url, data, options);
}
