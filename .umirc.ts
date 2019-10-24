import { IConfig } from 'umi-types';
import path from 'path';
import axios from 'axios';
import bodyParser from 'body-parser';

const resolve = dir => {
  return path.join(__dirname, './', dir);
};

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', redirect: '/recommend' },
        { path: '/user', component: '../pages/user/index' },
        { path: '/recommend', component: '../pages/recommend/index' },
        { path: '/singer', component: '../pages/singer/index' },
        { path: '/rank', component: '../pages/rank/index' },
        { path: '/search', component: '../pages/search/index' },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'react-music',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  chainWebpack(config, { webpack }) {
    // 设置 alias
    config.resolve.alias.set('common', resolve('src/common'));
    config.resolve.alias.set('components', resolve('src/components'));
    config.resolve.alias.set('base', resolve('src/base'));
    config.resolve.alias.set('api', resolve('src/api'));
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};

export default config;
