import { Button, Card, Form, Input, Space } from 'antd';
import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';
import UpImg from './UpImg';


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 20,
        span: 4,
    },
};


const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


function AddWebsite(props) {
    let history = useHistory();
    const onFinish = (values) => {

        var data = {
            'name': values.nameWebsite,
            'url': values.urlWebsite,
            'description': values.describeWebsite
        }
        console.log('Success:', data);
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/websites',
            data: data
        }).then(res => {
            console.log(res);
            history.push("/website");
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="heroBlock fix-center">
            <Space direction="vertical" className="fix-box">
                <Card title="Thêm website">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <br />
                        <Form.Item
                            label="Tên website"
                            name="nameWebsite"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Tên website!',
                                },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>
                        <br />
                        <Form.Item
                            label="URL website"
                            name="urlWebsite"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your URL website!',
                                },
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>
                        <br />
                        <Form.Item
                            label="Mô tả"
                            name="describeWebsite"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Mô tả!',
                                },
                            ]}
                        >
                            <Input.TextArea allowClear />
                        </Form.Item>
                        <br />
                        <Form.Item
                            label="Hình ảnh"
                            name="ImgWebsite"

                        >
                            <UpImg />
                        </Form.Item>
                        <br />
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit"> Thêm </Button>
                        </Form.Item>
                        <br />
                        <br />
                    </Form>
                </Card>

            </Space>

        </div >
    );
}

export default AddWebsite;