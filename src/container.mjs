import DictionaryRepository from './repositories/DictionaryRepository.mjs';
import GetDictionaries from './usecases/GetDictionaries.mjs';

// const production = process.env.ILB_SYSID == 'PRODUCTION';
const container = new Map();

container.set('getDictionaries', GetDictionaries);
container.set('dictionaryRepository', DictionaryRepository);

export default container;
