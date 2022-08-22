import DocumentRenderer from './reports/services/DocumentRenderer.mjs';
import StockValuationService from './calculations/services/StockValuationService.mjs';
import StockValuationRepository from './repositories/StockValuationRepository.mjs';

// const production = process.env.ILB_SYSID == 'PRODUCTION';
const container = new Map();

container.set('documentRenderer', DocumentRenderer);
container.set('stockValuationService', StockValuationService);
container.set('stockValuationRepository', StockValuationRepository);

export default container;
