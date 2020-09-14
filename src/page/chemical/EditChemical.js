import React from 'react';
import { message, Modal } from 'antd';
import ChemicalForm from './ChemicalForm';
import { bookConfig } from './config/config';
import { axios, handleFailure } from '../../http_request/default';
import { updateChemicalUrl } from '../../http_request/url';

export default function EditChemical({ data, onEditionSuccess }) {
    const { id, uri, disposalOverview, other, ...restValues } = data;

    const onEdit = {
        other: other.split('|'),
        ...restValues
    };

    for (let book of bookConfig) {
        const bookKey = book.key;
        onEdit[bookKey] = data[bookKey] === 1;
    }

    const onFormFinish = (values, processData) => {
        Modal.confirm({
            title: '是否确认提交修改？',
            onOk() {
                const updateChemicalVO = { id, ...processData(values)};
                console.log('Final updateChemicalVO: ', updateChemicalVO);
                return axios.post(updateChemicalUrl, updateChemicalVO)
                    .then(function (response) {
                        const { data } = response.data;
                        message.success(`化学品 ${data.cnName} 修改成功！`);
                        onEditionSuccess(data);
                    })
                    .catch(handleFailure);
            },
            onCancel() {}
        });
    };

    return (
        <ChemicalForm onFormFinish={onFormFinish} onEdit={onEdit} />
    );
}
