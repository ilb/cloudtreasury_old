export default class CalculateFairPrice {
  constructor({ stockValuationService }) {
    this.stockValuationService = stockValuationService;
  }

  async process(tickerInfo) {
    await this.stockValuationService.valuate(tickerInfo);
  }
}