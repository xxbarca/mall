import Sider from 'antd/es/layout/Sider'
import { Menu, theme } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import {useNavigate} from "react-router-dom";
import {dynamicRoutes} from "@/router/routes.tsx";

const genMenu = routes => {
  return routes.map(
    item => {
      return {
        key: item.path,
        icon: <UserOutlined />,
        label: item.title,
        children: item.children.map(d => {
          return {
            key: `${item.path}/${d.path}`,
            label: d.title,
          };
        }),
      };
    },
  );
}

export const LeftMenu = () => {
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleOnClick = (item ) => {
    navigate(item.key);
  }
  return <Sider width={200} style={{ background: colorBgContainer }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderInlineEnd: 0 }}
      items={genMenu(dynamicRoutes[0].children)}
      onClick={handleOnClick}
    />
  </Sider>
}
