import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { MenuProps, Layout, Menu, theme } from 'antd';

import { StyledLayout } from './styled';

const { Header, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];
const getItem = (
    label: React.ReactNode,
    key: React.Key,
    // icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem => {
    return {
        key,
        // icon,
        children,
        label,
    } as MenuItem;
};
const items: MenuItem[] = [
    getItem('航拍无人机', '/aerialDrone'),
    getItem('手持摄影设备', '/handheldCamera'),
    getItem('商品产品及方案', 'ProductsSolutions', [
        getItem('行业应用', '/test3'),
        getItem('农业应用', '/test4'),
        getItem('车载应用', '/test5'),
        getItem('教育应用', '/test6'),
    ]),
    getItem('探索精彩', 'sub2', [
        getItem('天空之城', '/test7'),
        getItem('大疆社区', '/test8'),
        getItem('新闻中心', '/test9'),
        getItem('官方周边', '/test10'),
        getItem('招聘精英', '/test11'),
        getItem('精彩活动', '/test12'),
        getItem('选购指南', '/test13'),
    ]),
    getItem('服务与支持', '/test14'),
    getItem('购买渠道', '/test15'),
    getItem('虚拟列表', '/List1'),
];
const App: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();

    const menuClick = (e: { key: string }) => {
        console.log('点击了菜单', e.key);
        navigate(e.key);
    };

    return (
        <StyledLayout className="layout" style={{ height: '100%' }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['/aerialDrone']}
                    items={items}
                    onClick={menuClick}
                />
            </Header>
            <Content style={{ padding: '10px 10px 0px' }}>
                <div
                    className="site-layout-content"
                    style={{ background: colorBgContainer, height: '100%' }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Copyright © 2023 本人测试 版权所有 本网站所有内容均属于“测试”
            </Footer>
        </StyledLayout>
    );
};

export default App;
