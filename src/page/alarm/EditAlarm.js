import React from 'react';
import { message, Modal } from 'antd';
import { axios, handleFailure } from '../../http_request/default';
import { updateAlarmUrl } from '../../http_request/url';
import AlarmModalForm from './AlarmModalForm';

export default function EditAlarm({ visible, onClose, data, refresh }) {
    const { chemicalId, id } = data;

    const onValidate = (values, resetFields, processData) => {
        Modal.confirm({
            title: `是否确认修改报警：${values['title']}？`,
            onOk() {
                resetFields();
                const data = { ...values, chemicalId, id };

                processData(data);

                return axios.post(updateAlarmUrl, data)
                    .then(function (response) {
                        console.log(response);
                        onClose();
                        refresh();
                        message.success('修改报警成功！');
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
            data={data}
            onEdit
            onValidate={onValidate}
            modalTitle={'编辑报警'}
        />
    );
}
