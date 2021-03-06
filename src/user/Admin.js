import React from 'react';
import { Breadcrumb, Layout, Space } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import AdminMenu from '../menu/AdminMenu';
import { logout } from '../router/config';
import './Admin.css';

const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends React.Component {
    state = {
        menuPath: []
    };

    compareArray = (arr1, arr2) => {
        if (arr1.length !== arr2.length)
            return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    };

    setMenuPath = menuPath => {
        if (menuPath && !this.compareArray(this.state.menuPath, menuPath))
            this.setState({ menuPath });
    };

    render() {
        const { menuPath } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                >
                    <div className={'logo'} />
                    <AdminMenu setMenuPath={this.setMenuPath} />
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <Space size={"large"} style={{ float: 'right', marginRight: 50 }}>
                            {`${sessionStorage.getItem('nickname')}：${sessionStorage.getItem('username')}`}
                            <Link to={'/login'} onClick={() => logout()}>
                                <Space>
                                    <LogoutOutlined />
                                    登出
                                </Space>
                            </Link>
                        </Space>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {menuPath.map((menuTitle, index) => (
                                <Breadcrumb.Item key={index}>{menuTitle}</Breadcrumb.Item>
                            ))}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}
