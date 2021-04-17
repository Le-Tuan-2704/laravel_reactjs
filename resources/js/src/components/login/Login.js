import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, Space } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

Login.propTypes = {

};


function Login({ setToken }) {


    // const { changeStatusLogin } = useContext(StatusLoginContext);

    const [data, setData] = useState({
        email: "",
        password: ""
    })



    useEffect(() => {
        async function connectApi() {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/login',
                data: data
            }).then(res => {
                if (res.data.code == 200) {
                    const token = res.data.data.token;
                    setToken(token);

                } else {
                    console.log(res.data);
                }
            }).catch(err => {
                console.log(err);
            });
            // console.log(data);
        }
        connectApi();
    }, [data]);

    const onSubmit = (values) => {
        // console.log(values);
        setData({
            email: values.email,
            password: values.password
        });
    };


    return (
        <div className="heroBlock fix-center">
            <Space direction="vertical">
                <Card title="Login" orientation="center" style={{ width: 500 }}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onSubmit}
                    >

                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}

                        >
                            <Input
                                name="email"
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                type="email"
                                // onChange={handleChange}
                                placeholder="email"
                            // value={data.email} 
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}

                        >
                            <Input
                                name="password"
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                // onChange={handleChange}
                                placeholder="Password"
                            // value={data.password}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                Log in</Button>
                            <span align="center">Or <Link to="/register">register now!</Link></span>

                        </Form.Item>
                    </Form>

                </Card>
            </Space>
        </div>
    );
}

export default Login;