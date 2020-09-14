import React from 'react';
import { Button, Col, Row, Space, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ChemicalInput from './ChemicalInput';
import DataPresentation from './DataPresentation';
import NewChemical from './NewChemical';
import EditChemical from './EditChemical';

const { TabPane } = Tabs;

export default class ChemicalManage extends React.Component {
    newTabIndex = 0;

    state = {
        panes: [],
        toDelete: false
    };

    deleteTabAndSearchOption = id => {
        this.remove(`${id}`);
        this.setState({ toDelete: id });
    };

    onDeletionOfSearchOptionComplete = () => this.setState({ toDelete: false });

    replaceFormOfDataPresentation = (data, activeKey) => {
        const newPane = this.paneOfDataPresentation(data);
        const newActiveKey = newPane.key;
        const newPanes = [];
        this.state.panes.forEach(pane => newPanes.push(pane.key === activeKey ? newPane : pane));
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey
        });
    };

    paneOfDataPresentation = data => {
        const { id, cnName } = data;
        const activeKey = `${id}`;
        return {
            title: cnName,
            content: (
                <DataPresentation
                    data={data}
                    onDeletionComplete={() => this.deleteTabAndSearchOption(id)}
                    onEdit={() => {
                        const content = (
                            <EditChemical
                                data={data}
                                onEditionSuccess={data => this.replaceFormOfDataPresentation(data, activeKey)}
                            />
                        );
                        const newPane = { title: `${cnName} [编辑]`, content, key: activeKey };
                        const newPanes = [];
                        this.state.panes.forEach(pane => newPanes.push(pane.key === activeKey ? newPane : pane));
                        this.setState({
                            panes: newPanes,
                            activeKey
                        });
                    }}
                />
            ),
            key: activeKey
        };
    };

    showDetail = data => {
        const { panes } = this.state;
        const newPane = this.paneOfDataPresentation(data);
        const activeKey = newPane.key;

        if (panes.find(pane => pane.key === activeKey)) {
            const newPanes = [];
            panes.forEach(pane => newPanes.push(pane.key === activeKey ? newPane : pane));
            this.setState({
                panes: newPanes,
                activeKey
            });
        } else {
            this.setState({
                panes: panes.concat(newPane),
                activeKey
            });
        }
    };

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const activeKey = `newTab${this.newTabIndex++}`;
        this.setState({
            panes: this.state.panes.concat({
                title: `新增化学品 ${this.newTabIndex}`,
                content: <NewChemical onAdditionSuccess={data => this.replaceFormOfDataPresentation(data, activeKey)} />,
                key: activeKey
            }),
            activeKey
        });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex = 0;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey && i > 0) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    };

    render() {
        const { panes, activeKey, toDelete } = this.state;
        return (
            <Space direction={"vertical"} style={{ width: '100%' }}>
                <Row justify="space-between" gutter={[8, 8]}>
                    <Col>
                        <ChemicalInput
                            onSelect={this.showDetail}
                            placeholder={'输入化学品的CAS号或名称进行查询'}
                            toDelete={toDelete}
                            onDeletionComplete={this.onDeletionOfSearchOptionComplete}
                        />
                    </Col>
                    <Col>
                        <Button type={"primary"} onClick={this.add} icon={<PlusOutlined />}>新增</Button>
                    </Col>
                </Row>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {panes.map(pane => {
                        const { title, content, key } = pane;
                        return (
                            <TabPane tab={title} key={key}>
                                {content}
                            </TabPane>
                        );
                    })}
                </Tabs>
            </Space>
        );
    }
}
