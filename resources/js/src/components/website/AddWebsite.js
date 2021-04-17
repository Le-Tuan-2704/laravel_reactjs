import { Button, Card, Form, Input, Space } from 'antd';
import React from 'react';
import UpImg from './UpImg';


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 20,
        span: 4,
    },
};


const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


function AddWebsite(props) {

    return (
        <div className="heroBlock fix-center">
            <Space direction="vertical">
                <Card title="Thêm website" style={{ width: 500 }}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Tên website"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Tên website!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="URL website"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your URL website!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Mô tả!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Hình ảnh"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Hình ảnh!',
                                },
                            ]}
                        >
                            <UpImg />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit"> Thêm </Button>
                        </Form.Item>
                    </Form>
                </Card>

            </Space>

        </div >
    );
}

export default AddWebsite;