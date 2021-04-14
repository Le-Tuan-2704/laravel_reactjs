import { Breadcrumb } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';

function Content1({ props }) {
    return (
        <div>
            <Content className="bg-blue" style={{ margin: '5px 16px', padding: '10px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, height: 360 }}>
                    <h1>{props}</h1>
                </div>
            </Content>
        </div>
    );
}

export default Content1;