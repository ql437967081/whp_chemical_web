import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import axios from "axios";

const { Option } = AutoComplete;
const searchUrl = '/whp/chemical/getChemicals';

let timeout;
let currentValue;

const fetch = (value, callback) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    const fake = () => {
        const handleFailure = error => {
            console.log(error);
        };

        axios.all([
            axios.post(searchUrl, { cas: value }),
            axios.post(searchUrl, { name: value })
        ]).then(axios.spread(function (response1, response2) {
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

const ChemicalInput = props => {
    const [value, setValue] = useState('');
    const [options, setOptions] = useState([]);

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
        props.showDetail(options.find(chemical => chemical.id === id));
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
            placeholder={'输入化学品的CAS号或名称进行查询'}
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

export default ChemicalInput;