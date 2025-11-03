import React from 'react'
import { Breadcrumb, Layout as L, theme } from 'antd';
import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LeftMenu } from '../../components/LeftMenu'
const { Content } = L;
const Layout: React.FC = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <L className={'h-full'}>
      <Header />
      <L>
        <LeftMenu />
        <L className={'pl-[24px] pr-[24px] mb-[24px] box-border'}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{margin: '16px'}}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </L>
      </L>
    </L>
  );
};

export default Layout;
