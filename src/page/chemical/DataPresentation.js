import React from 'react';
import { Affix, Button, Col, Collapse, Descriptions, message, Modal, Row, Space, Typography } from 'antd';
import { DeleteOutlined, WarningOutlined } from '@ant-design/icons';
import NewAlarm from '../alarm/NewAlarm';
import * as cfg from './config/config';
import { axios, handleFailure } from '../../http_request/default';
import { delChemicalUrl } from '../../http_request/url';

const { Panel } = Collapse;
const { collapseHeaderConfig } = cfg;

export default class DataPresentation extends React.Component {
    state = {
        newAlarmFormVisible: false
    };

    openNewAlarmForm = () => this.setState({ newAlarmFormVisible: true });

    closeNewAlarmForm = () => this.setState({ newAlarmFormVisible: false });

    deleteChemical = () => {
        const { data, onDeletionComplete } = this.props;
        const { id, cnName, cas, formula } = data;
        const chemicalStr = `${cas} ${cnName} [${formula}]`;
        Modal.confirm({
            title: `是否确定删除化学品：${chemicalStr} ？`,
            onOk() {
                return axios.post(delChemicalUrl, null, { params: { chemicalId: id } })
                    .then(function (response) {
                        console.log(response);
                        onDeletionComplete();
                        message.success(`化学品：${chemicalStr} 删除成功！`);
                    })
                    .catch(handleFailure);
            },
            onCancel() {}
        });
    };

    processDescriptions = (descriptionsConfig, index) => {
        const { Item } = Descriptions;
        this.config.push({
            text: (
                <Descriptions>
                    {descriptionsConfig.map(props => {
                        const { label, key } = props;
                        return (
                            <Item label={label} key={key}>
                                {this.props.data[key]}
                            </Item>
                        );
                    })}
                </Descriptions>
            ),
            ...collapseHeaderConfig[index]
        });
    };

    processTypography = (props, index) => {
        const { Paragraph } = Typography;
        this.config.push({
            text: (
                <Typography>
                    {props.map(prop => (
                        <Paragraph key={prop}>
                            {this.props.data[prop]}
                        </Paragraph>
                    ))}
                </Typography>
            ),
            ...collapseHeaderConfig[index]
        });
    };

    processLabeledTypography = (labeledTypographyConfig, index) => {
        const { Paragraph, Text } = Typography;
        this.config.push({
            text: (
                <Typography>
                    {labeledTypographyConfig.map(props => {
                        const { label, key } = props;
                        return (
                            <Paragraph key={key}>
                                <Text strong>
                                    {label}{label.length > 0 && '：'}
                                </Text>
                                {this.props.data[key]}
                            </Paragraph>
                        );
                    })}
                </Typography>
            ),
            ...collapseHeaderConfig[index]
        });
    };

    processBasic = () => {
        const { Item } = Descriptions;
        const descriptionsItems = cfg.basicConfig.map(props => {
            const { label, key } = props;
            return (
                <Item label={label} key={key}>
                    {this.props.data[key]}
                </Item>
            );
        });
        const { uri, cnName } = this.props.data;
        const label = '二维码';
        descriptionsItems.push(
            <Item label={label} key={'uri'}>
                <Space align={"center"}>
                    <img src={uri} alt={`${cnName}${label}`} width={100} height={100} />
                </Space>
            </Item>
        );
        this.config.push({
            text: (
                <Descriptions>
                    {descriptionsItems}
                </Descriptions>
            ),
            ...collapseHeaderConfig[0],
            disabled: true
        });
    };

    processEmergency = () => this.processTypography(['emergency'], 1);

    processPhysicalChemicalProperties = () => this.processDescriptions(cfg.physicalChemicalPropertiesConfig, 2);

    processDangerClass = () => this.processTypography(['other', 'dangerClass'], 3);

    processDanger = () => this.processTypography(['danger'], 4);

    processPrevent = () => this.processTypography(['prevent'], 5);

    processResponse = () => this.processTypography(['response'], 6);

    processStore = () => this.processTypography(['store'], 7);

    processDisposal = () => this.processLabeledTypography(cfg.disposalConfig, 8);

    processPhysicalChemical = () => this.processTypography(['physicalChemical'], 9);

    processHealth = () => this.processTypography(['health'], 10);

    processEnvironment = () => this.processTypography(['environment'], 11);

    processFirstAid = () => this.processLabeledTypography(cfg.firstAidConfig, 12);

    processLeakMethod = () => this.processLabeledTypography(cfg.leakMethodConfig, 13);

    processStepStoreAttentionConfig = () => this.processLabeledTypography(cfg.stepStoreAttentionConfig, 14);

    processEngControl = () => this.processTypography(['engControl'], 15);

    processSelfProtectConfig = () => this.processLabeledTypography(cfg.selfProtectConfig, 16);

    processTransAttention = () => this.processTypography(['transAttention'], 17);

    processBook = () => {
        const { Text } = Typography;
        this.config.push({
            text: (
                <Typography>
                    <Space direction={"vertical"}>
                        {cfg.bookConfig.map(props => {
                            const { label, key } = props;
                            return (
                                this.props.data[key] === 1 &&
                                <Text underline key={key}>
                                    {label}
                                </Text>
                            );
                        })}
                    </Space>
                </Typography>
            ),
            ...collapseHeaderConfig[18]
        });
    };

    processData = () => {
        this.config = [];
        this.processBasic();
        this.processEmergency();
        this.processPhysicalChemicalProperties();
        this.processDangerClass();
        this.processDanger();
        this.processPrevent();
        this.processResponse();
        this.processStore();
        this.processDisposal();
        this.processPhysicalChemical();
        this.processHealth();
        this.processEnvironment();
        this.processFirstAid();
        this.processLeakMethod();
        this.processStepStoreAttentionConfig();
        this.processEngControl();
        this.processSelfProtectConfig();
        this.processTransAttention();
        this.processBook();
    };

    render() {
        this.processData();
        const { id, cnName } = this.props.data;
        return (
            <>
                <Space direction={"vertical"}>
                    <Collapse defaultActiveKey={this.config[0].key}>
                        {this.config.map(props => {
                            const { key, header, text, disabled } = props;
                            const panelProps = { key, header };
                            if (disabled) { panelProps['disabled'] = true; }
                            return (
                                <Panel {...panelProps}>
                                    {text}
                                </Panel>
                            )
                        })}
                    </Collapse>
                    <Row justify="space-between">
                        <Col>
                            <Affix offsetBottom={10}>
                                <Button
                                    type="primary" shape={"round"} icon={<DeleteOutlined />} danger
                                    onClick={this.deleteChemical}
                                >
                                    删除
                                </Button>
                            </Affix>
                        </Col>
                        <Col>
                            <Affix offsetBottom={10}>
                                <Button
                                    type="primary" shape={"round"} icon={<WarningOutlined />} danger
                                    onClick={this.openNewAlarmForm}
                                >
                                    报警
                                </Button>
                            </Affix>
                        </Col>
                    </Row>
                </Space>
                <NewAlarm
                    visible={this.state.newAlarmFormVisible}
                    onClose={this.closeNewAlarmForm}
                    chemicalId={id}
                    chemicalName={cnName}
                />
            </>
        );
    }
}
