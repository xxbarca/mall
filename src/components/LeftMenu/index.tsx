import Sider from 'antd/es/layout/Sider'
import { Menu, theme } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React from 'react'
import { dynamicRoutes } from '../../router/routes.tsx'

const genMenu = routes => {
  return routes.map(
    item => {

      return {
        key: item.path,
        icon: <UserOutlined />,
        label: item.title,
        children: item.children.map(d => {
          return {
            key: d.path,
            label: d.title,
          };
        }),
      };
    },
  );
}

export const LeftMenu = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return <Sider width={200} style={{ background: colorBgContainer }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderInlineEnd: 0 }}
      items={genMenu(dynamicRoutes[0].children)}
    />
  </Sider>
}
