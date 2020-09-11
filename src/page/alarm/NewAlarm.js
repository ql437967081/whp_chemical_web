import React from 'react';
import { message, Modal } from 'antd';
import { axios, handleFailure } from '../../http_request/default';
import { addAlarmUrl } from '../../http_request/url';
import AlarmModalForm from './AlarmModalForm';

export default function NewAlarm({ visible, onClose, chemicalId, chemicalName }) {
    const onValidate = (values, resetFields, processData) => {
        Modal.confirm({
            title: `是否确认提交报警：${values['title']}？`,
            onOk() {
                resetFields();
                const data = { ...values, chemicalId };

                processData(data);

                return axios.post(addAlarmUrl, data)
                    .then(function (response) {
                        console.log(response);
                        onClose();
                        message.success('报警成功！');
                    })
                    .catch(handleFailure);
            },
            onCancel() {}
        });
    };

    return (
        <AlarmModalForm
            visible={visible}
            onClose={onClose}
            data={{ chemicalName }}
            onValidate={onValidate}
            modalTitle={'新增报警'}
        />
    );
}
