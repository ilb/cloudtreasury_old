import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

ajv.addKeyword('options');

export default ajv;
