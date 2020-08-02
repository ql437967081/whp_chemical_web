import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import data51 from './mock/data51';
import data52 from './mock/data52';
import { axios, handleFailure } from '../../http_request/default';
import { getChemicalsUrl } from '../../http_request/url';

const { Option } = AutoComplete;

let timeout;
let currentValue;

const fetch = (value, callback) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    const fake = () => {
        const { all, post, spread } = axios;
        all([
            post(getChemicalsUrl, { cas: value }),
            post(getChemicalsUrl, { name: value })
        ]).then(spread(function (response1, response2) {
            if (currentValue === value) {
                const data = [];
                const idSet = new Set();
                const addToData = response => {
                    for (let chemical of response.data['data']) {
                        const { id } = chemical;
                        if (!idSet.has(id))
                            data.push(chemical);
                        idSet.add(id);
                    }
                };
                addToData(response1);
                addToData(response2);
                callback(data);
            }
        })).catch(handleFailure);
    };

    timeout = setTimeout(fake, 300);
};

export default function ChemicalInput(props) {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([ data51, data52 ]);

    const onSearch = value => {
        if (value) {
            fetch(value, data => setOptions(data));
        } else {
            setOptions([]);
        }
    };

    const onSelect = data => {
        console.log('onSelect', data);
        const id = parseInt(data);
        props.onSelect(options.find(chemical => chemical.id === id));
        setValue('');
    };

    const onChange = data => {
        setValue(data);
    };

    return (
        <AutoComplete
            value={value}
            style={{
                width: 300,
            }}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            placeholder={props.placeholder}
        >
            {options.map(chemical => {
                const { id, cnName, cas, formula } = chemical;
                return (
                    <Option key={id} value={`${id}`}>
                        {cas}&nbsp;&nbsp;&nbsp;{cnName}&nbsp;&nbsp;&nbsp;[{formula}]
                    </Option>
                );
            })}
        </AutoComplete>
    );
};
