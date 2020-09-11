import React from 'react';
import { message, Modal, Form, Input, Select } from 'antd';
import SelectPositionMap  from './SelectPositionMap';
import { nullPos } from './config/config';
import { axios, handleFailure } from '../../http_request/default';
import { getAlarmTypesUrl } from '../../http_request/url';

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
};

const requiredRules = label => {
    return [
        {
            required: true,
            message: `请输入${label}!`,
        },
    ];
};

export default class AlarmModalForm extends React.Component {
    state = {
        typeOptions: [],
        initType: undefined
    };

    formRef = React.createRef();

    componentDidMount() {
        const setTypeOptions = typeOptions => this.setState({ typeOptions });
        const setInitType = (type, typeName) => {
            const { data, onEdit } = this.props;
            if (onEdit && typeName === data['type']) {
                this.setState({ initType: type })
            }
        };
        axios.get(getAlarmTypesUrl)
            .then(function (response) {
                const typeOptions = [];
                const { data } = response.data;
                const { Option } = Select;
                for (let typeName in data) {
                    const type = data[typeName];
                    setInitType(type, typeName);
                    typeOptions.push(<Option value={type} key={type}>{typeName}</Option>);
                }
                setTypeOptions(typeOptions);
            })
            .catch(handleFailure);
    }

    checkPosition = (rule, value) => {
        if (value !== ',') {
            return Promise.resolve();
        }

        return Promise.reject('请选择位置信息！');
    };

    onSubmit = () => {
        const { validateFields, resetFields } = this.formRef.current;
        const { onValidate } = this.props;

        const processData = data => {
            const setNullIfUndefined = (propName, nullValue) => {
                if (!data[propName]) data[propName] = nullValue;
            };
            setNullIfUndefined('type', 0);
            setNullIfUndefined('contact', null);
            setNullIfUndefined('remarks', null);
            console.log(data);
        };

        validateFields()
            .then(values => {
                onValidate(values, resetFields, processData);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
                message.error(info.errorFields[0].errors[0]);
            });
    };

    render() {
        const { visible, onClose, data, onEdit, modalTitle } = this.props;

        const { chemicalName, username, contact, title, position, address, remarks } = data;

        const { typeOptions, initType } = this.state;

        console.log('onEdit:', onEdit);
        const initialValues = onEdit
            ? { username, contact, title, type: initType, position, address, remarks }
            : { position: nullPos };

        return (
            <Modal
                centered
                visible={visible}
                title={modalTitle}
                okText={'提交'}
                cancelText={'取消'}
                onCancel={onClose}
                onOk={this.onSubmit}
            >
                <Form
                    ref={this.formRef}
                    {...layout}
                    initialValues={initialValues}
                >
                    <Form.Item
                        label={'化学品名称'}
                    >
                        {chemicalName}
                    </Form.Item>
                    <Form.Item
                        name={'username'}
                        label={'报警人'}
                        rules={requiredRules('报警人')}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'contact'}
                        label={'联系方式'}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'title'}
                        label={'描述问题'}
                        rules={requiredRules('描述问题')}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'type'}
                        label={'报警类型'}
                    >
                        <Select
                            placeholder={'未知类型'}
                            allowClear
                        >
                            {typeOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={'position'}
                        label={'位置信息'}
                        rules={[
                            { required: true },
                            { validator: this.checkPosition }
                        ]}
                    >
                        <SelectPositionMap
                            setAddress={address => this.formRef.current.setFieldsValue({ address })}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'address'}
                        label={'具体位置'}
                        rules={requiredRules('具体位置')}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'remarks'}
                        label={'备注信息'}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
