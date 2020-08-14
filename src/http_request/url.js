const backendUrl = '/api';

const baseUrl = `${backendUrl}/whp`;

const loginUrl = `${baseUrl}/manager/login`;

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
const handleAlarmUrl = `${alarmUrl}/handle`;


const qqMapUrl = '/qq-map-api';

export {
    backendUrl, loginUrl,
    addChemicalUrl, getChemicalsUrl, genQrCodeUrl, getChemicalDetailUrl,
    getAlarmListUrl, deleteAlarmUrl, getAlarmTypesUrl, addAlarmUrl, handleAlarmUrl,
    qqMapUrl
};
