export default class CalculateFairPrice {
  constructor({ stockValuationService, stockValuationRepository }) {
    this.stockValuationService = stockValuationService;
    this.stockValuationRepository = stockValuationRepository;
  }

  async process(tickerInfo) {
    const valuation = await this.stockValuationService.valuate(tickerInfo);
    await this.stockValuationRepository.save({ ...tickerInfo, data: valuation });
    return valuation;
  }

  schema() {}
}
