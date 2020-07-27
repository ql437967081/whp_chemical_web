import disposalConfig from './disposalConfig';

const disposalConfigForAddition = disposalConfig.filter(props => props.key !== 'disposalOverview');

export default disposalConfigForAddition;
