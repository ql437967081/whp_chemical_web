import React from 'react';
import { List, Space, Typography } from 'antd';
import SearchList from './SearchList';
import DetailDrawer from './DetailDrawer';

export default class AlarmManage extends React.Component {
    state = {
        alarmList: [],
        drawerVisible: false,
        drawerData: null
    };

    setAlarmList = alarmList => this.setState({ alarmList });

    renderItem = item => {
        const { Link, Paragraph, Title } = Typography;

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

    closeDrawer = () => this.setState({ drawerVisible: false });

    render() {
        const { alarmList, drawerVisible, drawerData } = this.state;

        return (
            <>
                <Space direction={"vertical"} style={{ width: '100%' }}>
                    <SearchList setAlarmList={this.setAlarmList} />
                    <List
                        dataSource={alarmList}
                        bordered
                        renderItem={this.renderItem}
                        locale={{ emptyText: '没有符合条件的报警信息' }}
                    />
                </Space>
                <DetailDrawer
                    visible={drawerVisible}
                    onClose={this.closeDrawer}
                    data={drawerData}
                />
            </>
        );
    }
}
