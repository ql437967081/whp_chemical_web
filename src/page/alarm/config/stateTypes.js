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

export default stateTypes;
