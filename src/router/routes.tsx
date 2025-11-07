import Layout from '@/pages/Layout/index.tsx'
import { BannerList } from '@/pages/Banner/List'
import {CategoryList} from "@/pages/Category/List";


export const dynamicRoutes = [{
  path: '/',
  element: <Layout />,
  errorElement: <div>Error</div>,
  children: [{
    title: 'Banner管理',
    path: 'banner',
    children: [{
      path: 'list',
      title: 'Banner列表',
      element: <BannerList />,
    }]
  }, {
    title: '分类管理',
    path: 'category',
    children: [{
      path: 'list',
      title: '分类列表',
      element: <CategoryList />,
    }]
  }]
}]
export const staticRoutes = []

export default [...dynamicRoutes, staticRoutes]
