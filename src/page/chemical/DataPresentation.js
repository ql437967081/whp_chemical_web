import React from 'react';
import { Collapse, Descriptions, Space, Typography } from 'antd';
import * as cfg from './config/config';

const { Panel } = Collapse;
const { collapseHeaderConfig } = cfg;

export default class DataPresentation extends React.Component {
    config = [];

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
        this.processDescriptions(cfg.basicConfig, 0);
        this.config[0]['disabled'] = true;
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
        return (
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
        );
    }
}
