import DocumentRenderer from './reports/services/DocumentRenderer.mjs';
import DictionaryRepository from './repositories/DictionaryRepository.mjs';
import GetDictionaries from './usecases/GetDictionaries.mjs';

// const production = process.env.ILB_SYSID == 'PRODUCTION';
const container = new Map();

container.set('getDictionaries', GetDictionaries);
container.set('dictionaryRepository', DictionaryRepository);
container.set('documentRenderer', DocumentRenderer);

export default container;
