import { Button, Card, Col, Divider, Empty, Modal, Row, Space, Table } from 'antd';
import 'antd/dist/antd.css';
import ButtonGroup from 'antd/lib/button/button-group';
import Search from 'antd/lib/input/Search';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ShowWebsite(props) {

    var heightScreen = screen.availHeight;
    // loading list website
    const [loadingWebsite, setLoadingWebsite] = useState(true);

    // console.log(heightScreen);
    const columns = [
        {
            title: 'Stt',
            dataIndex: 'key',
            key: 'key',
            width: '60px',
        },
        { title: 'Tên Website', dataIndex: 'name', key: 'name' },
        { title: 'Đường dẫn', dataIndex: 'url', key: 'url' },
        { title: 'Mô tả', dataIndex: 'description', key: 'des' },
        {
            title: 'Hành động',
            dataIndex: 'operation',
            key: 'Hành động',
            width: '150px',
            render: (_, record) => (
                <Space size="middle">
                    <ButtonGroup>
                        <Button type="primary">
                            <Link to={`/website/edit?id=${record.id}`} >Sửa</Link>
                        </Button>
                        <Button type="danger" onClick={() => showModal(record.id)}>
                            <p>Xóa</p>
                        </Button>
                    </ButtonGroup>
                </Space>
            )
        },
    ];

    // get datawebsite
    const [dataWebsite, setDataWebsite] = useState([]);
    async function getWebsite() {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/websites',
        }).then(res => {
            res.data.data.map((data, index) => {
                data.key = index + 1;
            })
            setDataWebsite(res.data.data);
            setLoadingWebsite(false);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getWebsite();
    }, []);


    // delete modal
    const [isModalVisible, setIsModalVisible] = useState(null);

    const showModal = (val) => {
        setIsModalVisible(val);
    };

    const handleOk = () => {
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/websites/${isModalVisible}`,
        }).then(res => {
            console.log(res);
            getWebsite();
            setIsModalVisible(null);
        }).catch(err => {
            console.log(err);
        });
    };

    const handleCancel = () => {
        setIsModalVisible(null);
    };

    // search website

    const onSearch = value => {
        value = value.trim();
        if (!value) {
            getWebsite();
            return;
        }

        if (value.length < 3) {
            console.log("nhập hơn 3 ký tự để tìm kiếm!!!");
            return;
        };
        var dataSearch = [];
        dataWebsite.map(data => {
            if (data.name.includes(value) || data.url.includes(value) || data.description.includes(value)) {
                dataSearch.push(data);
            }
        })
        if (!dataSearch) {
            console.log("ko có dữ liệu");
        } else {
            setDataWebsite(dataSearch);
        }
    }

    return (
        <div className="heroBlock fix-center">
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn chứ???</p>
            </Modal>
            <Space direction="vertical" className="fix-box">
                <Card>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={18}>
                            <Col span={18} offset={6}>
                                <Search
                                    placeholder="nhập từ khóa tìm kiếm"
                                    allowClear
                                    enterButton="Tìm Kiếm"
                                    size="middle"
                                    onSearch={onSearch}
                                />
                            </Col>
                        </Col>
                        <Col span={6}>
                            <Button size="middle" type="primary" className="block-right">
                                <Link to="/website/add"><span><i className="fas fa-plus" /> Thêm Website</span></Link>
                            </Button>
                        </Col>
                    </Row>

                    <Divider />

                    <Table
                        className="table table-striped"
                        loading={loadingWebsite}
                        bordered={true}
                        columns={columns}
                        dataSource={dataWebsite}
                        pagination={{ pageSize: 10 }}
                        scroll={{ y: heightScreen * 0.5 }}
                    />

                </Card>

            </Space>
        </div>
    );
}

export default ShowWebsite;