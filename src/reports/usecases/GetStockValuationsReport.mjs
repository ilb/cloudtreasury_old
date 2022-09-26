export default class GetStockValuationsReport {
  constructor({ stockValuationRepository, documentRenderer }) {
    this.stockValuationRepository = stockValuationRepository;
    this.documentRenderer = documentRenderer;
  }

  async process({ currentDate }) {
    const stockValuations = await this.stockValuationRepository.findAllByDate(currentDate);

    const renderOptions = {
      attachmentName: `${currentDate}`,
      format: 'xlsx',
      formatTemp: 'ods'
    };

    return await this.documentRenderer.render(
      'tickers',
      stockValuations.map(({ ticker, date, data }) => (data.active = data.active ? "ДА" : "НЕТ",
       { ticker, date, ...data })),
      renderOptions
    );
  }

  schema() {}
}
