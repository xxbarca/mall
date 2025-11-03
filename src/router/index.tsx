import { createBrowserRouter } from 'react-router-dom';
import routes from './routes.tsx'

// 创建router路由实例对象，并配置路由对应关系（路由数组）
const router = createBrowserRouter(routes);

export default router;
