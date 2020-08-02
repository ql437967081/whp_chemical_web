import React from 'react';
import { List, message, Modal, Space, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SearchList from './SearchList';
import DetailDrawer from './DetailDrawer';
import { stateTypes } from './config';
import { axios, handleFailure } from '../../http_request/default';
import { deleteAlarmUrl } from '../../http_request/url';

export default class AlarmManage extends React.Component {
    state = {
        refreshList: false,
        alarmList: [],
        drawerVisible: false,
        drawerData: null
    };

    setAlarmList = alarmList => this.setState({ refreshList: false, alarmList });

    renderItem = item => {
        const { Link, Paragraph, Title } = Typography;

        const { id, title, createTime, state } = item;
        const time = new Date(createTime);
        const timeStr =
            `${time.toISOString().substr(0, 10)}
             ${time.toTimeString().substr(0, 8)}`;

        const showDetailDrawer = () => this.setState({ drawerVisible: true, drawerData: item });

        const deleteAlarm = () => {
            const refresh = () => this.setState({ refreshList: true });

            Modal.confirm({
                title: `是否确定删除报警信息：${title}？`,
                icon: <ExclamationCircleOutlined />,
                onOk() {
                    return axios.post(deleteAlarmUrl, null, { params: { alarmId: id } })
                        .then(function (response) {
                            console.log(response);
                            message.success(`报警信息（${title}）删除成功！`);
                            refresh();
                        })
                        .catch(handleFailure);
                },
                onCancel() {}
            });
        };

        return (
            <List.Item
                key={id}
                actions={[
                    <Link
                        key={`detail-${id}`}
                        onClick={showDetailDrawer}
                    >
                        查看详情
                    </Link>,
                    <Link
                        key={`delete-${id}`}
                        onClick={deleteAlarm}
                    >
                        删除
                    </Link>
                ]}
            >
                <Typography>
                    <Title level={4}>{title}</Title>
                    <Paragraph>
                        处理状态：{stateTypes[state]}
                    </Paragraph>
                    <Paragraph>
                        {timeStr}
                    </Paragraph>
                </Typography>
            </List.Item>
        );
    };

    closeDrawer = () => this.setState({ drawerVisible: false });

    render() {
        const { refreshList, alarmList, drawerVisible, drawerData } = this.state;

        return (
            <>
                <Space direction={"vertical"} style={{ width: '100%' }}>
                    <SearchList setAlarmList={this.setAlarmList} refresh={refreshList} />
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
