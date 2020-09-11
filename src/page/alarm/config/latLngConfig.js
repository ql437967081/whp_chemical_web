const defaultCenter = { latitude: 39.9, longitude: 116.4 };

const nullPos = ',';

const parseLatLng = position => {
    const latLng = position.split(',');
    const latitude = parseFloat(latLng[1]);
    const longitude = parseFloat(latLng[0]);
    return { latitude, longitude };
};

const toLatLngText = (lat, lng) => {
    const toFixed5 = x => x.toFixed(5);
    return `${toFixed5(lng)},${toFixed5(lat)}`;
};

export { defaultCenter, nullPos, parseLatLng, toLatLngText };
