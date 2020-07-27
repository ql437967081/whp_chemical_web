import React from 'react';
import { Button, Space, Tabs } from 'antd';
import DataPresentation from './DataPresentation';
import NewChemicalForm from './NewChemicalForm';
import data51 from './mock/data51';
import data52 from './mock/data52';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

/**
 * 1.基本信息
 *      中文名：cnName
 *      中文别名：cnAlia
 *      英文名称：enName
 *      CAS号：cas
 *      分子式：formula
 *      二维码：uri (显示)
 * 2.紧急情况描述：emergency
 * 3.理化特性
 *      外观与性状：look
 *      ph值（指明浓度）：ph
 *      气味：smell
 *      沸点、初沸点和沸程（°C）：fei
 *      熔点/凝固点（°C）：rong
 *      相对蒸气密度（空气=1）：sky
 *      饱和蒸汽压（kPa）：kpa
 *      相对密度（水=1）：water
 *      黏度（mm²/s）：mm2
 *      闪点（°C）：shan
 *      n-辛醇/水分配系数：xinchun
 *      分解温度（°C）：fenjie
 *      引燃温度（°C）：yinran
 *      爆炸上限/下限[%(V/V)]：baozha
 *      溶解性（mg/L）：rongjie
 *      易燃性：yiran
 *      稳定性：stability
 *      危险反应：dangerAct
 *      应避免的条件：avoid
 *      不相容的物质：noRong
 *      分解产物：apart
 * 4.GHS危险性类别
 *      GHS01~GHS09：other
 *      GHS危害性分类：dangerClass
 * 5.危险信息：danger
 * 6.预防措施：prevent
 * 7.事故响应：response
 * 8.安全储存：storage | store（显示）
 * 9.废弃处置
 *      （概述）：disposalOverview（显示）
 *      产品：disposal
 *      不洁的包装：disposal2
 *      废弃注意事项：disposalAttention
 * 10.物理和化学危险：physicalChemical
 * 11.健康危害：health
 * 12.环境危害：environment
 * 13.急救措施
 *      一般性建议：firstAid
 *      眼睛接触：eyeTouch
 *      皮肤接触：skinTouch
 *      食入：eat
 *      吸入：breath
 *      对保护施救者的忠告：advice
 *      对医生的特别提示：doctor
 *      危险特性：dangerProperties
 * 14.泄漏应急处理
 *      合适的灭火介质：fireStuff
 *      不合适的灭火介质：notFireStuff
 *      灭火注意事项及措施：fireStep
 *      作业人员防护措施、装备和应急处置程序：protectiveStep
 *      环境保护措施：environmentStep
 *      泄露化学品的收容、清除方法及处置材料：leakMethod
 *      操作注意事项：stepAttention
 * 15.操作处置与储存
 *      操作注意事项：stepAttention2
 *      储存注意事项：storageAttention | storeAttention（显示）
 * 16.工程控制：engControl
 * 17.个体防护
 *      眼睛防护：eyeProtect
 *      手部防护：handProtect
 *      呼吸系统防护：breathProtect
 *      皮肤和身体防护：skinProtect
 * 18.运输注意：transAttention
 * 19.列入名录情况
 *      《危险化学品目录（2015年版）》，安监总局2015年第5号公告：book1
 *      《重点环境管理危险化学品目录》，环保部办公厅2014年第33号文：book2
 *      《中国严格限制的有毒化学品名录》：book3
 *      《麻醉药品和精神药品品种目录（2013年版）》，食药总局2013年第230号通知：book4
 *      《重点监管的危险化学品名录（第1和第2批）》，安监总局2011年第95号和2013年第12号通知：book5
 *      《中国进出口受控消耗臭氧层物质名录（第1到6批）》，环保部2000年至2012系列公告：book6
 *      《易制爆危险化学品名录（2017年版）》，公安部2017年5月11日公告：book7
 *      《高毒物品目录》，卫生部2003年第142号通知：book8
 *
 *
 * {
  "advice": "string",13
  "apart": "string",3
  "avoid": "string",3
  "baozha": "string",3
  "book1": 0,19
  "book2": 0,19
  "book3": 0,19
  "book4": 0,19
  "book5": 0,19
  "book6": 0,19
  "book7": 0,19
  "book8": 0,19
  "breath": "string",13
  "breathProtect": "string",17
  "cas": "string",1
  "cnAlia": "string",1
  "cnName": "string",1
  "danger": "string",5
  "dangerAct": "string",3
  "dangerClass": "string",4
  "dangerProperties": "string",13
  "disposal": "string",9
  "disposal2": "string",9
  "disposalAttention": "string",9
  "doctor": "string",13
  "eat": "string",13
  "emergency": "string",2
  "enName": "string",1
  "engControl": "string",16
  "environment": "string",12
  "environmentStep": "string",14
  "eyeProtect": "string",17
  "eyeTouch": "string",13
  "fei": "string",3
  "fenjie": "string",3
  "fireStep": "string",14
  "fireStuff": "string",14
  "firstAid": "string",13
  "formula": "string",1
  "handProtect": "string",17
  "health": "string",11
  "kpa": "string",3
  "leakMethod": "string",14
  "look": "string",3
  "mm2": "string",3
  "noRong": "string",3
  "notFireStuff": "string",14
  "other": "string",4
  "ph": "string",3
  "physicalChemical": "string",10
  "prevent": "string",6
  "protectiveStep": "string",14
  "response": "string",7
  "rong": "string",3
  "rongjie": "string",3
  "shan": "string",3
  "skinProtect": "string",17
  "skinTouch": "string",13
  "sky": "string",3
  "smell": "string",3
  "stability": "string",3
  "stepAttention": "string",14
  "stepAttention2": "string",15
  "storage": "string",8
  "storageAttention": "string",15
  "transAttention": "string",18
  "water": "string",3
  "xinchun": "string",3
  "yinran": "string",3
  "yiran": "string"3
}
 */
export default class ChemicalManage extends React.Component{
    newTabIndex = 0;

    state = {
        panes: [
            { title: '镉[非发火的]', content: <DataPresentation data={data51} />, key: '51' },
            { title: '1,2-二甲苯', content: <DataPresentation data={data52} />, key: '52' },
        ],
        activeKey: '51'
    };

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: `新增化学品 ${this.newTabIndex}`, content: <NewChemicalForm />, key: activeKey });
        this.setState({ panes, activeKey });
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
        const { panes, activeKey } = this.state;
        return (
            <Space direction={"vertical"}>
                <Button type={"primary"} onClick={this.add} icon={<PlusOutlined />}>新增</Button>
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
