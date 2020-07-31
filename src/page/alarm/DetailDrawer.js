import React from 'react';
import { Descriptions, Drawer } from 'antd';
import ReactQMap from 'better-react-qmap';
import { stateTypes, qqMapKey } from './config';

export default function DetailDrawer(props) {
    const { visible, onClose, data }= props;

    const _setMarker = (classMap, windowMap, position) => {
        const { latitude, longitude } = position;
        const marker = new windowMap.Marker({
            map: classMap,
            position: new windowMap.LatLng(latitude, longitude),
            animation: windowMap.MarkerAnimation.DROP,
        });
        console.log(marker);
    };

    const renderContent = () => {
        if (!data)
            return <p>Some contents...</p>;

        const { chemicalName, username, contact, title, type, position, address, remarks, state } = data;
        const latLng = position.split(',');
        const latitude = parseFloat(latLng[1]);
        const longitude = parseFloat(latLng[0]);
        const center = { latitude, longitude };

        const { Item } = Descriptions;
        return (
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
                <Item label={'处理状态'}>{stateTypes[state]}</Item>
            </Descriptions>
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
