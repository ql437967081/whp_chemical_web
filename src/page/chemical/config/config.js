import basicConfig from './basicConfig';
import physicalChemicalPropertiesConfig from './physicalChemicalPropertiesConfig';
import disposalConfig from './disposalConfig';
import firstAidConfig from './firstAidConfig';
import leakMethodConfig from './leakMethodConfig';
import stepStoreAttentionConfig from './stepStoreAttentionConfig';
import selfProtectConfig from './selfProtectConfig';
import bookConfig from './bookConfig';

const collapseHeaderConfig = [
    { header: '基本信息', key: 'basic' },
    { header: '紧急情况描述', key: 'emergency' },
    { header: '理化特性', key: 'physicalChemicalProperties' },
    { header: 'GHS危险性类别', key: 'dangerClass' },
    { header: '危险信息', key: 'danger' },
    { header: '预防措施', key: 'prevent' },
    { header: '事故响应', key: 'response' },
    { header: '安全储存', key: 'store' },
    { header: '废弃处置', key: 'disposal' },
    { header: '物理和化学危险', key: 'physicalChemical' },
    { header: '健康危害', key: 'health' },
    { header: '环境危害', key: 'environment' },
    { header: '急救措施', key: 'firstAid' },
    { header: '泄漏应急处理', key: 'leakMethod' },
    { header: '操作处置与储存', key: 'stepStoreAttention' },
    { header: '工程控制', key: 'engControl' },
    { header: '个体防护', key: 'selfProtect' },
    { header: '运输注意', key: 'transAttention' },
    { header: '列入名录情况', key: 'book' }
];

export {
    collapseHeaderConfig,
    basicConfig,
    physicalChemicalPropertiesConfig,
    disposalConfig,
    firstAidConfig,
    leakMethodConfig,
    stepStoreAttentionConfig,
    selfProtectConfig,
    bookConfig
};
