import { Suspense, lazy, ReactNode } from 'react';
import { RouteObject, Link, useParams, useRoutes, Navigate } from 'react-router-dom';
import { Spin } from 'antd';

import Layout from '../layout';
const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));
const AerialDrone = lazy(() => import('../pages/AerialDrone'));
const HandheldCamera = lazy(() => import('../pages/HandheldCamera'));
const List1 = lazy(() => import('../pages/Test/list/list1'));

// const User = () => {
//     return (
//         <div>
//             <Link to="/user/detail/1">用户1</Link>
//         </div>
//     );
// };
// const Detail = () => {
//     const param = useParams();
//     return <div>detail：{param.id}</div>;
// };
const lazyLoad = (children: ReactNode): ReactNode => {
    return <Suspense fallback={<Spin />}>{children}</Suspense>;
};
const router: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: lazyLoad(<Home />),
            },
            { path: '/aerialDrone', element: lazyLoad(<AerialDrone />) },
            { path: '/handheldCamera', element: lazyLoad(<HandheldCamera />) },
            { path: '/List1', element: lazyLoad(<List1 />)},
            // { path: '/user', element: lazyLoad(<User />) },
            // { path: '/user/detail/:id', element: lazyLoad(<Detail />) },
        ],
    },
    { path: '/login', element: lazyLoad(<Login />) },
];
export default () => {
    return useRoutes(router);
};

// const router: RouteObject[] = [
//     /* Navigate路由重定向 */
//     { path: '/', element: <Navigate to="/login" /> },
//     { path: '/login', element: <Login /> },
//     {
//         path: '/home',
//         element: <Layout />,
//         children: [
//             {
//                 index: true,
//                 element: lazyLoad(<Login />),
//             },
//             { path: '/home/user', element: lazyLoad(<User />) },
//             { path: '/home/user/detail/:id', element: lazyLoad(<Detail />) },
//         ],
//     },
// ];
