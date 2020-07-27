import physicalChemicalPropertiesConfig from './physicalChemicalPropertiesConfig';

const physicalChemicalPropertiesConfigForAddition = [];
for (let props of physicalChemicalPropertiesConfig) {
    physicalChemicalPropertiesConfigForAddition.push(
        props.key === 'ph'
            ? { label: 'ph值（指明浓度） ', key: 'ph' }
            : props
    );
}

export default physicalChemicalPropertiesConfigForAddition;
