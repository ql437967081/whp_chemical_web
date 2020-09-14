import React from 'react';
import { Affix, Button, Checkbox, Col, Collapse, Form, Input, message, Row, Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import * as cfg from './config/config';

const { Panel } = Collapse;
const { collapseHeaderConfig } = cfg;

const processDescriptions = (descriptionsConfig, index, config) => {
    const layout = {
        xs: 24, sm: 12, xl: 8
    };
    config.push({
        formItems: (
            <Row gutter={24}>
                {descriptionsConfig.map(props => {
                    const { label, key, required } = props;
                    const formItemProps = {
                        name: key, label
                    };
                    if (required) {
                        formItemProps['rules'] = [
                            {
                                required: true,
                                message: `请输入${label}`
                            }
                        ];
                    }
                    return (
                        <Col {...layout} key={key}>
                            <Form.Item {...formItemProps}>
                                <Input />
                            </Form.Item>
                        </Col>
                    );
                })}
            </Row>
        ),
        ...collapseHeaderConfig[index]
    });
};

const processTypography = (index, config) => {
    const typographyConfig = collapseHeaderConfig[index];
    const { key, header } = typographyConfig;
    config.push({
        formItems: (
            <Form.Item name={key}>
                <Input.TextArea placeholder={`请输入${header}`} />
            </Form.Item>
        ),
        ...typographyConfig
    });
};

const processLabeledTypography = (labeledTypographyConfig, index, config) => {
    const layout = {
        labelCol: { xs: 24, sm: 7 },
        wrapperCol: { xs: 24, sm: 16 }
    };
    config.push({
        formItems: labeledTypographyConfig.map(props => {
            const { label, key, placeholder } = props;
            return (
                <Form.Item {...layout} label={label} name={key} key={key}>
                    <Input.TextArea
                        placeholder={placeholder ? placeholder : `请输入${label}`}
                    />
                </Form.Item>
            );
        }),
        ...collapseHeaderConfig[index]
    });
};

const processBasic = config => {
    processDescriptions(cfg.basicConfig, 0, config);
    config[0]['disabled'] = true;
};

const processEmergency = config => processTypography(1, config);

const processPhysicalChemicalProperties = config =>
    processDescriptions(cfg.physicalChemicalPropertiesConfigForAddition, 2, config);

const processDangerClass = config => {
    const ghsTags = [];
    for (let i = 1; i <= 9; i++) {
        ghsTags.push(`GHS0${i}`);
    }
    config.push({
        formItems: (
            <>
                <Form.Item name={'other'}>
                    <Checkbox.Group>
                        {ghsTags.map(ghsTag => (
                            <Checkbox value={ghsTag} key={ghsTag}>{ghsTag}</Checkbox>
                        ))}
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item name={'dangerClass'}>
                    <Input.TextArea placeholder={'请输入GHS危险性类别'} />
                </Form.Item>
            </>
        ),
        ...collapseHeaderConfig[3]
    });
};

const processDanger = config => processTypography(4, config);

const processPrevent = config => processTypography(5, config);

const processResponse = config => processTypography(6, config);

const processStorage = config => processTypography(7, config);

const processDisposal = config => processLabeledTypography(cfg.disposalConfigForAddition, 8, config);

const processPhysicalChemical = config => processTypography(9, config);

const processHealth = config => processTypography(10, config);

const processEnvironment = config => processTypography(11, config);

const processFirstAid = config => processLabeledTypography(cfg.firstAidConfig, 12, config);

const processLeakMethod = config => processLabeledTypography(cfg.leakMethodConfig, 13, config);

const processStepStoreAttentionConfig = config =>
    processLabeledTypography(cfg.stepStoreAttentionConfig, 14, config);

const processEngControl = config => processTypography(15, config);

const processSelfProtectConfig = config => processLabeledTypography(cfg.selfProtectConfig, 16, config);

const processTransAttention = config => processTypography(17, config);

const processBook = config => {
    const layout = {
        wrapperCol: { lg: { offset: 2 }, xl: { offset: 3 }, xxl: { offset: 4 } }
    };
    config.push({
        formItems: cfg.bookConfig.map(props => {
            const { label, key } = props;
            return (
                <Form.Item {...layout} name={key} key={key} valuePropName="checked">
                    <Checkbox>{label}</Checkbox>
                </Form.Item>
            );
        }),
        ...collapseHeaderConfig[18]
    });
};

const processData = config => {
    processBasic(config);
    processEmergency(config);
    processPhysicalChemicalProperties(config);
    processDangerClass(config);
    processDanger(config);
    processPrevent(config);
    processResponse(config);
    processStorage(config);
    processDisposal(config);
    processPhysicalChemical(config);
    processHealth(config);
    processEnvironment(config);
    processFirstAid(config);
    processLeakMethod(config);
    processStepStoreAttentionConfig(config);
    processEngControl(config);
    processSelfProtectConfig(config);
    processTransAttention(config);
    processBook(config);
};

export default function NewChemicalForm({ onFormFinish, onEdit }) {
    const processChemicalValue = value => {
        const { other } = value;
        const addChemicalVO = {
            ...value,
            other: other ? other.sort().join('|') : other,
        };

        for (let propName in addChemicalVO) {
            if (!addChemicalVO[propName]) addChemicalVO[propName] = '';
        }

        for (let book of cfg.bookConfig) {
            const bookKey = book.key;
            addChemicalVO[bookKey] = value[bookKey] ? 1 : 0;
        }

        return addChemicalVO;
    };

    const onFinish = values => {
        console.log('Received values of form: ', values);
        onFormFinish(values, processChemicalValue);
    };

    const onFinishFailed = info => {
        console.log('Validate Failed:', info);
        message.error(info.errorFields[0].errors[0]);
    };

    const config = [];

    processData(config);

    return (
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={onEdit}>
            <Space direction={"vertical"}>
                <Collapse defaultActiveKey={collapseHeaderConfig[0].key}>
                    {config.map(props => {
                        const { key, header, formItems, disabled } = props;
                        const panelProps = { key, header, forceRender: true };
                        if (disabled) { panelProps['disabled'] = true; }
                        return (
                            <Panel {...panelProps}>
                                {formItems}
                            </Panel>
                        );
                    })}
                </Collapse>
                <Row justify="space-between">
                    <Col />
                    <Col>
                        <Affix offsetBottom={10}>
                            <Button type="primary" icon={<CheckOutlined />} htmlType="submit">
                                提交
                            </Button>
                        </Affix>
                    </Col>
                </Row>
            </Space>
        </Form>
    );
}
