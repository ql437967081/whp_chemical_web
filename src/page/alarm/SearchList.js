import React from 'react';
import { Col, Radio, Row, Select } from 'antd';
import ChemicalInput from '../chemical/ChemicalInput';
import { stateTypes } from './config/config';
import { axios, handleFailure } from '../../http_request/default';
import { getAlarmListUrl } from '../../http_request/url';

export default class SearchList extends React.Component {
    refreshing = false;

    state = {
        radioValue: 1
    };

    handleSuccess = response => {
        const { setAlarmList } = this.props;
        setAlarmList(response.data['data'], () => this.refreshing = false);
    };

    componentDidMount() {
        this.getList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.refresh && !this.refreshing) {
            this.setState({ radioValue: 1 });
            this.getList();
        }
    }

    getList = () => {
        this.refreshing = true;
        axios.get(getAlarmListUrl).then(this.handleSuccess).catch(handleFailure);
    };

    getListByChemical = data => {
        const getAlarmListByChemicalUrl = `${getAlarmListUrl}ByChemical`;
        axios.get(getAlarmListByChemicalUrl, {
            params: {
                chemicalId: data['id']
            }
        }).then(this.handleSuccess).catch(handleFailure);
    };

    getListByState = state => {
        const getAlarmListByStateUrl = `${getAlarmListUrl}ByState`;
        axios.get(getAlarmListByStateUrl, {
            params: { state }
        }).then(this.handleSuccess).catch(handleFailure);
    };

    render() {
        const { radioValue } = this.state;
        return (
            <Row justify="space-between" gutter={[8, 8]}>
                {radioValue === 1 && (
                    <Col />
                )}
                {radioValue === 2 && (
                    <Col>
                        <ChemicalInput
                            onSelect={this.getListByChemical}
                            placeholder={'获取特定化学品的报警信息'}
                        />
                    </Col>
                )}
                {radioValue === 3 && (
                    <Col>
                        <Select
                            onChange={this.getListByState}
                            style={{ width: 120 }}
                            placeholder={'请选择状态'}
                        >
                            {stateTypes.map((stateType, index) => {
                                if (index === 0)
                                    return null;
                                const { Option } = Select;
                                return (
                                    <Option value={index} key={index}>{stateType.name}</Option>
                                );
                            })}
                        </Select>
                    </Col>
                )}
                <Col>
                    <Radio.Group
                        value={radioValue}
                        onChange={e => {
                            const { value } = e.target;
                            this.setState({ radioValue: value });
                            if (value === 1) {
                                this.getList();
                            }
                        }}
                    >
                        <Radio value={1}>显示所有报警列表</Radio>
                        <Radio value={2}>根据化学品获取报警列表</Radio>
                        <Radio value={3}>根据处理状态获取报警列表</Radio>
                    </Radio.Group>
                </Col>
            </Row>
        );
    }
}
