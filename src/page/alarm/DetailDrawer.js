import React from 'react';
import { Button, Col, Descriptions, Drawer, message, Modal, Row } from 'antd';
import ReactQMap from 'better-react-qmap';
import { stateTypes, qqMapKey } from './config';
import { axios, handleFailure } from '../../http_request/default';
import { handleAlarmUrl } from '../../http_request/url';

const parseLatLng = position => {
    const latLng = position.split(',');
    const latitude = parseFloat(latLng[1]);
    const longitude = parseFloat(latLng[0]);
    return { latitude, longitude };
};

export default function DetailDrawer({ visible, onClose, data, onHandleSuccess }) {
    const _setMarker = (classMap, windowMap, position) => {
        const { latitude, longitude } = position;
        const { Marker, LatLng, MarkerAnimation } = windowMap;
        const marker = new Marker({
            map: classMap,
            position: new LatLng(latitude, longitude),
            animation: MarkerAnimation.DROP,
        });
        console.log(marker);
    };

    const renderContent = () => {
        if (!data)
            return <p>Some contents...</p>;

        const { id, chemicalName, username, contact, title, type, position, address, remarks, state } = data;
        const center = parseLatLng(position);

        const { name, operations } = stateTypes[state];

        const { Item } = Descriptions;
        return (
            <>
                <Descriptions column={1}>
                    <Item label={'化学品名称'}>{chemicalName}</Item>
                    <Item label={'报警人'}>{username}</Item>
                    <Item label={'联系方式'}>{contact ? contact : '-'}</Item>
                    <Item label={'描述问题'}>{title}</Item>
                    <Item label={'类型'}>{type}</Item>
                    <Item label={'位置信息'}>{position}</Item>
                    <Item>
                        <ReactQMap
                            center={center}
                            apiVersonSrc={`https://map.qq.com/api/js?v=2.exp&key=${qqMapKey}`}
                            getMap={(map, wMap) => _setMarker(map, wMap, center)}
                            style={{ width: 340, height: 340 }}
                        />
                    </Item>
                    <Item label={'具体位置'}>{address}</Item>
                    <Item label={'备注信息'}>{remarks}</Item>
                    <Item label={'处理状态'}>{name}</Item>
                </Descriptions>
                {operations.length && (
                    <Row justify="space-around" gutter={[16, 16]}>
                        {operations.map(operation => {
                            const { op, buttonProps, toState } = operation;
                            const handleAlarm = () => {
                                Modal.confirm({
                                    title: `是否确认${op}报警：${title}？`,
                                    onOk() {
                                        return axios.post(handleAlarmUrl, {
                                            alarmId: id,
                                            managerId: parseInt(sessionStorage.getItem('managerId')),
                                            state: toState
                                        }, {
                                            params: {
                                                signature: sessionStorage.getItem('signature')
                                            }
                                        }).then(function (response) {
                                            console.log(response);
                                            message.success(`报警信息（${title}）已${op}！`);
                                            onHandleSuccess();
                                        }).catch(handleFailure);
                                    },
                                    onCancel() {}
                                });
                            };
                            return (
                                <Col key={toState}>
                                    <Button {...buttonProps} onClick={handleAlarm}>
                                        {op}
                                    </Button>
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </>
        );
    };

    return (
        <Drawer
            title="报警详情"
            closable={false}
            onClose={onClose}
            visible={visible}
            width={400}
        >
            {renderContent()}
        </Drawer>
    );
}
