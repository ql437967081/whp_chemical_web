import React from 'react';
import { Button, Checkbox, Col, Collapse, Form, Input, Row, Space } from 'antd';
import * as cfg from './config/config';
import { axios, handleFailure } from '../../http_request/default';
import { addChemicalUrl } from '../../http_request/url';

const { Panel } = Collapse;
const { collapseHeaderConfigForAddition } = cfg;

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
        ...collapseHeaderConfigForAddition[index]
    });
};

const processTypography = (index, config) => {
    const typographyConfig = collapseHeaderConfigForAddition[index];
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
        ...collapseHeaderConfigForAddition[index]
    });
};

const processBasic = config => {
    processDescriptions(cfg.basicConfig, 0, config);
    config[0]['disabled'] = true;
};

const processEmergency = config => processTypography(1, config);

const processPhysicalChemicalProperties = config =>
    processDescriptions(cfg.physicalChemicalPropertiesConfigForAdditon, 2, config);

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
        ...collapseHeaderConfigForAddition[3]
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
    processLabeledTypography(cfg.stepStoreAttentionConfigForAddition, 14, config);

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
        ...collapseHeaderConfigForAddition[18]
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

const NewChemicalForm = () => {

    const onFinish = values => {
        console.log('Received values of form: ', values);
        const { other } = values;
        const addChemicalVO = {
            ...values,
            other: other ? other.sort().join('|') : other,
        };
        for (let book of cfg.bookConfig) {
            const bookKey = book.key;
            addChemicalVO[bookKey] = values[bookKey] ? 1 : 0;
        }
        console.log('Final addChemicalVO: ', addChemicalVO);
        axios.post(addChemicalUrl, addChemicalVO).then(function (response) {
            console.log(response);
        }).catch(handleFailure);
    };

    const config = [];

    processData(config);

    return (
        <Form onFinish={onFinish}>
            <Space direction={"vertical"}>
                <Collapse defaultActiveKey={collapseHeaderConfigForAddition[0].key}>
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
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Col>
                </Row>
            </Space>
        </Form>
    );
};

export default NewChemicalForm;
