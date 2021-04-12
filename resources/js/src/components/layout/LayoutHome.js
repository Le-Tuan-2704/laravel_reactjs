import { Layout } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import Login from '../login/Login';
import './LayoutHome.css';
import useToken from '../../hookCustom/useToken';
const { Header, Footer, Sider, Content } = Layout;


function LayoutHome(props) {

    // const { token, setToken } = useToken();
    const [token, setToken] = useState();

    // console.log("token:" + token);
    if (!token) {
        return <Login setToken={setToken} />;
    }


    return (
        <div>
            <Layout >
                <Sider className="bg-blue">Sider</Sider>
                <Layout>
                    <Header className="div-title">Header</Header>
                    <Content>
                        <div className=" div-content">
                            container-1
                        </div>
                        <div className=" div-content">
                            container-2
                        </div>
                    </Content>
                    <Footer className="div-title">Footer</Footer>
                </Layout>
            </Layout>
        </div>
    );
}

export default LayoutHome;