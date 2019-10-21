import React, { ReactNode, ReactElement, Fragment } from 'react';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import { TabContainer, TabLink } from './styles';

function RenderTabItem(props: any): ReactNode {
  const { location } = props;
  const switchRouterNav = [
    {
      pathname: '/recommend',
      label: '推荐',
    },
    {
      pathname: '/singer',
      label: '歌手',
    },
    {
      pathname: '/rank',
      label: '排行',
    },
    {
      pathname: '/search',
      label: '搜索',
    },
  ];
  function isCurrentPage(pathname: string): string {
    if (location.pathname === pathname) return 'router-link-active';
    return '';
  }
  function goToPage(pathname: string) {
    if (location.pathname !== pathname) {
      router.push(pathname);
    }
  }
  const Link = ({ pathname, label }: { pathname: string; label: string }) => {
    const routerPush = () => {
      goToPage(pathname);
    };
    return (
      <div className="tab-item" onClick={routerPush}>
        <TabLink className={isCurrentPage(pathname)}>{label}</TabLink>
      </div>
    );
  };
  return switchRouterNav.map(nav => {
    return <Link key={nav.pathname} pathname={nav.pathname} label={nav.label} />;
  });
}
function Tab(props: any) {
  // const TabItem = renderTabItem(props);
  return <TabContainer>{RenderTabItem(props)}</TabContainer>;
}

export default withRouter(Tab);
