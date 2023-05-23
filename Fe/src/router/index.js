import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from 'react-router-dom';

import Login from '../pages/login';

export default () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="/test" element={<Test />}>
                        <Route path=":id" element={<TestDetail />}></Route>
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </Router>
    );
};

const Layout = () => {
    return (
        <div>
            <Link to="/">登录</Link>
            <Link to="test">测试</Link>
            <Outlet />
        </div>
    );
};
const Test = () => {
    return (
        <div>
            <h1>test</h1>
            <Link to="123">详情</Link>
            <Outlet />
        </div>
    );
};
const TestDetail = () => {
    const params = useParams();
    return <div>test detail：{params.id}</div>;
};
const NoMatch = () => {
    return <div>404</div>;
};
