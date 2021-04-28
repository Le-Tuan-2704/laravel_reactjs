import { Card, Divider, List } from 'antd';
import { Meta } from 'antd/lib/list/Item';
import { useEffect, useState } from 'react';

function Home(props) {
    const [dataWebsiteOK, setDataWebsiteOK] = useState([]);
    const [dataWebsiteError, setDataWebsiteError] = useState([]);
    const [checkConnect, setCheckConnect] = useState(false);
    async function getWebsite() {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/api/trangchu',
        }).then(res => {
            console.log(res.data);
            setDataWebsiteError(res.data.dataError);
            setDataWebsiteOK(res.data.dataOk);
            setCheckConnect(true);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getWebsite();
    }, []);

    return (
        <div className="div-test">

            <List
                header={
                    <h1>Website còn hoạt động</h1>
                }
                grid={{ gutter: 16, column: 3 }}
                dataSource={dataWebsiteOK}
                loading={!checkConnect}
                itemLayout="horizontal"
                pagination={{ pageSize: 3 }}

                renderItem={item => (
                    <List.Item>

                        <Card
                            hoverable
                            style={{ width: 360, }}
                            cover={
                                <img alt="example" height={270} src={location.origin + "/" + item.image} />
                            }
                        >
                            <Divider />
                            <Meta title={item.name} description={<p>www.{item.url}</p>} />
                        </Card>
                    </List.Item>
                )}
            />


            <List
                header={
                    <h1>Website ngừng hoạt động</h1>
                }
                grid={{ gutter: 16, column: 4 }}
                dataSource={dataWebsiteError}
                loading={!checkConnect}
                itemLayout="horizontal"
                pagination={{ pageSize: 4 }}

                renderItem={item => (
                    <List.Item>

                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title={item.name} description={`www.${item.url}`} />
                        </Card>
                    </List.Item>
                )}
            />


        </div>

    )
}
export default Home;