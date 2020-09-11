import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';

const primaryButtonProps = { type: 'primary', danger: false };
const dangerButtonProps = { type: 'default', danger: true };

const stateTypes = [
    { name: '-', operations: [] },
    {
        name: '提交',
        operations: [
            { op: '开始处理', buttonProps: { ...primaryButtonProps, icon: <PlayCircleOutlined /> }, toState: 2 },
            { op: '拒绝处理', buttonProps: { ...dangerButtonProps, icon: <CloseCircleOutlined /> }, toState: 4 }
        ]
    },
    {
        name: '正在处理',
        operations: [
            { op: '处理完成', buttonProps: { ...primaryButtonProps, icon: <CheckCircleOutlined /> }, toState: 3 }
        ]
    },
    { name: '已处理', operations: [] },
    { name: '拒绝处理', operations: [] }
];

const qqMapKey = '6J2BZ-UOHRJ-D63FH-KXB4N-LDMU5-PQFPD';

const webServiceSecretKey = '4SITQScz2lys40QRGY8PrGId6ceiyze7';

const defaultCenter = { latitude: 39.9, longitude: 116.4 };

const nullPos = ',';

const parseLatLng = position => {
    const latLng = position.split(',');
    const latitude = parseFloat(latLng[1]);
    const longitude = parseFloat(latLng[0]);
    return { latitude, longitude };
};

export { stateTypes, qqMapKey, webServiceSecretKey, defaultCenter, nullPos, parseLatLng };
