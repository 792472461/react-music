import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BaseStyled } from '../common/less/base';
import MHeader from '../components/m-header/index';
import Tab from '../components/tab/index';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const GlobalStyled = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
// return (
//   <TransitionGroup>
//     <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
//       <>
//         <GlobalStyled />
//         <BaseStyled />
//         <MHeader />
//         <Tab />
//         {children}
//       </>
//     </CSSTransition>
//   </TransitionGroup>
// );

const Layout = (props: any) => {
  const { children, location } = props;
  useEffect(() => {
    function handleLocationChange() {
      window.scrollTo(0, 0);
    }
    handleLocationChange();
    return () => {};
  }, [location]);
  return (
    <>
      <GlobalStyled />
      <BaseStyled />
      <MHeader />
      <Tab />
      {children}
    </>
  );
};

export default withRouter(Layout);
