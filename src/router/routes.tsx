import Layout from '../pages/Layout'
import { BannerList } from '../pages/Banner/List'


export const dynamicRoutes = [{
  path: '/',
  element: <Layout />,
  errorElement: <div>Error</div>,
  children: [{
    title: 'Banner管理',
    path: 'banner',
    children: [{
      path: 'bannerList',
      title: 'Banner列表',
      element: <BannerList />,
    }]
  }]
}]
export const staticRoutes = []

export default [...dynamicRoutes, staticRoutes]
