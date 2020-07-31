import React from 'react';
import { List, Space, Typography } from 'antd';
import DetailDrawer from './DetailDrawer';
import { axios, handleFailure } from '../../http_request/default';
import { getAlarmListUrl } from '../../http_request/url';

const { Link, Paragraph, Title } = Typography;

export default class AlarmManage extends React.Component {
    state = {
        alarmList: [],
        drawerVisible: false,
        drawerData: null
    };

    componentDidMount() {
        const handleSuccess = response => {
            console.log(response);
            this.setState({
                alarmList: response.data['data']
            });
        };
        axios.get(getAlarmListUrl).then(handleSuccess).catch(handleFailure);
    }

    render() {
        const { alarmList, drawerVisible, drawerData } = this.state;
        const renderItem = item => {
            const { id, title, createTime } = item;
            const time = new Date(createTime);
            const timeStr =
                `${time.toISOString().substr(0, 10)}
                 ${time.toTimeString().substr(0, 8)}`;
            return (
                <List.Item
                    key={id}
                    actions={[
                        <Link
                            key={`Link-${id}`}
                            onClick={() => this.setState({ drawerVisible: true, drawerData: item })}
                        >
                            查看详情
                        </Link>
                    ]}
                >
                    <Typography>
                        <Title level={4}>{title}</Title>
                        <Paragraph>
                            {timeStr}
                        </Paragraph>
                    </Typography>
                </List.Item>
            );
        };
        return (
            <>
                <Space direction={"vertical"}>
                    <List
                        dataSource={alarmList}
                        bordered
                        renderItem={renderItem}
                    />
                    <DetailDrawer
                        visible={drawerVisible}
                        onClose={() => this.setState({ drawerVisible: false })}
                        data={drawerData}
                    />
                </Space>
            </>
        );
    }
}
