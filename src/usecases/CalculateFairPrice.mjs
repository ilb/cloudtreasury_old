export default class CalculateFairPrice {
  constructor({ stockValuationService }) {
    this.stockValuationService = stockValuationService;
  }

  async process(tickerInfo) {
    return await this.stockValuationService.valuate(tickerInfo);
  }

  schema() {}
}