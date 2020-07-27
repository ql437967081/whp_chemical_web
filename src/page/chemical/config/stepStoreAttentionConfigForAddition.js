import stepStoreAttentionConfig from './stepStoreAttentionConfig';

const stepStoreAttentionConfigForAddition = [];
for (let props of stepStoreAttentionConfig) {
    const { label, key } = props;
    stepStoreAttentionConfigForAddition.push(
        key.includes('store') || key.includes('Store')
            ? { label, key: key.replace(/store/g, 'storage').replace(/Store/g, 'Storage') }
            : props
    );
}

export default stepStoreAttentionConfigForAddition;
