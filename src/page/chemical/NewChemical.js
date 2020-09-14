import React from 'react';
import { message, Modal } from 'antd';
import ChemicalForm from './ChemicalForm';
import { axios, handleFailure } from '../../http_request/default';
import { addChemicalUrl, genQrCodeUrl, getChemicalDetailUrl } from '../../http_request/url';

export default function NewChemical({ onAdditionSuccess }) {
    const onFormFinish = (values, processData) => {
        Modal.confirm({
            title: '是否确认提交并生成二维码？',
            onOk() {
                const { post } = axios;
                const addChemicalVO = processData(values);
                console.log('Final addChemicalVO: ', addChemicalVO);
                const { cnName, cas } = addChemicalVO;
                return post(addChemicalUrl, addChemicalVO)
                    .then(function (response) {
                        console.log(response.data);
                        return post(genQrCodeUrl, { cas });
                    })
                    .then(function (response) {
                        console.log(response.data);
                        message.success(`化学品 ${cnName} 添加成功！`);
                        return post(getChemicalDetailUrl, { cas });
                    })
                    .then(function (response) {
                        onAdditionSuccess(response.data['data']);
                    })
                    .catch(handleFailure);
            },
            onCancel() {}
        });
    };

    return (
        <ChemicalForm onFormFinish={onFormFinish} />
    );
}
