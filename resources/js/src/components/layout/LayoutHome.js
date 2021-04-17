
import {
    DesktopOutlined,
    FileOutlined,
    LaptopOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Affix, Button, Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useToken from '../../hookCustom/useToken';
import Login from '../login/Login';
import AddWebsite from '../website/AddWebsite';
const { SubMenu } = Menu;

const { Header, Content, Footer, Sider } = Layout;

function LayoutHome(props) {

    const { token, setToken } = useToken();
    const logoutUser = () => {
        setToken("");
    }

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = coll => {
        console.log(coll);
        setCollapsed(coll);
    };

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>

                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}
                    style={{

                    }}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ marginBottom: 20 }}>
                        <Menu.Item key="1" icon={<LaptopOutlined />}>
                            <Link to='/'>Website</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                            <Menu.Item key="3">Tom</Menu.Item>
                            <Menu.Item key="4">Bill</Menu.Item>
                            <Menu.Item key="5">Alex</Menu.Item>

                        </SubMenu>
                        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>

                        </SubMenu>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Files
                        </Menu.Item>
                    </Menu>

                    <Affix offsetBottom={40} style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                        <Button type="primary" onClick={logoutUser} block>Logout</Button>
                    </Affix>
                </Sider>

                <Layout className="site-layout">
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div className="container ">
                            <h1 className="text-white">ABC</h1>
                        </div>
                    </Header> */}

                    <AddWebsite />

                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </div >
    );
}

export default LayoutHome;