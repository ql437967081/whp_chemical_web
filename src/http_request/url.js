const baseUrl = '/api/whp';

const chemicalUrl = `${baseUrl}/chemical`;
const alarmUrl = `${baseUrl}/alarm`;

const addChemicalUrl = `${chemicalUrl}/addChemical`;
const getChemicalsUrl = `${chemicalUrl}/getChemicals`;
const genQrCodeUrl = `${chemicalUrl}/genQrCode`;
const getChemicalDetailUrl = `${chemicalUrl}/getDetail`;

const getAlarmListUrl = `${alarmUrl}/getList`;
const deleteAlarmUrl = `${alarmUrl}/del`;
const getAlarmTypesUrl = `${alarmUrl}/getTypes`;
const addAlarmUrl = `${alarmUrl}/add`;


const qqMapUrl = '/qq-map-api';

export {
    addChemicalUrl, getChemicalsUrl, genQrCodeUrl, getChemicalDetailUrl,
    getAlarmListUrl, deleteAlarmUrl, getAlarmTypesUrl, addAlarmUrl,
    qqMapUrl
};
