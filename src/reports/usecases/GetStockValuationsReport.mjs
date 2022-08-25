export default class GetStockValuationsReport {
  constructor({ stockValuationRepository, documentRenderer }) {
    this.stockValuationRepository = stockValuationRepository;
    this.documentRenderer = documentRenderer;
  }

  async process(currentDate) {
    const adaptedDate = new Date(currentDate).toISOString().slice(0, 10);
    const stockValuations = await this.stockValuationRepository.findAllByDate(adaptedDate);

    const renderOptions = {
      attachmentName: `${adaptedDate}`,
      format: 'xlsx',
      formatTemp: 'ods'
    };

    return await this.documentRenderer.render(
      'tickers',
      stockValuations.map(({ ticker, date, data }) => ({ ticker, date, ...data })),
      renderOptions
    );
  }

  schema() {}
}
